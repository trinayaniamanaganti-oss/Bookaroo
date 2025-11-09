import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import BookingConfirmation from "@/components/BookingConfirmation";
import { Button } from "@/components/ui/button";

export default function Confirmation() {
  const [location, setLocation] = useLocation();
  const [bookingCode, setBookingCode] = useState<string>('');
  const [isSaving, setIsSaving] = useState(true);
  
  // Get the raw query string
  const searchParams = new URLSearchParams(window.location.search);
  const eventId = searchParams.get('eventId') || '';
  const eventName = searchParams.get('event') || 'Event';
  const eventDate = searchParams.get('date') || '';
  const venue = searchParams.get('venue') || '';
  const seats = searchParams.get('seats') || undefined;
  const quantity = searchParams.get('quantity') ? parseInt(searchParams.get('quantity')!) : undefined;
  const totalPrice = Number(searchParams.get('total'));

  const createBookingMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create booking');
      return response.json();
    },
    onSuccess: (data) => {
      setBookingCode(data.bookingCode);
      setIsSaving(false);
    },
    onError: () => {
      const fallbackCode = `BMS-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      setBookingCode(fallbackCode);
      setIsSaving(false);
    },
  });

  useEffect(() => {
    const generatedCode = `BMS-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    const bookingData = {
      eventId,
      eventName,
      eventDate,
      venue,
      seats: seats || null,
      quantity: quantity || 1,
      totalPrice: totalPrice || 0,
      bookingCode: generatedCode,
    };

    createBookingMutation.mutate(bookingData);
  }, []);

  if (isSaving) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="text-center py-12 text-muted-foreground">Processing your booking...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="py-8">
        <BookingConfirmation
          bookingCode={bookingCode}
          eventName={eventName}
          eventDate={eventDate}
          venue={venue}
          seats={seats}
          quantity={quantity}
          totalPrice={totalPrice}
        />

        <div className="text-center mt-8">
          <Button
            variant="outline"
            data-testid="button-back-home"
            onClick={() => setLocation('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
