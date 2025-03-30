import { 
  users, type User, type InsertUser,
  skillListings, type SkillListing, type InsertListing,
  skillMessages, type SkillMessage, type InsertMessage,
  payments, type Payment, type InsertPayment
} from "@shared/schema";
import { db } from "./db";
import { eq, and, or, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(id: number, userProfile: Partial<User>): Promise<User | undefined>;
  updateUserStripeInfo(id: number, stripeInfo: { stripeCustomerId: string, stripeSubscriptionId?: string }): Promise<User | undefined>;
  
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
  
  // Payment operations
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPaymentsByUserId(userId: number): Promise<Payment[]>;
  getPaymentById(id: number): Promise<Payment | undefined>;
  updatePaymentStatus(id: number, status: string): Promise<Payment | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Set default values for new users
    const userWithDefaults = {
      ...insertUser,
      rating: 50, // Default 5.0 rating
      reviewCount: 0
    };
    
    const [user] = await db.insert(users).values(userWithDefaults).returning();
    return user;
  }
  
  async updateUserProfile(id: number, userProfile: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set(userProfile)
      .where(eq(users.id, id))
      .returning();
    
    return updatedUser;
  }
  
  async updateUserStripeInfo(
    id: number, 
    stripeInfo: { stripeCustomerId: string, stripeSubscriptionId?: string }
  ): Promise<User | undefined> {
    const updateData: Partial<User> = {
      stripeCustomerId: stripeInfo.stripeCustomerId
    };
    
    if (stripeInfo.stripeSubscriptionId) {
      updateData.stripeSubscriptionId = stripeInfo.stripeSubscriptionId;
    }
    
    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();
    
    return updatedUser;
  }
  
  // Skill listing methods
  async createListing(listing: InsertListing): Promise<SkillListing> {
    const [newListing] = await db.insert(skillListings).values(listing).returning();
    return newListing;
  }
  
  async getListings(): Promise<SkillListing[]> {
    return await db.select().from(skillListings).orderBy(desc(skillListings.createdAt));
  }
  
  async getListingById(id: number): Promise<SkillListing | undefined> {
    const [listing] = await db.select().from(skillListings).where(eq(skillListings.id, id));
    return listing;
  }
  
  async getListingsByUserId(userId: number): Promise<SkillListing[]> {
    return await db
      .select()
      .from(skillListings)
      .where(eq(skillListings.userId, userId))
      .orderBy(desc(skillListings.createdAt));
  }
  
  async updateListing(id: number, listingUpdate: Partial<SkillListing>): Promise<SkillListing | undefined> {
    const [updatedListing] = await db
      .update(skillListings)
      .set(listingUpdate)
      .where(eq(skillListings.id, id))
      .returning();
    
    return updatedListing;
  }
  
  async deleteListing(id: number): Promise<boolean> {
    const result = await db
      .delete(skillListings)
      .where(eq(skillListings.id, id))
      .returning({ id: skillListings.id });
    
    return result.length > 0;
  }
  
  // Message methods
  async createMessage(message: InsertMessage): Promise<SkillMessage> {
    const messageWithDefaults = {
      ...message,
      read: false
    };
    
    const [newMessage] = await db.insert(skillMessages).values(messageWithDefaults).returning();
    return newMessage;
  }
  
  async getMessagesByListingId(listingId: number): Promise<SkillMessage[]> {
    return await db
      .select()
      .from(skillMessages)
      .where(eq(skillMessages.listingId, listingId))
      .orderBy(skillMessages.createdAt);
  }
  
  async getMessagesBetweenUsers(user1Id: number, user2Id: number): Promise<SkillMessage[]> {
    return await db
      .select()
      .from(skillMessages)
      .where(
        or(
          and(
            eq(skillMessages.senderId, user1Id),
            eq(skillMessages.receiverId, user2Id)
          ),
          and(
            eq(skillMessages.senderId, user2Id),
            eq(skillMessages.receiverId, user1Id)
          )
        )
      )
      .orderBy(skillMessages.createdAt);
  }
  
  async markMessageAsRead(id: number): Promise<SkillMessage | undefined> {
    const [updatedMessage] = await db
      .update(skillMessages)
      .set({ read: true })
      .where(eq(skillMessages.id, id))
      .returning();
    
    return updatedMessage;
  }
  
  // Payment methods
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [newPayment] = await db.insert(payments).values(payment).returning();
    return newPayment;
  }
  
  async getPaymentsByUserId(userId: number): Promise<Payment[]> {
    return await db
      .select()
      .from(payments)
      .where(eq(payments.userId, userId))
      .orderBy(desc(payments.createdAt));
  }
  
  async getPaymentById(id: number): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment;
  }
  
  async updatePaymentStatus(id: number, status: string): Promise<Payment | undefined> {
    const [updatedPayment] = await db
      .update(payments)
      .set({ status })
      .where(eq(payments.id, id))
      .returning();
    
    return updatedPayment;
  }
}

// Switch from MemStorage to DatabaseStorage
export const storage = new DatabaseStorage();
