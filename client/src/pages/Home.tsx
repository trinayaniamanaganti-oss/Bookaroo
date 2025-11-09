import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import BannerCarousel from "@/components/BannerCarousel";
import CategorySection from "@/components/CategorySection";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import type { Event } from "@shared/schema";

import banner1 from '@assets/generated_images/Action_movie_banner_explosion_4fe37ee5.png';
import banner2 from '@assets/generated_images/Concert_stadium_stage_lights_df115b14.png';
import banner3 from '@assets/generated_images/Bollywood_dance_scene_banner_21260230.png';
import banner4 from '@assets/generated_images/Cricket_stadium_night_match_7d98a7a3.png';
import banner5 from '@assets/generated_images/Theater_stage_red_curtains_cef4faff.png';

export default function Home() {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events', activeCategory],
    queryFn: async () => {
      const url = activeCategory === 'all' 
        ? '/api/events' 
        : `/api/events?category=${activeCategory}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch events');
      return response.json();
    },
  });

  const banners = [
    { id: '1', imageUrl: banner1, title: 'Mission Impossible: Final Reckoning', category: 'ACTION BLOCKBUSTER' },
    { id: '2', imageUrl: banner2, title: 'Coldplay Music of the Spheres Tour', category: 'LIVE IN CONCERT' },
    { id: '3', imageUrl: banner3, title: 'Pathaan Returns', category: 'BOLLYWOOD SPECTACULAR' },
    { id: '4', imageUrl: banner4, title: 'India vs Australia Final Match', category: 'CRICKET WORLD CUP' },
    { id: '5', imageUrl: banner5, title: 'The Phantom of the Opera', category: 'THEATER' },
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'Movie', label: 'Movies' },
    { id: 'Concert', label: 'Concerts' },
    { id: 'Sports', label: 'Sports' },
    { id: 'Theater', label: 'Theater' },
    { id: 'Comedy', label: 'Comedy' },
  ];

  const movies = events.filter(e => e.category === 'Movie');
  const concerts = events.filter(e => e.category === 'Concert');
  const otherEvents = events.filter(e => !['Movie', 'Concert'].includes(e.category));

  const formatEvent = (event: Event) => ({
    id: event.id,
    imageUrl: event.imageUrl,
    title: event.name,
    category: event.category,
    venue: event.venue,
    date: event.date,
    rating: event.rating || undefined,
    language: event.language || undefined,
    genre: event.genre || undefined,
    price: event.price,
    featured: !!event.featured,
  });

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

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No events available yet.</p>
            <Button onClick={() => setLocation('/admin')}>Add Your First Event</Button>
          </div>
        ) : (
          <>
            {(activeCategory === 'all' || activeCategory === 'Movie') && movies.length > 0 && (
              <CategorySection
                title="Recommended Movies"
                events={movies.map(formatEvent)}
                onEventClick={(id) => setLocation(`/event/${id}`)}
                onViewAll={() => console.log('View all movies')}
              />
            )}

            {(activeCategory === 'all' || activeCategory === 'Concert') && concerts.length > 0 && (
              <CategorySection
                title="Live Events & Concerts"
                events={concerts.map(formatEvent)}
                onEventClick={(id) => setLocation(`/event/${id}`)}
                onViewAll={() => console.log('View all events')}
              />
            )}

            {(activeCategory === 'all' || !['Movie', 'Concert'].includes(activeCategory)) && otherEvents.length > 0 && (
              <CategorySection
                title="More Events"
                events={otherEvents.map(formatEvent)}
                onEventClick={(id) => setLocation(`/event/${id}`)}
                onViewAll={() => console.log('View all other events')}
              />
            )}
          </>
        )}

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
