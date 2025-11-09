import { storage } from "./storage";

export async function seedData() {
  const events = [
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
      featured: 1,
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
      featured: 0,
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
      featured: 0,
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
      featured: 1,
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
      featured: 0,
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
      featured: 0,
    },
    {
      name: "India vs Australia - Final Match",
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=600&fit=crop",
      bannerUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1920&h=600&fit=crop",
      description: "Witness cricket history in the making! The ultimate showdown between two cricketing giants. Don't miss the action!",
      venue: "Wankhede Stadium",
      date: "2024-11-18",
      price: 2000,
      genre: "Cricket",
      featured: 1,
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
      featured: 0,
    },
  ];

  console.log('Seeding database with sample events...');
  
  for (const event of events) {
    await storage.createEvent(event);
  }
  
  console.log(`Successfully seeded ${events.length} events!`);
}
