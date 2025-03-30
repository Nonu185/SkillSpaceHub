import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
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
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  email: text("email"),
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
  price: decimal("price", { precision: 10, scale: 2 }),
  isPremium: boolean("is_premium").default(false),
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

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("usd").notNull(),
  status: text("status").notNull(),
  stripePaymentId: text("stripe_payment_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  description: text("description"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  avatar: true,
  bio: true,
  email: true,
});

export const insertListingSchema = createInsertSchema(skillListings).pick({
  userId: true,
  offering: true,
  seeking: true,
  description: true,
  timeCommitment: true,
  experienceLevel: true,
  price: true,
  isPremium: true,
});

export const insertMessageSchema = createInsertSchema(skillMessages).pick({
  listingId: true,
  senderId: true,
  receiverId: true,
  message: true,
});

export const insertPaymentSchema = createInsertSchema(payments).pick({
  userId: true,
  amount: true,
  currency: true,
  status: true,
  stripePaymentId: true,
  description: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertListing = z.infer<typeof insertListingSchema>;
export type SkillListing = typeof skillListings.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type SkillMessage = typeof skillMessages.$inferSelect;

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;
