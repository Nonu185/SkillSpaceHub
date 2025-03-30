import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertListingSchema, 
  insertMessageSchema,
  insertUserSchema,
  type SkillListing
} from "@shared/schema";
import { z } from "zod";
import { WebSocketServer, WebSocket } from 'ws';

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Don't send password in response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const userInput = insertUserSchema.safeParse(req.body);
      
      if (!userInput.success) {
        return res.status(400).json({ 
          error: "Invalid user data", 
          details: userInput.error.format() 
        });
      }
      
      const existingUser = await storage.getUserByUsername(userInput.data.username);
      if (existingUser) {
        return res.status(409).json({ error: "Username already taken" });
      }
      
      const newUser = await storage.createUser(userInput.data);
      
      // Don't send password in response
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  // Skill listing routes
  app.get("/api/skill-listings", async (_req: Request, res: Response) => {
    try {
      const listings = await storage.getListings();
      
      // Fetch user details for each listing
      const listingsWithUserDetails = await Promise.all(
        listings.map(async (listing) => {
          const user = await storage.getUser(listing.userId);
          if (!user) return listing;
          
          const { password, ...userWithoutPassword } = user;
          return {
            ...listing,
            user: userWithoutPassword,
            createdAtFormatted: formatRelativeTime(listing.createdAt)
          };
        })
      );
      
      res.json(listingsWithUserDetails);
    } catch (error) {
      console.error("Error fetching skill listings:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  app.get("/api/skill-listings/:id", async (req: Request, res: Response) => {
    try {
      const listingId = parseInt(req.params.id);
      if (isNaN(listingId)) {
        return res.status(400).json({ error: "Invalid listing ID" });
      }
      
      const listing = await storage.getListingById(listingId);
      if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
      }
      
      // Get user details
      const user = await storage.getUser(listing.userId);
      if (!user) {
        return res.json(listing);
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json({
        ...listing,
        user: userWithoutPassword,
        createdAtFormatted: formatRelativeTime(listing.createdAt)
      });
    } catch (error) {
      console.error("Error fetching skill listing:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  app.post("/api/skill-listings", async (req: Request, res: Response) => {
    try {
      const listingInput = insertListingSchema.safeParse(req.body);
      
      if (!listingInput.success) {
        return res.status(400).json({ 
          error: "Invalid listing data", 
          details: listingInput.error.format() 
        });
      }
      
      // Verify that the user exists
      const user = await storage.getUser(listingInput.data.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const newListing = await storage.createListing(listingInput.data);
      
      res.status(201).json({
        ...newListing,
        createdAtFormatted: formatRelativeTime(newListing.createdAt)
      });
    } catch (error) {
      console.error("Error creating skill listing:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  app.put("/api/skill-listings/:id", async (req: Request, res: Response) => {
    try {
      const listingId = parseInt(req.params.id);
      if (isNaN(listingId)) {
        return res.status(400).json({ error: "Invalid listing ID" });
      }
      
      const existingListing = await storage.getListingById(listingId);
      if (!existingListing) {
        return res.status(404).json({ error: "Listing not found" });
      }
      
      // Custom parsing to handle partial updates safely
      const updateSchema = z.object({
        offering: z.array(z.string()).optional(),
        seeking: z.array(z.string()).optional(),
        description: z.string().optional(),
        timeCommitment: z.string().optional(),
        experienceLevel: z.string().optional(),
      });
      
      const updateResult = updateSchema.safeParse(req.body);
      if (!updateResult.success) {
        return res.status(400).json({ 
          error: "Invalid update data", 
          details: updateResult.error.format() 
        });
      }
      
      const updatedListing = await storage.updateListing(listingId, updateResult.data);
      if (!updatedListing) {
        return res.status(404).json({ error: "Failed to update listing" });
      }
      
      res.json({
        ...updatedListing,
        createdAtFormatted: formatRelativeTime(updatedListing.createdAt)
      });
    } catch (error) {
      console.error("Error updating skill listing:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  app.delete("/api/skill-listings/:id", async (req: Request, res: Response) => {
    try {
      const listingId = parseInt(req.params.id);
      if (isNaN(listingId)) {
        return res.status(400).json({ error: "Invalid listing ID" });
      }
      
      const deleted = await storage.deleteListing(listingId);
      if (!deleted) {
        return res.status(404).json({ error: "Listing not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting skill listing:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  // User's listings endpoint
  app.get("/api/users/:userId/skill-listings", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      // Check if user exists
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const listings = await storage.getListingsByUserId(userId);
      
      const listingsWithFormattedDates = listings.map(listing => ({
        ...listing,
        createdAtFormatted: formatRelativeTime(listing.createdAt)
      }));
      
      res.json(listingsWithFormattedDates);
    } catch (error) {
      console.error("Error fetching user's listings:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  // Message routes
  app.post("/api/skill-messages", async (req: Request, res: Response) => {
    try {
      const messageInput = insertMessageSchema.safeParse(req.body);
      
      if (!messageInput.success) {
        return res.status(400).json({ 
          error: "Invalid message data", 
          details: messageInput.error.format() 
        });
      }
      
      // Verify the listing exists
      const listing = await storage.getListingById(messageInput.data.listingId);
      if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
      }
      
      // Verify sender and receiver exist
      const sender = await storage.getUser(messageInput.data.senderId);
      const receiver = await storage.getUser(messageInput.data.receiverId);
      
      if (!sender || !receiver) {
        return res.status(404).json({ error: "Sender or receiver not found" });
      }
      
      const newMessage = await storage.createMessage(messageInput.data);
      
      res.status(201).json({
        ...newMessage,
        createdAtFormatted: formatRelativeTime(newMessage.createdAt)
      });
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  app.get("/api/skill-messages/listing/:listingId", async (req: Request, res: Response) => {
    try {
      const listingId = parseInt(req.params.listingId);
      if (isNaN(listingId)) {
        return res.status(400).json({ error: "Invalid listing ID" });
      }
      
      const messages = await storage.getMessagesByListingId(listingId);
      
      const messagesWithFormattedDates = messages.map(message => ({
        ...message,
        createdAtFormatted: formatRelativeTime(message.createdAt)
      }));
      
      res.json(messagesWithFormattedDates);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  app.get("/api/skill-messages/users/:user1Id/:user2Id", async (req: Request, res: Response) => {
    try {
      const user1Id = parseInt(req.params.user1Id);
      const user2Id = parseInt(req.params.user2Id);
      
      if (isNaN(user1Id) || isNaN(user2Id)) {
        return res.status(400).json({ error: "Invalid user IDs" });
      }
      
      const messages = await storage.getMessagesBetweenUsers(user1Id, user2Id);
      
      const messagesWithFormattedDates = messages.map(message => ({
        ...message,
        createdAtFormatted: formatRelativeTime(message.createdAt)
      }));
      
      res.json(messagesWithFormattedDates);
    } catch (error) {
      console.error("Error fetching messages between users:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  app.put("/api/skill-messages/:id/read", async (req: Request, res: Response) => {
    try {
      const messageId = parseInt(req.params.id);
      if (isNaN(messageId)) {
        return res.status(400).json({ error: "Invalid message ID" });
      }
      
      const updatedMessage = await storage.markMessageAsRead(messageId);
      if (!updatedMessage) {
        return res.status(404).json({ error: "Message not found" });
      }
      
      res.json({
        ...updatedMessage,
        createdAtFormatted: formatRelativeTime(updatedMessage.createdAt)
      });
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

  const httpServer = createServer(app);
  
  // Create WebSocket server
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Connected clients
  const clients = new Map<string, { ws: WebSocket, userId?: number }>();
  
  wss.on('connection', (ws) => {
    const clientId = Math.random().toString(36).substring(2, 15);
    clients.set(clientId, { ws });
    
    console.log(`WebSocket client connected: ${clientId}`);
    
    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message.toString());
        
        // Handle user identification
        if (data.type === 'identify') {
          const userId = parseInt(data.userId);
          if (!isNaN(userId)) {
            const user = await storage.getUser(userId);
            if (user) {
              clients.set(clientId, { ws, userId });
              ws.send(JSON.stringify({ 
                type: 'identify_success', 
                message: 'User identified successfully'
              }));
              console.log(`User ${userId} identified with client ${clientId}`);
            }
          }
        }
        
        // Handle new messages
        if (data.type === 'new_message' && data.message) {
          const parsedMessage = insertMessageSchema.safeParse(data.message);
          
          if (parsedMessage.success) {
            const messageCopy = { ...parsedMessage.data };
            const newMessage = await storage.createMessage(messageCopy);
            
            // Broadcast to sender and receiver
            clients.forEach((client) => {
              if (client.userId === newMessage.senderId || client.userId === newMessage.receiverId) {
                if (client.ws.readyState === WebSocket.OPEN) {
                  client.ws.send(JSON.stringify({
                    type: 'new_message',
                    message: {
                      ...newMessage,
                      createdAtFormatted: formatRelativeTime(newMessage.createdAt)
                    }
                  }));
                }
              }
            });
          }
        }
        
        // Handle when someone is typing
        if (data.type === 'typing') {
          const { senderId, receiverId } = data;
          clients.forEach((client) => {
            if (client.userId === receiverId && client.ws.readyState === WebSocket.OPEN) {
              client.ws.send(JSON.stringify({
                type: 'user_typing',
                senderId
              }));
            }
          });
        }
        
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });
    
    ws.on('close', () => {
      clients.delete(clientId);
      console.log(`WebSocket client disconnected: ${clientId}`);
    });
    
    // Send initial connection confirmation
    ws.send(JSON.stringify({ 
      type: 'connected', 
      message: 'Connected to SkillSpace WebSocket Server'
    }));
  });
  
  return httpServer;
}

// Helper function to format dates as relative time (e.g., "2 days ago")
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      if (diffInMinutes === 0) {
        return "just now";
      }
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else if (diffInDays === 1) {
    return "1 day ago";
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
  } else {
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
  }
}
