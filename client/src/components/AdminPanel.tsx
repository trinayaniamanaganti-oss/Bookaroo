import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function AdminPanel() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    imageUrl: '',
    bannerUrl: '',
    description: '',
    venue: '',
    date: '',
    price: '',
    language: '',
    rating: '',
    duration: '',
    genre: '',
  });

  const createEventMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text();
        let message = text || response.statusText || 'Failed to create event';
        try {
          const parsed = JSON.parse(text);
          if (parsed?.error) {
            message = typeof parsed.error === 'string' ? parsed.error : JSON.stringify(parsed.error);
          }
        } catch (_) {
          // ignore JSON parse errors
        }
        throw new Error(message);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: "Success!",
        description: "Event created successfully",
      });
      setLocation('/');
    },
    onError: (err: any) => {
      const message = err?.message || 'Failed to create event. Please check all fields.';
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  });

  // Fetch existing events so admin can remove them
  const { data: events = [] as any[], isLoading: eventsLoading } = useQuery<any[]>({
    queryKey: ['/api/events'],
  });

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const text = await res.text();
        let message = text || res.statusText || 'Failed to delete event';
        try {
          const parsed = JSON.parse(text);
          if (parsed?.error) {
            message = typeof parsed.error === 'string' ? parsed.error : JSON.stringify(parsed.error);
          }
        } catch (_) {}
        throw new Error(message);
      }
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({ title: 'Deleted', description: 'Event removed successfully' });
      setSelectedEventId(null);
    },
    onError: (err: any) => {
      const message = err?.message || 'Failed to delete event';
      toast({ title: 'Error', description: message, variant: 'destructive' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      name: formData.name,
      category: formData.category,
      imageUrl: formData.imageUrl,
      bannerUrl: formData.bannerUrl || undefined,
      description: formData.description,
      venue: formData.venue,
      date: formData.date,
      // Ensure price is a valid integer before sending
      price: Number(formData.price),
      language: formData.language || undefined,
      rating: formData.rating || undefined,
      duration: formData.duration || undefined,
      genre: formData.genre || undefined,
      featured: 0,
    };

    // Basic client-side validation: price must be a number
    if (Number.isNaN(eventData.price)) {
      toast({
        title: 'Invalid price',
        description: 'Please enter a valid starting price (number).',
        variant: 'destructive',
      });
      return;
    }

    createEventMutation.mutate(eventData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Add New Event</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Event Name *</Label>
              <Input
                id="name"
                data-testid="input-event-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter event name"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger data-testid="select-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Movie">Movie</SelectItem>
                  <SelectItem value="Concert">Concert</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Theater">Theater</SelectItem>
                  <SelectItem value="Comedy">Comedy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="imageUrl">Poster Image URL *</Label>
              <Input
                id="imageUrl"
                data-testid="input-image-url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/poster.jpg"
                required
              />
            </div>

            <div>
              <Label htmlFor="bannerUrl">Banner Image URL</Label>
              <Input
                id="bannerUrl"
                data-testid="input-banner-url"
                value={formData.bannerUrl}
                onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                placeholder="https://example.com/banner.jpg"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                data-testid="input-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Event description..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="venue">Venue *</Label>
              <Input
                id="venue"
                data-testid="input-venue"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                placeholder="Enter venue name"
                required
              />
            </div>

            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                data-testid="input-date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Starting Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                data-testid="input-price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="999"
                required
              />
            </div>

            <div>
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                data-testid="input-language"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                placeholder="English, Hindi, etc."
              />
            </div>

            <div>
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                data-testid="input-genre"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                placeholder="Action, Drama, etc."
              />
            </div>

            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                data-testid="input-rating"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                placeholder="8.5"
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                data-testid="input-duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="2h 30m"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              data-testid="button-create-event"
              disabled={createEventMutation.isPending}
            >
              {createEventMutation.isPending ? 'Creating...' : 'Create Event'}
            </Button>
          </form>
        </Card>

        <div>
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          {formData.imageUrl && (
            <Card className="overflow-hidden">
              <div className="aspect-[2/3] relative">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x600?text=Invalid+Image+URL';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">
                  {formData.name || 'Event Name'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formData.venue || 'Venue'}
                </p>
                {formData.price && (
                  <p className="text-sm font-semibold mt-2">From ₹{formData.price}</p>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Delete control at the bottom - select an existing event and remove it */}
      <div className="max-w-4xl mx-auto p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Remove Event</h2>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <select
              className="flex-1 px-3 py-2 border rounded"
              value={selectedEventId ?? ''}
              onChange={(e) => setSelectedEventId(e.target.value || null)}
              disabled={eventsLoading}
              data-testid="select-remove-event"
            >
              <option value="">-- Select event to remove --</option>
              {events.map((ev: any) => (
                <option key={ev.id} value={ev.id}>{ev.name}</option>
              ))}
            </select>

            <Button
              variant="destructive"
              onClick={() => {
                if (!selectedEventId) {
                  toast({ title: 'No event selected', description: 'Please choose an event to delete', variant: 'destructive' });
                  return;
                }

                // basic confirmation
                // eslint-disable-next-line no-restricted-globals
                if (!confirm('Are you sure you want to permanently delete this event?')) return;

                deleteEventMutation.mutate(selectedEventId);
              }}
              disabled={!selectedEventId || deleteEventMutation.isPending}
              data-testid="button-delete-event"
            >
              {deleteEventMutation.isPending ? 'Deleting...' : 'Delete Event'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
