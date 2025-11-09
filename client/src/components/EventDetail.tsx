import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Clock, Star, Share2, Heart } from "lucide-react";

interface EventDetailProps {
  imageUrl: string;
  title: string;
  category: string;
  rating?: string;
  duration?: string;
  genre?: string;
  language?: string;
  date: string;
  venue: string;
  price: number;
  description: string;
  onBookNow?: () => void;
}

export default function EventDetail({
  imageUrl,
  title,
  category,
  rating,
  duration,
  genre,
  language,
  date,
  venue,
  price,
  description,
  onBookNow,
}: EventDetailProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="px-6 -mt-32 relative z-10">
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          <div className="hidden md:block">
            <img
              src={imageUrl}
              alt={title}
              className="w-full rounded-lg shadow-xl border-4 border-background"
            />
          </div>

          <div className="pt-16 md:pt-0">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-title">{title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{category}</Badge>
                  {genre && <Badge variant="secondary">{genre}</Badge>}
                  {language && <Badge variant="secondary">{language}</Badge>}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="icon" data-testid="button-share">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" data-testid="button-favorite">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              {rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{rating}/10</span>
                </div>
              )}
              {duration && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{duration}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{venue}</span>
              </div>
            </div>

            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-3">About the {category}</h2>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </Card>

            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                <p className="text-2xl font-bold">₹{price}</p>
              </div>
              <Button 
                size="lg" 
                data-testid="button-book-now"
                onClick={onBookNow}
                className="flex-1 md:flex-initial"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
