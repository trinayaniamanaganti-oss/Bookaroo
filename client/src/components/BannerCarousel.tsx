import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
}

interface BannerCarouselProps {
  banners: Banner[];
  autoScrollInterval?: number;
}

export default function BannerCarousel({ banners, autoScrollInterval = 5000 }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [banners.length, autoScrollInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 bg-muted overflow-hidden group">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full h-full relative">
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <div className="max-w-7xl mx-auto">
                <p className="text-sm font-medium text-primary-foreground/90 mb-2">{banner.category}</p>
                <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">{banner.title}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        data-testid="button-carousel-prev"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur-sm hover:bg-background/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={goToPrevious}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        data-testid="button-carousel-next"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur-sm hover:bg-background/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={goToNext}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            data-testid={`button-carousel-dot-${index}`}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-primary-foreground w-6" 
                : "bg-primary-foreground/40"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
