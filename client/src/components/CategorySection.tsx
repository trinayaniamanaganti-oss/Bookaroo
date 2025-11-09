import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "./EventCard";
import { useRef } from "react";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

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

      <div className="relative group">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 gap-4 scroll-smooth scrollbar-hide relative"
        >
          {events.map((event) => (
            <div key={event.id} className="flex-none w-[160px] sm:w-[200px] md:w-[240px]">
              <EventCard
                {...event}
                onClick={() => onEventClick?.(event.id)}
              />
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-background border border-border rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
          style={{ transform: 'translate(-1rem, -50%)' }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-background border border-border rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
          style={{ transform: 'translate(1rem, -50%)' }}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}

// Add custom scrollbar hiding styles
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);
