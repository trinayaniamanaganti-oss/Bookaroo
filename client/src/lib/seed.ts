// Frontend seed data copied from server/seed.ts
// This file is used as a fallback when the backend is unavailable.

// export const seededEvents = [
//   {
//     id: "seed-1",
//     name: "Interstellar Odyssey",
//     category: "Movie",
//     imageUrl:
//       "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
//     bannerUrl:
//       "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=600&fit=crop",
//     description:
//       "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Experience stunning visuals and mind-bending storytelling.",
//     venue: "Multiple Cinemas",
//     date: "2024-11-10",
//     price: 250,
//     language: "English",
//     rating: "8.9",
//     duration: "2h 45m",
//     genre: "Sci-Fi",
//     featured: 1,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "seed-2",
//     name: "Love in Paris",
//     category: "Movie",
//     imageUrl:
//       "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
//     description:
//       "A heartwarming romantic comedy about two strangers who meet in the city of love and embark on an unforgettable journey together.",
//     venue: "Multiple Cinemas",
//     date: "2024-11-12",
//     price: 200,
//     language: "English",
//     rating: "7.5",
//     duration: "2h 10m",
//     genre: "Romance",
//     featured: 0,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "seed-3",
//     name: "The Haunting",
//     category: "Movie",
//     imageUrl:
//       "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&h=600&fit=crop",
//     description:
//       "A spine-chilling horror thriller that will keep you on the edge of your seat. Not for the faint of heart.",
//     venue: "Multiple Cinemas",
//     date: "2024-11-15",
//     price: 220,
//     language: "English",
//     rating: "8.2",
//     duration: "2h 20m",
//     genre: "Horror",
//     featured: 0,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "seed-4",
//     name: "Rock Nation Tour 2024",
//     category: "Concert",
//     imageUrl:
//       "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=600&fit=crop",
//     bannerUrl:
//       "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&h=600&fit=crop",
//     description:
//       "The biggest rock concert of the year featuring legendary bands and explosive performances. An unforgettable night of music!",
//     venue: "DY Patil Stadium",
//     date: "2024-11-15",
//     price: 999,
//     genre: "Rock",
//     featured: 1,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "seed-5",
//     name: "Stand Up Comedy Night",
//     category: "Comedy",
//     imageUrl:
//       "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=600&fit=crop",
//     description:
//       "Laugh out loud with the best comedians in town. A night full of humor, wit, and non-stop entertainment!",
//     venue: "Canvas Laugh Club",
//     date: "2024-11-12",
//     price: 499,
//     genre: "Comedy",
//     featured: 0,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "seed-6",
//     name: "Sunburn Festival",
//     category: "Concert",
//     imageUrl:
//       "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop",
//     description:
//       "Asia's premier electronic music festival returns with the biggest DJs and stunning production. Dance the night away!",
//     venue: "Mahalaxmi Race Course",
//     date: "2024-11-20",
//     price: 1500,
//     genre: "EDM",
//     featured: 0,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "seed-7",
//     name: "India vs Australia - Final Match",
//     category: "Sports",
//     imageUrl:
//       "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=600&fit=crop",
//     bannerUrl:
//       "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1920&h=600&fit=crop",
//     description:
//       "Witness cricket history in the making! The ultimate showdown between two cricketing giants. Don't miss the action!",
//     venue: "Wankhede Stadium",
//     date: "2024-11-18",
//     price: 2000,
//     genre: "Cricket",
//     featured: 1,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "seed-8",
//     name: "The Lion King - Musical",
//     category: "Theater",
//     imageUrl:
//       "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=600&fit=crop",
//     description:
//       "Experience the magic of Broadway with this stunning theatrical adaptation. A visual spectacle for all ages!",
//     venue: "NCPA Mumbai",
//     date: "2024-11-22",
//     price: 1200,
//     genre: "Musical",
//     featured: 0,
//     createdAt: new Date().toISOString(),
//   },
// ];

