import { useLocation, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import EventBooking from "@/components/EventBooking";
import type { Event } from "@shared/schema";

export default function EventBookingPage() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/event/:id/book");

  const { data: event } = useQuery<Event>({
    queryKey: ['/api/events', params?.id],
    enabled: !!params?.id,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="py-8">
        <EventBooking
          eventName={event?.name || 'Event'}
          onConfirm={(tickets, total) => {
            const quantity = tickets.reduce((sum, t) => sum + t.quantity, 0);
            setLocation(`/confirmation?eventId=${params?.id}&event=${encodeURIComponent(event?.name || 'Event')}&date=${encodeURIComponent(event?.date || '')}&venue=${encodeURIComponent(event?.venue || '')}&quantity=${quantity}&total=${total}`);
          }}
        />
      </div>
    </div>
  );
}
