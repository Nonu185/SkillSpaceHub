import {
  users,
  type User,
  type InsertUser,
  skillListings,
  type SkillListing,
  type InsertListing,
  skillMessages,
  type SkillMessage,
  type InsertMessage,
} from "@shared/schema";

// Define the in-memory storage interface (removed payment-related methods)
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(
    id: number,
    userProfile: Partial<User>
  ): Promise<User | undefined>;

  // Skill listing operations
  createListing(listing: InsertListing): Promise<SkillListing>;
  getListings(): Promise<SkillListing[]>;
  getListingById(id: number): Promise<SkillListing | undefined>;
  getListingsByUserId(userId: number): Promise<SkillListing[]>;
  updateListing(
    id: number,
    listing: Partial<SkillListing>
  ): Promise<SkillListing | undefined>;
  deleteListing(id: number): Promise<boolean>;

  // Message operations
  createMessage(message: InsertMessage): Promise<SkillMessage>;
  getMessagesByListingId(listingId: number): Promise<SkillMessage[]>;
  getMessagesBetweenUsers(
    user1Id: number,
    user2Id: number
  ): Promise<SkillMessage[]>;
  markMessageAsRead(id: number): Promise<SkillMessage | undefined>;
}

// In-memory storage implementation
export class MemoryStorage implements IStorage {
  private users: User[] = [];
  private skillListings: SkillListing[] = [];
  private skillMessages: SkillMessage[] = [];
  private nextUserId = 1;
  private nextListingId = 1;
  private nextMessageId = 1;

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: this.nextUserId++,
      rating: 50, // Default 5.0 rating
      reviewCount: 0,
    };
    this.users.push(user);
    return user;
  }

  async updateUserProfile(
    id: number,
    userProfile: Partial<User>
  ): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    const updatedUser = { ...user, ...userProfile };
    this.users = this.users.map((u) => (u.id === id ? updatedUser : u));
    return updatedUser;
  }

  // Skill listing methods
  async createListing(listing: InsertListing): Promise<SkillListing> {
    const newListing: SkillListing = {
      ...listing,
      id: this.nextListingId++,
      createdAt: new Date(),
    };
    this.skillListings.push(newListing);
    return newListing;
  }

  async getListings(): Promise<SkillListing[]> {
    return [...this.skillListings].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getListingById(id: number): Promise<SkillListing | undefined> {
    return this.skillListings.find((listing) => listing.id === id);
  }

  async getListingsByUserId(userId: number): Promise<SkillListing[]> {
    return this.skillListings
      .filter((listing) => listing.userPacienteId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateListing(
    id: number,
    listingUpdate: Partial<SkillListing>
  ): Promise<SkillListing | undefined> {
    const listing = await this.getListingById(id);
    if (!listing) return undefined;
    const updatedListing = { ...listing, ...listingUpdate };
    this.skillListings = this.skillListings.map((l) =>
      l.id === id ? updatedListing : l
    );
    return updatedListing;
  }

  async deleteListing(id: number): Promise<boolean> {
    const initialLength = this.skillListings.length;
    this.skillListings = this.skillListings.filter((l) => l.id !== id);
    return this.skillListings.length < initialLength;
  }

  // Message methods
  async createMessage(message: InsertMessage): Promise<SkillMessage> {
    const newMessage: SkillMessage = {
      ...message,
      id: this.nextMessageId++,
      createdAt: new Date(),
      read: false,
    };
    this.skillMessages.push(newMessage);
    return newMessage;
  }

  async getMessagesByListingId(listingId: number): Promise<SkillMessage[]> {
    return this.skillMessages
      .filter((message) => message.listingId === listingId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async getMessagesBetweenUsers(
    user1Id: number,
    user2Id: number
  ): Promise<SkillMessage[]> {
    return this.skillMessages
      .filter(
        (message) =>
          (message.senderId === user1Id && message.receiverId === user2Id) ||
          (message.senderId === user2Id && message.receiverId === user1Id)
      )
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async markMessageAsRead(id: number): Promise<SkillMessage | undefined> {
    const message = this.skillMessages.find((m) => m.id === id);
    if (!message) return undefined;
    const updatedMessage = { ...message, read: true };
    this.skillMessages = this.skillMessages.map((m) =>
      m.id === id ? updatedMessage : m
    );
    return updatedMessage;
  }
}

// Use MemoryStorage instead of DatabaseStorage
export const storage = new MemoryStorage();
