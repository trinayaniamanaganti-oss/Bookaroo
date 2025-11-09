# BookMyShow Clone - Entertainment Booking Platform

## Overview

This is a full-stack entertainment booking platform inspired by BookMyShow, enabling users to browse and book tickets for movies, concerts, sports events, theater shows, and comedy performances. The application provides a seamless booking experience with visual-first design, seat selection for movies, and tiered ticketing for events.

**Core Features:**
- Browse events across multiple categories (Movies, Concerts, Sports, Theater, Comedy)
- Detailed event pages with ratings, descriptions, and venue information
- Movie-specific seat selection with theater layouts
- Event-specific tiered ticket purchasing (VIP, Premium, General Admission)
- Booking confirmation with QR codes
- Admin panel for creating new events

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React 18 with TypeScript, using Vite as the build tool

**Routing:** Wouter for client-side routing with the following page structure:
- Home page with category filters and event listings
- Event detail pages with booking CTAs
- Movie booking flow with time slot selection and seat selection
- Event booking flow with tiered ticket selection
- Confirmation page with QR code generation
- Admin panel for event management

**State Management:**
- TanStack Query (React Query) for server state management and caching
- Local component state using React hooks for UI interactions
- No global state management library; query cache serves as the source of truth

**UI Component System:**
- Radix UI primitives for accessible, unstyled components
- shadcn/ui component library (New York style variant)
- Tailwind CSS for styling with custom design tokens
- Class Variance Authority (CVA) for component variants

**Design System:**
- Custom color palette using HSL values with CSS variables
- Neutral base colors with primary accent color (red-pink hue: 346° 77% 50%)
- Responsive grid layouts for event cards (2-5 columns based on breakpoint)
- Typography using Poppins/DM Sans font families
- Consistent spacing using Tailwind's spacing scale

### Backend Architecture

**Framework:** Express.js with TypeScript running on Node.js

**API Design:** RESTful JSON API with the following endpoints:
- `GET /api/events` - List all events with optional category filtering
- `GET /api/events/:id` - Get single event details
- `POST /api/events` - Create new event (admin)
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - List all bookings

**Validation:** Zod schemas for request validation (drizzle-zod integration)

**Data Storage Strategy:**
- In-memory storage implementation (`MemStorage`) for development
- Interface-based storage abstraction (`IStorage`) allows swapping to database
- Storage layer handles Users, Events, and Bookings

**Server-Side Rendering:** Vite middleware integration for development with HMR support

### Data Layer

**Schema Design (PostgreSQL-ready):**

**Users Table:**
- Primary key: UUID
- Fields: username (unique), password
- Purpose: User authentication (not fully implemented)

**Events Table:**
- Primary key: UUID
- Core fields: name, category, description, venue, date, price
- Media: imageUrl, bannerUrl
- Metadata: language, rating, duration, genre, featured flag
- Timestamps: createdAt

**Bookings Table:**
- Primary key: UUID
- References: eventId (not enforced as foreign key)
- Denormalized: eventName, eventDate, venue (for easy retrieval)
- Booking details: seats (comma-separated string), quantity, totalPrice
- Unique identifier: bookingCode
- Timestamps: bookingDate

**ORM:** Drizzle ORM configured for PostgreSQL with schema-first approach

**Rationale for Denormalization:** Event details are copied into bookings to preserve historical accuracy (event details may change, but booked tickets should reflect original information)

### Key Architectural Decisions

**Component-Based UI:**
- **Decision:** Radix UI + shadcn/ui component library
- **Rationale:** Provides accessible primitives with full styling control, avoiding opinionated frameworks
- **Trade-offs:** More initial setup than Material-UI, but greater customization flexibility

**Storage Abstraction:**
- **Decision:** Interface-based storage with in-memory implementation
- **Rationale:** Enables rapid development without database setup while maintaining clean architecture for future migration
- **Migration Path:** Swap `MemStorage` for `DbStorage` implementing same `IStorage` interface

**Booking Flow Separation:**
- **Decision:** Different booking flows for movies (seat selection) vs events (tiered tickets)
- **Rationale:** Movies require specific seat allocation; concerts/events use quantity-based ticketing
- **Implementation:** Conditional routing based on event category

**Data Validation:**
- **Decision:** Zod schemas generated from Drizzle schema definitions
- **Rationale:** Single source of truth for data structure; type-safe validation on both client and server
- **Alternative Considered:** Manual Zod schemas would duplicate schema definitions

**Asset Management:**
- **Decision:** Image URLs stored as strings; assets in `/attached_assets` directory
- **Rationale:** Allows flexibility for external image hosting (CDN) or local assets
- **Future Enhancement:** Could integrate with cloud storage (S3, Cloudinary)

**Session Management:**
- **Decision:** Session infrastructure prepared (connect-pg-simple in dependencies) but not actively used
- **Rationale:** Authentication flow not required for MVP; infrastructure ready for enhancement

## External Dependencies

### Core Framework Dependencies
- **React 18** - UI library
- **Express.js** - Backend HTTP server
- **Vite** - Build tool and development server
- **TypeScript** - Type safety across the stack

### Database & ORM
- **Drizzle ORM** (`drizzle-orm`, `drizzle-kit`) - Type-safe SQL ORM
- **@neondatabase/serverless** - Serverless PostgreSQL driver (Neon-compatible)
- **PostgreSQL** - Target database (schema defined, not actively connected in current implementation)

### UI Component Libraries
- **Radix UI** - 25+ accessible component primitives (Dialog, Dropdown, Select, etc.)
- **shadcn/ui** - Pre-styled component implementations
- **Lucide React** - Icon library
- **Tailwind CSS** - Utility-first CSS framework
- **class-variance-authority** - Component variant management
- **embla-carousel-react** - Carousel/slider functionality

### State Management & Data Fetching
- **TanStack Query** (`@tanstack/react-query`) - Server state management
- **React Hook Form** (`react-hook-form`) - Form state management
- **Zod** - Schema validation

### Utilities
- **wouter** - Lightweight routing library (~1.2KB)
- **date-fns** - Date manipulation and formatting
- **qrcode.react** - QR code generation for booking confirmations
- **nanoid** - Unique ID generation
- **clsx** & **tailwind-merge** - Conditional class name utilities

### Development Tools
- **@replit/vite-plugin-runtime-error-modal** - Development error overlay
- **esbuild** - Server-side bundling for production
- **tsx** - TypeScript execution for development server

### Session Management (Prepared but Not Active)
- **connect-pg-simple** - PostgreSQL session store for Express

### Not Currently Used
- Authentication system (user login/signup flows not implemented)
- Database connection (schema defined but using in-memory storage)
- Payment processing integration