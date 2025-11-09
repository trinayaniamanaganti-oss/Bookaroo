import { type User, type InsertUser, type Event, type InsertEvent, type Booking, type InsertBooking } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getEvent(id: string): Promise<Event | undefined>;
  listEvents(category?: string): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  deleteEvent(id: string): Promise<void>;
  
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  listBookings(): Promise<Booking[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private events: Map<string, Event>;
  private bookings: Map<string, Booking>;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.bookings = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async listEvents(category?: string, search?: string): Promise<Event[]> {
    const events = Array.from(this.events.values());
    let filteredEvents = events;
    
    if (category && category !== 'all') {
      filteredEvents = filteredEvents.filter(event => 
        event.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredEvents = filteredEvents.filter(event =>
        event.name.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        (event.genre && event.genre.toLowerCase().includes(searchLower)) ||
        (event.language && event.language.toLowerCase().includes(searchLower))
      );
    }

    return filteredEvents;
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const now = new Date();
    const event: Event = { 
      ...insertEvent,
      bannerUrl: insertEvent.bannerUrl ?? null,
      language: insertEvent.language ?? null,
      rating: insertEvent.rating ?? null,
      duration: insertEvent.duration ?? null,
      genre: insertEvent.genre ?? null,
      featured: insertEvent.featured ?? null,
      id,
      createdAt: now,
    };
    this.events.set(id, event);
    return event;
  }

  async deleteEvent(id: string): Promise<void> {
    this.events.delete(id);
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const now = new Date();
    const booking: Booking = {
      ...insertBooking,
      seats: insertBooking.seats ?? null,
      id,
      bookingDate: now,
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async listBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }
}

export const storage = new MemStorage();
