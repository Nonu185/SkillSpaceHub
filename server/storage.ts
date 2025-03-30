import { 
  users, type User, type InsertUser,
  skillListings, type SkillListing, type InsertListing,
  skillMessages, type SkillMessage, type InsertMessage
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(id: number, userProfile: Partial<User>): Promise<User | undefined>;
  
  // Skill listing operations
  createListing(listing: InsertListing): Promise<SkillListing>;
  getListings(): Promise<SkillListing[]>;
  getListingById(id: number): Promise<SkillListing | undefined>;
  getListingsByUserId(userId: number): Promise<SkillListing[]>;
  updateListing(id: number, listing: Partial<SkillListing>): Promise<SkillListing | undefined>;
  deleteListing(id: number): Promise<boolean>;
  
  // Message operations
  createMessage(message: InsertMessage): Promise<SkillMessage>;
  getMessagesByListingId(listingId: number): Promise<SkillMessage[]>;
  getMessagesBetweenUsers(user1Id: number, user2Id: number): Promise<SkillMessage[]>;
  markMessageAsRead(id: number): Promise<SkillMessage | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private skillListings: Map<number, SkillListing>;
  private skillMessages: Map<number, SkillMessage>;
  private userCurrentId: number;
  private listingCurrentId: number;
  private messageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.skillListings = new Map();
    this.skillMessages = new Map();
    
    this.userCurrentId = 1;
    this.listingCurrentId = 1;
    this.messageCurrentId = 1;
    
    // Add some initial data for testing
    this.populateInitialData();
  }

  private populateInitialData() {
    // Add demo users
    const demoUsers: User[] = [
      {
        id: this.userCurrentId++,
        username: "rahul_sharma",
        password: "password123",
        name: "Rahul Sharma",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
        bio: "Data scientist with expertise in Python and machine learning",
        rating: 48, // 4.8 out of 5
        reviewCount: 12
      },
      {
        id: this.userCurrentId++,
        username: "priya_patel",
        password: "password123",
        name: "Priya Patel",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
        bio: "Digital marketing professional and content creator",
        rating: 49, // 4.9 out of 5
        reviewCount: 21
      },
      {
        id: this.userCurrentId++,
        username: "vikram_singh",
        password: "password123",
        name: "Vikram Singh",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
        bio: "Mobile app developer specializing in React Native",
        rating: 47, // 4.7 out of 5
        reviewCount: 9
      }
    ];
    
    demoUsers.forEach(user => this.users.set(user.id, user));
    
    // Add demo listings
    const demoListings: SkillListing[] = [
      {
        id: this.listingCurrentId++,
        userId: 1,
        offering: ["Python Programming", "Data Analysis"],
        seeking: ["UI/UX Design", "Graphic Design"],
        description: "I'm a data scientist with 3 years of experience in Python and data analysis. Looking to exchange my skills for design expertise to improve my portfolio projects.",
        timeCommitment: "2-3 hours/week",
        experienceLevel: "Intermediate",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        id: this.listingCurrentId++,
        userId: 2,
        offering: ["Digital Marketing", "Content Writing"],
        seeking: ["Web Development", "SEO Optimization"],
        description: "Marketing professional offering content creation and digital marketing strategy in exchange for help building my personal website and improving its SEO.",
        timeCommitment: "4-5 hours/week",
        experienceLevel: "Advanced",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        id: this.listingCurrentId++,
        userId: 3,
        offering: ["Mobile App Development", "React Native"],
        seeking: ["UI/UX Design", "Product Management"],
        description: "I can develop mobile apps using React Native. Looking for someone who can help with UI design and product roadmap planning for my upcoming project.",
        timeCommitment: "5-6 hours/week",
        experienceLevel: "Advanced",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
      }
    ];
    
    demoListings.forEach(listing => this.skillListings.set(listing.id, listing));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { 
      ...insertUser, 
      id,
      name: insertUser.name || null,
      avatar: insertUser.avatar || null,
      bio: insertUser.bio || null,
      rating: 50, // Default 5.0 rating
      reviewCount: 0
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUserProfile(id: number, userProfile: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userProfile };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Skill listing methods
  async createListing(listing: InsertListing): Promise<SkillListing> {
    const id = this.listingCurrentId++;
    const newListing: SkillListing = {
      ...listing,
      id,
      createdAt: new Date()
    };
    this.skillListings.set(id, newListing);
    return newListing;
  }
  
  async getListings(): Promise<SkillListing[]> {
    return Array.from(this.skillListings.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  
  async getListingById(id: number): Promise<SkillListing | undefined> {
    return this.skillListings.get(id);
  }
  
  async getListingsByUserId(userId: number): Promise<SkillListing[]> {
    return Array.from(this.skillListings.values())
      .filter(listing => listing.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async updateListing(id: number, listingUpdate: Partial<SkillListing>): Promise<SkillListing | undefined> {
    const listing = await this.getListingById(id);
    if (!listing) return undefined;
    
    const updatedListing = { ...listing, ...listingUpdate };
    this.skillListings.set(id, updatedListing);
    return updatedListing;
  }
  
  async deleteListing(id: number): Promise<boolean> {
    return this.skillListings.delete(id);
  }
  
  // Message methods
  async createMessage(message: InsertMessage): Promise<SkillMessage> {
    const id = this.messageCurrentId++;
    const newMessage: SkillMessage = {
      ...message,
      id,
      createdAt: new Date(),
      read: false
    };
    this.skillMessages.set(id, newMessage);
    return newMessage;
  }
  
  async getMessagesByListingId(listingId: number): Promise<SkillMessage[]> {
    return Array.from(this.skillMessages.values())
      .filter(message => message.listingId === listingId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
  
  async getMessagesBetweenUsers(user1Id: number, user2Id: number): Promise<SkillMessage[]> {
    return Array.from(this.skillMessages.values())
      .filter(message => 
        (message.senderId === user1Id && message.receiverId === user2Id) ||
        (message.senderId === user2Id && message.receiverId === user1Id)
      )
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
  
  async markMessageAsRead(id: number): Promise<SkillMessage | undefined> {
    const message = this.skillMessages.get(id);
    if (!message) return undefined;
    
    const updatedMessage = { ...message, read: true };
    this.skillMessages.set(id, updatedMessage);
    return updatedMessage;
  }
}

export const storage = new MemStorage();
