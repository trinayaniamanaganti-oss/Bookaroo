import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface TicketTier {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
}

interface EventBookingProps {
  eventName: string;
  onConfirm?: (tickets: { tier: string; quantity: number }[], total: number) => void;
}

export default function EventBooking({ eventName, onConfirm }: EventBookingProps) {
  const tiers: TicketTier[] = [
    { id: 'vip', name: 'VIP Tickets', price: 5000, description: 'Front row seats with exclusive backstage access', available: 50 },
    { id: 'premium', name: 'Premium Tickets', price: 2500, description: 'Premium seating with great view', available: 200 },
    { id: 'general', name: 'General Admission', price: 999, description: 'Standard entry with general seating', available: 1000 },
  ];

  const [quantities, setQuantities] = useState<Record<string, number>>({
    vip: 0,
    premium: 0,
    general: 0,
  });

  const updateQuantity = (tierId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [tierId]: Math.max(0, Math.min(prev[tierId] + delta, 10)),
    }));
  };

  const totalTickets = Object.values(quantities).reduce((sum, q) => sum + q, 0);
  const totalPrice = tiers.reduce((sum, tier) => sum + tier.price * quantities[tier.id], 0);

  const handleConfirm = () => {
    const tickets = tiers
      .filter((tier) => quantities[tier.id] > 0)
      .map((tier) => ({ tier: tier.name, quantity: quantities[tier.id] }));
    onConfirm?.(tickets, totalPrice);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{eventName}</h1>
      <p className="text-muted-foreground mb-8">Select your tickets</p>

      <div className="space-y-4 mb-8">
        {tiers.map((tier) => (
          <Card key={tier.id} className="p-6" data-testid={`card-tier-${tier.id}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{tier.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {tier.available} left
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{tier.description}</p>
                <p className="text-xl font-bold">₹{tier.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  data-testid={`button-decrease-${tier.id}`}
                  onClick={() => updateQuantity(tier.id, -1)}
                  disabled={quantities[tier.id] === 0}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-semibold" data-testid={`text-quantity-${tier.id}`}>
                  {quantities[tier.id]}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  data-testid={`button-increase-${tier.id}`}
                  onClick={() => updateQuantity(tier.id, 1)}
                  disabled={quantities[tier.id] >= 10}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="sticky bottom-0 bg-background border-t border-border pt-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              {totalTickets} {totalTickets === 1 ? 'ticket' : 'tickets'} selected
            </p>
            <p className="text-2xl font-bold" data-testid="text-total">₹{totalPrice}</p>
          </div>
          <Button
            size="lg"
            data-testid="button-confirm-booking"
            disabled={totalTickets === 0}
            onClick={handleConfirm}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
}