export const seededEvents = [
  // ======== MOVIES ========
  {
    id: "seed-1",
    name: "Interstellar Odyssey",
    category: "Movie",
    imageUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    bannerUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=600&fit=crop",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Experience stunning visuals and mind-bending storytelling.",
    venue: "Multiple Cinemas",
    date: "2024-11-10",
    price: 250,
    language: "English",
    rating: "8.9",
    duration: "2h 45m",
    genre: "Sci-Fi",
    featured: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-2",
    name: "Love in Paris",
    category: "Movie",
    imageUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    description:
      "A heartwarming romantic comedy about two strangers who meet in the city of love and embark on an unforgettable journey together.",
    venue: "Multiple Cinemas",
    date: "2024-11-12",
    price: 200,
    language: "English",
    rating: "7.5",
    duration: "2h 10m",
    genre: "Romance",
    featured: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-3",
    name: "The Haunting",
    category: "Movie",
    imageUrl:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&h=600&fit=crop",
    description:
      "A spine-chilling horror thriller that will keep you on the edge of your seat. Not for the faint of heart.",
    venue: "Multiple Cinemas",
    date: "2024-11-15",
    price: 220,
    language: "English",
    rating: "8.2",
    duration: "2h 20m",
    genre: "Horror",
    featured: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-9",
    name: "Deadpool & Wolverine",
    category: "Movie",
    imageUrl:
      "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=400&h=600&fit=crop",
    bannerUrl:
      "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=1920&h=600&fit=crop",
    description:
      "The long-awaited Marvel crossover brings Deadpool and Wolverine together for chaos, comedy, and carnage.",
    venue: "PVR Cinemas",
    date: "2025-01-12",
    price: 350,
    language: "English",
    rating: "9.1",
    duration: "2h 30m",
    genre: "Action",
    featured: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-10",
    name: "Dune: Part Two",
    category: "Movie",
    imageUrl:
      "https://images.unsplash.com/photo-1619021225073-43b9f7f4f2cb?w=400&h=600&fit=crop",
    bannerUrl:
      "https://images.unsplash.com/photo-1619021225073-43b9f7f4f2cb?w=1920&h=600&fit=crop",
    description:
      "Paul Atreides unites with the Fremen and seeks revenge against the conspirators who destroyed his family.",
    venue: "INOX Cinemas",
    date: "2024-12-05",
    price: 400,
    language: "English",
    rating: "8.7",
    duration: "2h 46m",
    genre: "Sci-Fi",
    featured: 1,
    createdAt: new Date().toISOString(),
  },

  // ======== CONCERTS ========
  {
    id: "seed-4",
    name: "Rock Nation Tour 2024",
    category: "Concert",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=600&fit=crop",
    bannerUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&h=600&fit=crop",
    description:
      "The biggest rock concert of the year featuring legendary bands and explosive performances. An unforgettable night of music!",
    venue: "DY Patil Stadium",
    date: "2024-11-15",
    price: 999,
    genre: "Rock",
    featured: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-6",
    name: "Sunburn Festival 2024",
    category: "Concert",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop",
    description:
      "Asia's premier electronic music festival returns with the biggest DJs and stunning production. Dance the night away!",
    venue: "Mahalaxmi Race Course",
    date: "2024-12-27",
    price: 1500,
    genre: "EDM",
    featured: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-11",
    name: "Arijit Singh Live - Hyderabad",
    category: "Concert",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=600&fit=crop",
    description:
      "India's favorite voice returns with an emotional, magical night filled with soulful melodies and unforgettable hits.",
    venue: "Gachibowli Stadium",
    date: "2025-02-15",
    price: 2500,
    genre: "Bollywood",
    featured: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-12",
    name: "Taylor Swift - The Eras Tour (Mumbai)",
    category: "Concert",
    imageUrl:
      "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?w=400&h=600&fit=crop",
    bannerUrl:
      "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?w=1920&h=600&fit=crop",
    description:
      "Taylor Swift brings her record-breaking tour to India for the first time — a once-in-a-lifetime experience for Swifties!",
    venue: "Navi Mumbai Stadium",
    date: "2025-03-02",
    price: 4999,
    genre: "Pop",
    featured: 1,
    createdAt: new Date().toISOString(),
  },

  // ======== SPORTS ========
  {
    id: "seed-7",
    name: "India vs Australia - Final Match",
    category: "Sports",
    imageUrl:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=600&fit=crop",
    bannerUrl:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1920&h=600&fit=crop",
    description:
      "Witness cricket history in the making! The ultimate showdown between two cricketing giants. Don't miss the action!",
    venue: "Wankhede Stadium",
    date: "2024-11-18",
    price: 2000,
    genre: "Cricket",
    featured: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-13",
    name: "India vs Pakistan - T20 Clash",
    category: "Sports",
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=600&fit=crop",
    description:
      "The most anticipated cricket rivalry returns. The excitement, the tension, the roar of the crowd!",
    venue: "Narendra Modi Stadium",
    date: "2025-02-10",
    price: 3500,
    genre: "Cricket",
    featured: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-14",
    name: "Indian Super League - Hyderabad FC vs Kerala Blasters",
    category: "Sports",
    imageUrl:
      "https://images.unsplash.com/photo-1549921296-3ecf97d12d8b?w=400&h=600&fit=crop",
    description:
      "Catch the electric ISL atmosphere as Hyderabad FC takes on Kerala Blasters in a thrilling football showdown.",
    venue: "Gachibowli Stadium",
    date: "2024-12-01",
    price: 800,
    genre: "Football",
    featured: 0,
    createdAt: new Date().toISOString(),
  },

  // ======== THEATER / ARTS ========
  {
    id: "seed-8",
    name: "The Lion King - Musical",
    category: "Theater",
    imageUrl:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=600&fit=crop",
    description:
      "Experience the magic of Broadway with this stunning theatrical adaptation. A visual spectacle for all ages!",
    venue: "NCPA Mumbai",
    date: "2024-11-22",
    price: 1200,
    genre: "Musical",
    featured: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-15",
    name: "Phantom of the Opera",
    category: "Theater",
    imageUrl:
      "https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=400&h=600&fit=crop",
    description:
      "The classic Andrew Lloyd Webber musical returns with a grand production and hauntingly beautiful music.",
    venue: "Royal Opera House, Mumbai",
    date: "2025-01-10",
    price: 1500,
    genre: "Musical",
    featured: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-16",
    name: "Art & Soul Exhibition 2025",
    category: "Exhibition",
    imageUrl:
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=600&fit=crop",
    description:
      "An artistic journey through color, emotion, and creativity. Showcasing 50+ contemporary Indian artists.",
    venue: "Jehangir Art Gallery, Mumbai",
    date: "2025-01-25",
    price: 300,
    genre: "Art",
    featured: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-17",
    name: "Stand Up Comedy Night",
    category: "Comedy",
    imageUrl:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=600&fit=crop",
    description:
      "Laugh out loud with the best comedians in town. A night full of humor, wit, and non-stop entertainment!",
    venue: "Canvas Laugh Club",
    date: "2024-12-14",
    price: 499,
    genre: "Comedy",
    featured: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-18",
    name: "Vir Das - Mind Fool India Tour",
    category: "Comedy",
    imageUrl:
      "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=400&h=600&fit=crop",
    description:
      "The Emmy-winning comedian is back with his all-new show — brutally honest, smart, and hilarious.",
    venue: "JRC Convention, Hyderabad",
    date: "2025-02-01",
    price: 1200,
    genre: "Stand-Up",
    featured: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-19",
    name: "Mumbai Marathon 2025",
    category: "Sports",
    imageUrl:
      "https://images.unsplash.com/photo-1495578942200-c5f5b56c6b1a?w=400&h=600&fit=crop",
    description:
      "Join thousands of runners from around the world in India’s biggest marathon. Run for fitness, fun, and charity!",
    venue: "Marine Drive, Mumbai",
    date: "2025-01-19",
    price: 500,
    genre: "Marathon",
    featured: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-20",
    name: "Coldplay - Music of the Spheres Tour",
    category: "Concert",
    imageUrl:
      "https://images.unsplash.com/photo-1507878866276-a947ef722fee?w=400&h=600&fit=crop",
    description:
      "Coldplay’s world tour comes to India for a spectacular, planet-friendly concert filled with lights, emotion, and music.",
    venue: "Bangalore International Exhibition Centre",
    date: "2025-03-10",
    price: 6000,
    genre: "Pop Rock",
    featured: 1,
    createdAt: new Date().toISOString(),
  },
  {
  id: "seed-1",
    name: "Interstellar Odyssey",
    category: "Movie",
    imageUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    bannerUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=600&fit=crop",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Experience stunning visuals and mind-bending storytelling.",
    venue: "Multiple Cinemas",
    date: "2024-11-10",
    price: 250,
    language: "English",
    rating: "8.9",
    duration: "2h 45m",
    genre: "Sci-Fi",
    featured: 1,
    createdAt: new Date().toISOString(),
},
   {
  id: "seed-1",
    name: "Interstellar Odyssey",
    category: "Movie",
    imageUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    bannerUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=600&fit=crop",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Experience stunning visuals and mind-bending storytelling.",
    venue: "Multiple Cinemas",
    date: "2024-11-10",
    price: 250,
    language: "English",
    rating: "8.9",
    duration: "2h 45m",
    genre: "Sci-Fi",
    featured: 1,
    createdAt: new Date().toISOString(),
}
];


export default seededEvents;
