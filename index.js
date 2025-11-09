// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  events;
  bookings;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.events = /* @__PURE__ */ new Map();
    this.bookings = /* @__PURE__ */ new Map();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getEvent(id) {
    return this.events.get(id);
  }
  async listEvents(category, search) {
    const events2 = Array.from(this.events.values());
    let filteredEvents = events2;
    if (category && category !== "all") {
      filteredEvents = filteredEvents.filter(
        (event) => event.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (search) {
      const searchLower = search.toLowerCase();
      filteredEvents = filteredEvents.filter(
        (event) => event.name.toLowerCase().includes(searchLower) || event.description.toLowerCase().includes(searchLower) || event.genre && event.genre.toLowerCase().includes(searchLower) || event.language && event.language.toLowerCase().includes(searchLower)
      );
    }
    return filteredEvents;
  }
  async createEvent(insertEvent) {
    const id = randomUUID();
    const now = /* @__PURE__ */ new Date();
    const event = {
      ...insertEvent,
      bannerUrl: insertEvent.bannerUrl ?? null,
      language: insertEvent.language ?? null,
      rating: insertEvent.rating ?? null,
      duration: insertEvent.duration ?? null,
      genre: insertEvent.genre ?? null,
      featured: insertEvent.featured ?? null,
      id,
      createdAt: now
    };
    this.events.set(id, event);
    return event;
  }
  async deleteEvent(id) {
    this.events.delete(id);
  }
  async getBooking(id) {
    return this.bookings.get(id);
  }
  async createBooking(insertBooking) {
    const id = randomUUID();
    const now = /* @__PURE__ */ new Date();
    const booking = {
      ...insertBooking,
      seats: insertBooking.seats ?? null,
      id,
      bookingDate: now
    };
    this.bookings.set(id, booking);
    return booking;
  }
  async listBookings() {
    return Array.from(this.bookings.values());
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var events = pgTable("events", {
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
  createdAt: timestamp("created_at").defaultNow()
});
var bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull(),
  eventName: text("event_name").notNull(),
  eventDate: text("event_date").notNull(),
  venue: text("venue").notNull(),
  seats: text("seats"),
  quantity: integer("quantity").notNull(),
  totalPrice: integer("total_price").notNull(),
  bookingCode: text("booking_code").notNull(),
  bookingDate: timestamp("booking_date").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true
});
var insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  bookingDate: true
});

// server/routes.ts
import { ZodError } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/events", async (req, res) => {
    try {
      const category = req.query.category;
      const search = req.query.search;
      const events2 = await storage.listEvents(category, search);
      res.json(events2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });
  app2.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event" });
    }
  });
  app2.post("/api/events", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      console.error("Error creating event:", error, "body:", req.body);
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(400).json({ error: error.message || "Invalid event data" });
    }
  });
  app2.delete("/api/events/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const existing = await storage.getEvent(id);
      if (!existing) {
        return res.status(404).json({ error: "Event not found" });
      }
      await storage.deleteEvent(id);
      return res.status(204).end();
    } catch (error) {
      console.error("Error deleting event:", error, "id:", req.params.id);
      return res.status(500).json({ error: "Failed to delete event" });
    }
  });
  app2.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      console.error("Error creating booking:", error, "body:", req.body);
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(400).json({ error: error.message || "Invalid booking data" });
    }
  });
  app2.get("/api/bookings", async (req, res) => {
    try {
      const bookings2 = await storage.listBookings();
      res.json(bookings2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });
  app2.get("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getBooking(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch booking" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var basePath = "/Bookaroo/";
var vite_config_default = defineConfig({
  base: basePath,
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      // @ts-ignore - dynamic imports
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      // @ts-ignore - dynamic imports
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        secure: false
      }
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/seed.ts
async function seedData() {
  const events2 = [
    {
      name: "Interstellar Odyssey",
      category: "Movie",
      imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
      bannerUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=600&fit=crop",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Experience stunning visuals and mind-bending storytelling.",
      venue: "Multiple Cinemas",
      date: "2024-11-10",
      price: 250,
      language: "English",
      rating: "8.9",
      duration: "2h 45m",
      genre: "Sci-Fi",
      featured: 1
    },
    {
      name: "Love in Paris",
      category: "Movie",
      imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
      description: "A heartwarming romantic comedy about two strangers who meet in the city of love and embark on an unforgettable journey together.",
      venue: "Multiple Cinemas",
      date: "2024-11-12",
      price: 200,
      language: "English",
      rating: "7.5",
      duration: "2h 10m",
      genre: "Romance",
      featured: 0
    },
    {
      name: "The Haunting",
      category: "Movie",
      imageUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&h=600&fit=crop",
      description: "A spine-chilling horror thriller that will keep you on the edge of your seat. Not for the faint of heart.",
      venue: "Multiple Cinemas",
      date: "2024-11-15",
      price: 220,
      language: "English",
      rating: "8.2",
      duration: "2h 20m",
      genre: "Horror",
      featured: 0
    },
    {
      name: "Rock Nation Tour 2024",
      category: "Concert",
      imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=600&fit=crop",
      bannerUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&h=600&fit=crop",
      description: "The biggest rock concert of the year featuring legendary bands and explosive performances. An unforgettable night of music!",
      venue: "DY Patil Stadium",
      date: "2024-11-15",
      price: 999,
      genre: "Rock",
      featured: 1
    },
    {
      name: "Stand Up Comedy Night",
      category: "Comedy",
      imageUrl: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=600&fit=crop",
      description: "Laugh out loud with the best comedians in town. A night full of humor, wit, and non-stop entertainment!",
      venue: "Canvas Laugh Club",
      date: "2024-11-12",
      price: 499,
      genre: "Comedy",
      featured: 0
    },
    {
      name: "Sunburn Festival",
      category: "Concert",
      imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop",
      description: "Asia's premier electronic music festival returns with the biggest DJs and stunning production. Dance the night away!",
      venue: "Mahalaxmi Race Course",
      date: "2024-11-20",
      price: 1500,
      genre: "EDM",
      featured: 0
    },
    {
      name: "India vs Australia - Final Match",
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=600&fit=crop",
      bannerUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1920&h=600&fit=crop",
      description: "Witness cricket history in the making! The ultimate showdown between two cricketing giants. Don't miss the action!",
      venue: "Wankhede Stadium",
      date: "2024-11-18",
      price: 2e3,
      genre: "Cricket",
      featured: 1
    },
    {
      name: "The Lion King - Musical",
      category: "Theater",
      imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=600&fit=crop",
      description: "Experience the magic of Broadway with this stunning theatrical adaptation. A visual spectacle for all ages!",
      venue: "NCPA Mumbai",
      date: "2024-11-22",
      price: 1200,
      genre: "Musical",
      featured: 0
    }
  ];
  console.log("Seeding database with sample events...");
  for (const event of events2) {
    await storage.createEvent(event);
  }
  console.log(`Successfully seeded ${events2.length} events!`);
}

// server/index.ts
var app = express2();
app.use(
  express2.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    }
  })
);
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  await seedData();
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "3000", 10);
  const host = process.env.HOST || "127.0.0.1";
  server.listen(port, host, () => {
    log(`\u{1F680} Server running locally at http://${host}:${port}`);
  });
})();
