import { useState } from "react";
import Header from "@/components/Header";
import BannerCarousel from "@/components/BannerCarousel";
import CategorySection from "@/components/CategorySection";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

import banner1 from '@assets/generated_images/Action_movie_banner_explosion_4fe37ee5.png';
import banner2 from '@assets/generated_images/Concert_stadium_stage_lights_df115b14.png';
import banner3 from '@assets/generated_images/Bollywood_dance_scene_banner_21260230.png';
import banner4 from '@assets/generated_images/Cricket_stadium_night_match_7d98a7a3.png';
import banner5 from '@assets/generated_images/Theater_stage_red_curtains_cef4faff.png';
import poster1 from '@assets/generated_images/Sci-fi_movie_poster_neon_3110f571.png';
import poster2 from '@assets/generated_images/Romantic_comedy_couple_poster_25cfdf8a.png';
import poster3 from '@assets/generated_images/Horror_mansion_poster_dark_34bd089b.png';
import poster4 from '@assets/generated_images/Rock_concert_guitar_lightning_095ca897.png';
import poster5 from '@assets/generated_images/Comedy_show_microphone_spotlight_29149b4d.png';

export default function Home() {
  const [, setLocation] = useLocation();
  
  const banners = [
    { id: '1', imageUrl: banner1, title: 'Mission Impossible: Final Reckoning', category: 'ACTION BLOCKBUSTER' },
    { id: '2', imageUrl: banner2, title: 'Coldplay Music of the Spheres Tour', category: 'LIVE IN CONCERT' },
    { id: '3', imageUrl: banner3, title: 'Pathaan Returns', category: 'BOLLYWOOD SPECTACULAR' },
    { id: '4', imageUrl: banner4, title: 'India vs Australia Final Match', category: 'CRICKET WORLD CUP' },
    { id: '5', imageUrl: banner5, title: 'The Phantom of the Opera', category: 'THEATER' },
  ];

  const movies = [
    {
      id: '1',
      imageUrl: poster1,
      title: 'Interstellar Odyssey',
      category: 'Movie',
      venue: 'Multiple Cinemas',
      rating: '8.9',
      language: 'English',
      genre: 'Sci-Fi',
      price: 250,
      featured: true,
    },
    {
      id: '2',
      imageUrl: poster2,
      title: 'Love in Paris',
      category: 'Movie',
      venue: 'Multiple Cinemas',
      rating: '7.5',
      language: 'English',
      genre: 'Romance',
      price: 200,
    },
    {
      id: '3',
      imageUrl: poster3,
      title: 'The Haunting',
      category: 'Movie',
      venue: 'Multiple Cinemas',
      rating: '8.2',
      language: 'English',
      genre: 'Horror',
      price: 220,
    },
    {
      id: '4',
      imageUrl: poster1,
      title: 'Galactic Wars',
      category: 'Movie',
      venue: 'Multiple Cinemas',
      rating: '9.1',
      language: 'English',
      genre: 'Action',
      price: 300,
    },
    {
      id: '5',
      imageUrl: poster2,
      title: 'Summer Romance',
      category: 'Movie',
      venue: 'Multiple Cinemas',
      rating: '7.8',
      language: 'Hindi',
      genre: 'Drama',
      price: 180,
    },
  ];

  const events = [
    {
      id: '6',
      imageUrl: poster4,
      title: 'Rock Nation Tour 2024',
      category: 'Concert',
      venue: 'DY Patil Stadium',
      date: 'Sat, 15 Nov',
      genre: 'Rock',
      price: 999,
    },
    {
      id: '7',
      imageUrl: poster5,
      title: 'Stand Up Comedy Night',
      category: 'Comedy',
      venue: 'Canvas Laugh Club',
      date: 'Fri, 12 Nov',
      genre: 'Comedy',
      price: 499,
    },
    {
      id: '8',
      imageUrl: poster4,
      title: 'Sunburn Festival',
      category: 'Concert',
      venue: 'Mahalaxmi Race Course',
      date: 'Sun, 20 Nov',
      genre: 'EDM',
      price: 1500,
    },
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'movies', label: 'Movies' },
    { id: 'concerts', label: 'Concerts' },
    { id: 'sports', label: 'Sports' },
    { id: 'theater', label: 'Theater' },
    { id: 'comedy', label: 'Comedy' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BannerCarousel banners={banners} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'default' : 'outline'}
              data-testid={`button-category-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className="flex-shrink-0"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        <CategorySection
          title="Recommended Movies"
          events={movies}
          onEventClick={(id) => setLocation(`/movie/${id}`)}
          onViewAll={() => console.log('View all movies')}
        />

        <CategorySection
          title="Live Events & Concerts"
          events={events}
          onEventClick={(id) => setLocation(`/event/${id}`)}
          onViewAll={() => console.log('View all events')}
        />

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            data-testid="button-admin"
            onClick={() => setLocation('/admin')}
          >
            Add New Event (Admin)
          </Button>
        </div>
      </div>
    </div>
  );
}
