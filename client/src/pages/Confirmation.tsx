import { useLocation } from "wouter";
import Header from "@/components/Header";
import BookingConfirmation from "@/components/BookingConfirmation";
import { Button } from "@/components/ui/button";

export default function Confirmation() {
  const [location, setLocation] = useLocation();
  
  const params = new URLSearchParams(location.split('?')[1]);
  const eventName = params.get('event') || 'Event';
  const eventDate = params.get('date') || '';
  const venue = params.get('venue') || '';
  const seats = params.get('seats') || undefined;
  const quantity = params.get('quantity') ? parseInt(params.get('quantity')!) : undefined;
  const totalPrice = parseInt(params.get('total') || '0');

  const bookingCode = `BMS-2024-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

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
