import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import EventDetail from "@/components/EventDetail";
import MovieTimeSlots from "@/components/MovieTimeSlots";
import type { Event } from "@shared/schema";

export default function MovieDetail() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/event/:id");
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  const { data: event, isLoading } = useQuery<Event>({
    queryKey: ['/api/events', params?.id],
    enabled: !!params?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="text-center py-12 text-muted-foreground">Event not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {!showTimeSlots ? (
        <EventDetail
          imageUrl={event.imageUrl}
          title={event.name}
          category={event.category}
          rating={event.rating || undefined}
          duration={event.duration || undefined}
          genre={event.genre || undefined}
          language={event.language || undefined}
          date={event.date}
          venue={event.venue}
          price={event.price}
          description={event.description}
          onBookNow={() => {
            if (event.category === 'Movie') {
              setShowTimeSlots(true);
            } else {
              setLocation(`/event/${event.id}/book`);
            }
          }}
        />
      ) : (
        <div className="py-8">
          <MovieTimeSlots
            onSelectTime={(theater, time) => {
              setLocation(`/event/${event.id}/seats?theater=${encodeURIComponent(theater)}&time=${encodeURIComponent(time)}`);
            }}
          />
        </div>
      )}
    </div>
  );
}
