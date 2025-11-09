import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  bannerUrl: text("banner_url"),
  description: text("description").notNull(),
  venue: text("venue").notNull(),
  date: text("date").notNull(),
  price: integer("price").notNull(),
  language: text("language"),
  rating: text("rating"),
  duration: text("duration"),
  genre: text("genre"),
  featured: integer("featured").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull(),
  eventName: text("event_name").notNull(),
  eventDate: text("event_date").notNull(),
  venue: text("venue").notNull(),
  seats: text("seats"),
  quantity: integer("quantity").notNull(),
  totalPrice: integer("total_price").notNull(),
  bookingCode: text("booking_code").notNull(),
  bookingDate: timestamp("booking_date").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  bookingDate: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
