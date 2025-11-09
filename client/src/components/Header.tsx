import { Search, MapPin, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { seededEvents } from "@/lib/seed";
import { cn } from "@/lib/utils";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [, setLocation] = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(seededEvents);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      setLocation(`/?search=${encodeURIComponent(trimmedValue)}`);
      setSearchOpen(false);
      setSearchValue("");
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    if (value.trim()) {
      const filtered = seededEvents.filter(event => 
        event.name.toLowerCase().includes(value.toLowerCase()) ||
        event.category.toLowerCase().includes(value.toLowerCase()) ||
        event.genre?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEvents(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleEventSelect = (eventId: string) => {
    setLocation(`/event/${eventId}`);
    setSearchValue("");
    setShowDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-primary cursor-pointer" onClick={() => setLocation("/")}>Bookaroo</h1>
            
            {/* Desktop Search Bar - Always visible on md and up */}
            <div className="hidden md:flex items-center gap-2 bg-card border border-card-border rounded-md px-3 py-2 min-w-[300px] relative" ref={dropdownRef}>
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                data-testid="input-search"
                placeholder="Search for Movies, Events, Plays, Sports"
                className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                value={searchValue}
                onChange={handleInputChange}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e.currentTarget.value);
                  }
                }}
              />
              {showDropdown && filteredEvents.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-[400px] overflow-y-auto z-50">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 hover:bg-accent cursor-pointer flex items-center gap-3 border-b border-border last:border-0"
                      onClick={() => handleEventSelect(event.id)}
                    >
                      <img 
                        src={event.imageUrl} 
                        alt={event.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">{event.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {event.category} • {event.genre}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              data-testid="button-location"
              className="hidden md:flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
                <span>Hyderabad</span>
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              data-testid="button-search-mobile"
              className="md:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              data-testid="button-signin"
              className="hidden sm:flex"
              aria-label="User profile"
            >
              <User className="w-4 h-4 text-primary" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              data-testid="button-menu"
              className="sm:hidden"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="pb-4 md:hidden">
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-2 bg-card border border-card-border rounded-md px-3 py-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  data-testid="input-search-mobile"
                  placeholder="Search for Movies, Events, Plays, Sports"
                  className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                  autoFocus
                  value={searchValue}
                  onChange={handleInputChange}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(e.currentTarget.value);
                    }
                  }}
                />
              </div>
              {showDropdown && filteredEvents.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-[400px] overflow-y-auto z-50">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 hover:bg-accent cursor-pointer flex items-center gap-3 border-b border-border last:border-0"
                      onClick={() => handleEventSelect(event.id)}
                    >
                      <img 
                        src={event.imageUrl} 
                        alt={event.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">{event.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {event.category} • {event.genre}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}