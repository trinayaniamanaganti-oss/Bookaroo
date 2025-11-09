import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";

interface EventCardProps {
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
  onClick?: () => void;
}

export default function EventCard({
  imageUrl,
  title,
  category,
  venue,
  date,
  rating,
  language,
  genre,
  price,
  featured,
  onClick,
}: EventCardProps) {
  return (
    <div
      data-testid={`card-event-${title.toLowerCase().replace(/\s+/g, '-')}`}
      className="group cursor-pointer hover-elevate active-elevate-2 bg-card border border-card-border rounded-lg overflow-hidden transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        {featured && (
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        {rating && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
            <div className="flex items-center gap-1 text-primary-foreground">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{rating}/10</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-lg line-clamp-1 mb-1" data-testid={`text-event-title`}>
          {title}
        </h3>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {genre && (
            <Badge variant="secondary" className="text-xs">
              {genre}
            </Badge>
          )}
          {language && (
            <Badge variant="secondary" className="text-xs">
              {language}
            </Badge>
          )}
        </div>

        {venue && (
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
            <MapPin className="w-3 h-3" />
            <span className="line-clamp-1">{venue}</span>
          </div>
        )}

        {date && (
          <p className="text-sm text-muted-foreground mb-2">{date}</p>
        )}

        {price && (
          <p className="text-sm font-semibold text-foreground">
            From ₹{price}
          </p>
        )}
      </div>
    </div>
  );
}
