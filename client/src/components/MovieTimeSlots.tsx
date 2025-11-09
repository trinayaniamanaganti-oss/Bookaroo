import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { useState } from "react";

interface TimeSlot {
  time: string;
  available: boolean;
  filling: boolean;
}

interface Theater {
  id: string;
  name: string;
  timeSlots: TimeSlot[];
  seatingType: string;
}

interface MovieTimeSlotsProps {
  onSelectTime?: (theater: string, time: string) => void;
}

export default function MovieTimeSlots({ onSelectTime }: MovieTimeSlotsProps) {
  const dates = [
    { day: 'FRI', date: '10', month: 'NOV' },
    { day: 'SAT', date: '11', month: 'NOV' },
    { day: 'SUN', date: '12', month: 'NOV' },
    { day: 'MON', date: '13', month: 'NOV' },
    { day: 'TUE', date: '14', month: 'NOV' },
  ];

  const [selectedDate, setSelectedDate] = useState(0);

  const theaters: Theater[] = [
    {
      id: '1',
      name: 'PVR Phoenix Marketcity',
      timeSlots: [
        { time: '10:00 AM', available: true, filling: false },
        { time: '1:15 PM', available: true, filling: true },
        { time: '4:30 PM', available: true, filling: false },
        { time: '7:45 PM', available: true, filling: true },
        { time: '10:30 PM', available: false, filling: false },
      ],
      seatingType: 'Dolby Atmos',
    },
    {
      id: '2',
      name: 'INOX Mega Mall',
      timeSlots: [
        { time: '11:30 AM', available: true, filling: false },
        { time: '2:45 PM', available: true, filling: false },
        { time: '6:00 PM', available: true, filling: true },
        { time: '9:15 PM', available: true, filling: false },
      ],
      seatingType: 'IMAX',
    },
    {
      id: '3',
      name: 'Cinepolis Andheri',
      timeSlots: [
        { time: '12:00 PM', available: true, filling: false },
        { time: '3:20 PM', available: true, filling: false },
        { time: '6:40 PM', available: true, filling: true },
        { time: '10:00 PM', available: true, filling: false },
      ],
      seatingType: '4DX',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Select Date</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dates.map((date, index) => (
            <Button
              key={index}
              variant={selectedDate === index ? "default" : "outline"}
              data-testid={`button-date-${index}`}
              onClick={() => setSelectedDate(index)}
              className="flex-shrink-0 min-w-[80px] flex flex-col h-auto py-3"
            >
              <Calendar className="w-4 h-4 mb-1" />
              <span className="text-xs">{date.day}</span>
              <span className="text-lg font-bold">{date.date}</span>
              <span className="text-xs">{date.month}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {theaters.map((theater) => (
          <Card key={theater.id} className="p-4" data-testid={`card-theater-${theater.id}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{theater.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {theater.seatingType}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                {theater.timeSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant={slot.available ? "outline" : "secondary"}
                    size="sm"
                    data-testid={`button-time-${theater.id}-${index}`}
                    disabled={!slot.available}
                    onClick={() => onSelectTime?.(theater.name, slot.time)}
                    className="min-w-[100px] relative"
                  >
                    {slot.time}
                    {slot.filling && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full" />
          <span>Filling Fast</span>
        </div>
      </div>
    </div>
  );
}
