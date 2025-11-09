import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'available' | 'selected' | 'booked';
  price: number;
}

interface SeatSelectionProps {
  onConfirm?: (seats: Seat[], total: number) => void;
}

export default function SeatSelection({ onConfirm }: SeatSelectionProps) {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = 12;

  const [seats, setSeats] = useState<Seat[]>(() => {
    const initialSeats: Seat[] = [];
    rows.forEach((row) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const isBooked = Math.random() > 0.7;
        initialSeats.push({
          id: `${row}${i}`,
          row,
          number: i,
          type: isBooked ? 'booked' : 'available',
          price: ['A', 'B', 'C'].includes(row) ? 350 : 250,
        });
      }
    });
    return initialSeats;
  });

  const toggleSeat = (seatId: string) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === seatId && seat.type !== 'booked'
          ? { ...seat, type: seat.type === 'selected' ? 'available' : 'selected' }
          : seat
      )
    );
  };

  const selectedSeats = seats.filter((s) => s.type === 'selected');
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  
  // Debug log
  console.log('Selected seats:', selectedSeats);
  console.log('Calculated total price:', totalPrice);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <div className="w-full md:w-3/4 mx-auto mb-8">
          <div className="bg-muted border-2 border-muted-foreground/20 rounded-t-3xl h-2 mb-2" />
          <p className="text-center text-sm text-muted-foreground">Screen this way</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-card border-2 border-card-border rounded" />
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded" />
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-muted-foreground/40 rounded cursor-not-allowed" />
            <span className="text-sm">Booked</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="inline-block min-w-full">
          {rows.map((row) => (
            <div key={row} className="flex items-center justify-center gap-2 mb-2">
              <span className="w-8 text-sm font-medium text-muted-foreground">{row}</span>
              <div className="flex gap-2">
                {seats
                  .filter((s) => s.row === row)
                  .map((seat) => (
                    <button
                      key={seat.id}
                      data-testid={`button-seat-${seat.id}`}
                      onClick={() => toggleSeat(seat.id)}
                      disabled={seat.type === 'booked'}
                      className={`w-7 h-7 md:w-8 md:h-8 rounded text-xs font-medium transition-all ${
                        seat.type === 'available'
                          ? 'bg-card border-2 border-card-border hover-elevate active-elevate-2'
                          : seat.type === 'selected'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted-foreground/40 cursor-not-allowed'
                      }`}
                    >
                      {seat.number}
                    </button>
                  ))}
              </div>
              <span className="w-8 text-sm font-medium text-muted-foreground">{row}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 bg-background border-t border-border mt-8 pt-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              {selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'} selected
            </p>
            {selectedSeats.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedSeats.map((seat) => (
                  <Badge key={seat.id} variant="secondary">
                    {seat.id}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold" data-testid="text-total-price">₹{totalPrice}</p>
            </div>
            <Button
              data-testid="button-proceed-payment"
              size="lg"
              disabled={selectedSeats.length === 0}
              onClick={() => {
                console.log('Proceeding with total price:', totalPrice);
                onConfirm?.(selectedSeats, totalPrice);
              }}
            >
              Proceed to Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
