import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "./EventCard";

interface Event {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
  venue?: string;
  date?: string;
  rating?: string;
  language?: string;
  genre?: string;
  price?: number;
  featured?: boolean;
}

interface CategorySectionProps {
  title: string;
  events: Event[];
  onEventClick?: (eventId: string) => void;
  onViewAll?: () => void;
}

export default function CategorySection({ title, events, onEventClick, onViewAll }: CategorySectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        <Button 
          variant="ghost" 
          data-testid={`button-view-all-${title.toLowerCase()}`}
          onClick={onViewAll}
          className="text-primary"
        >
          View All
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            {...event}
            onClick={() => onEventClick?.(event.id)}
          />
        ))}
      </div>
    </section>
  );
}
