import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  avatar: text("avatar"),
  bio: text("bio"),
  rating: integer("rating"),
  reviewCount: integer("review_count"),
});

export const skillListings = pgTable("skill_listings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  offering: text("offering").array().notNull(),
  seeking: text("seeking").array().notNull(),
  description: text("description").notNull(),
  timeCommitment: text("time_commitment").notNull(),
  experienceLevel: text("experience_level").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const skillMessages = pgTable("skill_messages", {
  id: serial("id").primaryKey(),
  listingId: integer("listing_id").notNull(),
  senderId: integer("sender_id").notNull(),
  receiverId: integer("receiver_id").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  read: boolean("read").default(false).notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  avatar: true,
  bio: true,
});

export const insertListingSchema = createInsertSchema(skillListings).pick({
  userId: true,
  offering: true,
  seeking: true,
  description: true,
  timeCommitment: true,
  experienceLevel: true,
});

export const insertMessageSchema = createInsertSchema(skillMessages).pick({
  listingId: true,
  senderId: true,
  receiverId: true,
  message: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertListing = z.infer<typeof insertListingSchema>;
export type SkillListing = typeof skillListings.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type SkillMessage = typeof skillMessages.$inferSelect;
