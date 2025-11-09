import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import BannerCarousel from "@/components/BannerCarousel";
import CategorySection from "@/components/CategorySection";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import type { Event } from "@shared/schema";

export default function Home() {
  const [location, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const searchQuery = searchParams.get('search') || '';

  const params = new URLSearchParams();
  if (activeCategory !== 'all') params.set('category', activeCategory);
  if (searchQuery) params.set('search', searchQuery);
  const url = params.toString() ? `/api/events?${params.toString()}` : '/api/events';

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: [url],
    // use default queryFn (configured in queryClient) so seed merging/fallback works
  });

  const banners = [
    { 
      id: '1', 
      imageUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=1920&h=600&q=80', 
      title: 'Mission Impossible: Final Reckoning', 
      category: 'ACTION BLOCKBUSTER' 
    },
    { 
      id: '2', 
      imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1920&h=600&q=80', 
      title: 'Coldplay Music of the Spheres Tour', 
      category: 'LIVE IN CONCERT' 
    },
    { 
      id: '3', 
      imageUrl: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1920&h=600&q=80', 
      title: 'Pathaan Returns', 
      category: 'BOLLYWOOD SPECTACULAR' 
    },
    { 
      id: '4', 
      imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1920&h=600&q=80', 
      title: 'India vs Australia Final Match', 
      category: 'CRICKET WORLD CUP' 
    },
    { 
      id: '5', 
      imageUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1920&h=600&q=80', 
      title: 'The Phantom of the Opera', 
      category: 'THEATER' 
    },
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'Movie', label: 'Movies' },
    { id: 'Concert', label: 'Concerts' },
    { id: 'Sports', label: 'Sports' },
    { id: 'Theater', label: 'Theater' },
    { id: 'Comedy', label: 'Comedy' },
    { id: 'Other', label: 'Other' },
  ];

  const mainCategories = ['Movie', 'Concert', 'Sports', 'Theater', 'Comedy'];
  
  const movies = events.filter(e => e.category === 'Movie');
  const concerts = events.filter(e => e.category === 'Concert');
  const sports = events.filter(e => e.category === 'Sports');
  const theater = events.filter(e => e.category === 'Theater');
  const comedy = events.filter(e => e.category === 'Comedy');
  const otherEvents = events.filter(e => !mainCategories.includes(e.category));

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
                onViewAll={() => console.log('View all concerts')}
              />
            )}

            {(activeCategory === 'all' || activeCategory === 'Sports') && sports.length > 0 && (
              <CategorySection
                title="Sports Events"
                events={sports.map(formatEvent)}
                onEventClick={(id) => setLocation(`/event/${id}`)}
                onViewAll={() => console.log('View all sports')}
              />
            )}

            {(activeCategory === 'all' || activeCategory === 'Theater') && theater.length > 0 && (
              <CategorySection
                title="Theater & Arts"
                events={theater.map(formatEvent)}
                onEventClick={(id) => setLocation(`/event/${id}`)}
                onViewAll={() => console.log('View all theater events')}
              />
            )}

            {(activeCategory === 'all' || activeCategory === 'Comedy') && comedy.length > 0 && (
              <CategorySection
                title="Comedy Shows"
                events={comedy.map(formatEvent)}
                onEventClick={(id) => setLocation(`/event/${id}`)}
                onViewAll={() => console.log('View all comedy shows')}
              />
            )}

            {(activeCategory === 'all' || activeCategory === 'Other') && otherEvents.length > 0 && (
              <CategorySection
                title="Other Events"
                events={otherEvents.map(formatEvent)}
                onEventClick={(id) => setLocation(`/event/${id}`)}
                onViewAll={() => console.log('View all other events')}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
