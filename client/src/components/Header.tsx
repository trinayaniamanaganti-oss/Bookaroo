import { Search, MapPin, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-primary">BookMyShow</h1>
            
            {!searchOpen && (
              <div className="hidden md:flex items-center gap-2 bg-card border border-card-border rounded-md px-3 py-2 min-w-[300px]">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  data-testid="input-search"
                  placeholder="Search for Movies, Events, Plays, Sports"
                  className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                  onClick={() => setSearchOpen(true)}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              data-testid="button-location"
              className="hidden md:flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Mumbai</span>
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
              variant="default"
              size="sm"
              data-testid="button-signin"
              className="hidden sm:flex"
            >
              Sign In
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

        {searchOpen && (
          <div className="pb-4 md:hidden">
            <div className="flex items-center gap-2 bg-card border border-card-border rounded-md px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                data-testid="input-search-mobile"
                placeholder="Search for Movies, Events, Plays, Sports"
                className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
