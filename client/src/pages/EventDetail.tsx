import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import EventDetail from "@/components/EventDetail";
import EventBooking from "@/components/EventBooking";
import poster from '@assets/generated_images/Rock_concert_guitar_lightning_095ca897.png';

export default function EventDetailPage() {
  const [, setLocation] = useLocation();
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {!showBooking ? (
        <EventDetail
          imageUrl={poster}
          title="Rock Nation Tour 2024"
          category="Concert"
          rating="9.2"
          genre="Rock/Metal"
          date="Sat, 15 Nov 2024"
          venue="DY Patil Stadium, Mumbai"
          price={999}
          description="Experience the ultimate rock concert of the year! The biggest names in rock come together for an unforgettable night of music. With stunning stage production, explosive performances, and an electric atmosphere, this is a show you don't want to miss. Limited tickets available!"
          onBookNow={() => setShowBooking(true)}
        />
      ) : (
        <div className="py-8">
          <EventBooking
            eventName="Rock Nation Tour 2024"
            onConfirm={(tickets, total) => {
              const quantity = tickets.reduce((sum, t) => sum + t.quantity, 0);
              setLocation(`/confirmation?event=Rock Nation Tour 2024&date=Saturday, 15 Nov, 8:00 PM&venue=DY Patil Stadium, Mumbai&quantity=${quantity}&total=${total}`);
            }}
          />
        </div>
      )}
    </div>
  );
}
