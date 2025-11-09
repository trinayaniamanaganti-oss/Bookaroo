# BookMyShow Clone - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from BookMyShow, Ticketmaster, and modern entertainment booking platforms that prioritize visual impact and seamless user flows.

**Core Principles**:
- Entertainment-first visual hierarchy with bold imagery
- Frictionless booking flows with clear progress indicators
- Mobile-responsive card-based layouts
- Trust-building through professional polish

---

## Typography System

**Font Stack**: Google Fonts
- Primary: Inter or Poppins (modern, readable)
- Headers: 600-700 weight
- Body: 400-500 weight
- CTAs: 600 weight

**Scale**:
- Hero Banner Text: text-4xl to text-6xl
- Section Headers: text-2xl to text-3xl
- Card Titles: text-lg to text-xl
- Body/Metadata: text-sm to text-base
- Labels/Tags: text-xs to text-sm

---

## Layout System

**Spacing Units**: Tailwind classes using 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-4, p-6, p-8
- Section spacing: py-12, py-16, py-20
- Card gaps: gap-4, gap-6
- Element margins: m-2, m-4, m-6

**Container Widths**:
- Main content: max-w-7xl mx-auto
- Banner carousel: w-full
- Event cards grid: max-w-6xl mx-auto
- Booking forms: max-w-3xl mx-auto

**Grid System**:
- Event cards: grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
- Banner carousel: Full-width with inner padding
- Seat selection: Custom grid based on theater layout (8-12 columns)

---

## Component Library

### 1. Header Navigation
- Fixed/sticky header with logo left, navigation center, user profile/login right
- Search bar prominent (icon + expandable input)
- Location selector dropdown
- Height: h-16 to h-20
- Icons: Heroicons (search, user, menu, location-pin)

### 2. Auto-Scrolling Banner Carousel
- Full-width hero carousel below header
- Height: h-64 md:h-80 lg:h-96
- Navigation arrows: Absolute positioned left/right with backdrop blur
- Dot indicators: Bottom center
- Auto-scroll: 5-second intervals
- Smooth transitions with crossfade effect
- Features large event/movie posters with gradient overlays for text readability

### 3. Event Cards (Reusable)
**Structure**:
- Aspect ratio 2:3 poster image
- Hover: Scale transform (scale-105) with shadow increase
- Overlay gradient for bottom text
- Title: Bold, text-lg
- Metadata: Genre/Category badge, venue, date (text-sm)
- CTA: "Book Now" button or rating display
- Border radius: rounded-lg
- Shadow: shadow-md hover:shadow-xl

**Variants**:
- Movie cards: Include rating, language tags
- Concert/Event cards: Include date badge, "Selling Fast" indicators
- Featured cards: Larger size with additional details

### 4. Category Sections
- Section header with "View All" link
- Horizontal scrollable card row or grid layout
- Category chips for filtering (Movies, Concerts, Sports, Theater, Comedy)
- Spacing: mb-12 between sections

### 5. Movie Booking Flow

**Page 1 - Movie Detail**:
- Large poster image (left) + details (right) on desktop
- Trailer embed option
- Synopsis, cast, crew
- "Book Tickets" prominent CTA

**Page 2 - Date & Time Selection**:
- Date selector: Horizontal scroll with active state
- Theater cards showing available showtimes
- Time slot buttons: Pill-shaped, grouped by theater
- Seating type labels (Gold, Silver, etc.) with pricing

**Page 3 - Seat Selection**:
- Interactive seat map with screen indicator at top
- Seat types: Available (clickable), Selected (highlighted), Booked (disabled)
- Legend showing seat status
- Live seat count and price calculation at bottom
- Seats: Responsive grid with gaps, hover states
- "Proceed to Pay" sticky footer

### 6. Event Booking Flow
- Event detail page with large banner image
- Ticket quantity selector with tier options (VIP, Premium, General)
- Date selector for multi-day events
- Add-ons section (parking, merchandise)
- Summary sidebar with total calculation

### 7. Booking Confirmation
- Success message with checkmark animation
- Booking details card: Event name, date, time, seats/tickets
- Large QR code (centered, generated via library)
- Download/Email ticket buttons
- "Add to Calendar" option
- Booking ID and barcode number

### 8. Admin Interface
- Dashboard with event management table
- Add Event form: Image URL input, name, category dropdown, venue, date/time pickers, pricing
- Preview card showing how event will appear
- Edit/Delete actions
- Simple, form-focused layout with clear labels

---

## Images

**Banner Carousel**: 5-6 high-quality featured event banners (1920x600px landscape format) showcasing movies/concerts with promotional text overlay

**Event Cards**: Vertical posters (400x600px) for movies, horizontal event images (600x400px) for concerts/shows

**Movie Detail Pages**: Large hero poster + backdrop image

**Seat Map Screen Indicator**: Simple graphic showing curved screen

**QR Codes**: Generated dynamically (200x200px minimum)

---

## Animations & Interactions

**Minimal Motion**:
- Banner carousel: Smooth slide/fade transitions (500ms)
- Card hover: Scale transform (200ms ease)
- Seat selection: Click feedback with scale pulse
- Button states: Standard hover/active (no elaborate effects)
- Loading states: Simple spinner or skeleton screens

**Navigation**:
- Smooth scroll to sections
- Modal overlays for login/quick actions
- Breadcrumb trail for booking flow steps

---

## Form Elements & Inputs

- Input fields: Consistent height (h-12), rounded borders (rounded-md)
- Focus states: Ring effect
- Date pickers: Calendar dropdown
- Quantity selectors: +/- buttons with number display
- Checkboxes/Radio: Custom styled to match theme
- Error states: Red border with message below

---

## Accessibility

- Keyboard navigation for seat selection grid
- ARIA labels for carousel navigation
- Focus indicators on all interactive elements
- Sufficient contrast ratios for text
- Alt text for all event images
- Screen reader announcements for booking confirmations

---

## Key Differentiators

- **Entertainment-focused**: Large visuals dominate, text is concise
- **Trust signals**: Clear pricing, seat availability, booking confirmations
- **Progressive disclosure**: Step-by-step booking flows without overwhelming
- **Social proof**: "Trending", "Selling Fast" badges on popular events
- **Responsive excellence**: Mobile-first card layouts that scale beautifully to desktop grids