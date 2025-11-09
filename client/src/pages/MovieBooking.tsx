import { useLocation, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import SeatSelection from "@/components/SeatSelection";
import type { Event } from "@shared/schema";

export default function MovieBooking() {
  const [location, setLocation] = useLocation();
  const [, params] = useRoute("/event/:id/seats");

  const searchParams = new URLSearchParams(location.split('?')[1]);
  const theater = searchParams.get('theater') || 'Theater';
  const time = searchParams.get('time') || 'Time';

  const { data: event } = useQuery<Event>({
    queryKey: ['/api/events', params?.id],
    enabled: !!params?.id,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="py-8">
        <div className="max-w-5xl mx-auto px-4 mb-6">
          <h1 className="text-2xl font-bold mb-2">{event?.name || 'Movie'}</h1>
          <p className="text-muted-foreground">{theater} | {time}</p>
        </div>
        
        <SeatSelection
          onConfirm={(seats, total) => {
            const seatIds = seats.map(s => s.id).join(',');
            setLocation(`/confirmation?eventId=${params?.id}&event=${encodeURIComponent(event?.name || 'Event')}&date=${encodeURIComponent(time)}&venue=${encodeURIComponent(theater)}&seats=${seatIds}&total=${total}`);
          }}
        />
      </div>
    </div>
  );
}
