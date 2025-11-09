import { useLocation } from "wouter";
import Header from "@/components/Header";
import SeatSelection from "@/components/SeatSelection";

export default function MovieBooking() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="py-8">
        <div className="max-w-5xl mx-auto px-4 mb-6">
          <h1 className="text-2xl font-bold mb-2">Interstellar Odyssey</h1>
          <p className="text-muted-foreground">PVR Phoenix Mall, Screen 3 | Friday, 10 Nov, 7:00 PM</p>
        </div>
        
        <SeatSelection
          onConfirm={(seats, total) => {
            const seatIds = seats.map(s => s.id).join(',');
            setLocation(`/confirmation?event=Interstellar Odyssey&date=Friday, 10 Nov, 7:00 PM&venue=PVR Phoenix Mall, Screen 3&seats=${seatIds}&total=${total}`);
          }}
        />
      </div>
    </div>
  );
}
