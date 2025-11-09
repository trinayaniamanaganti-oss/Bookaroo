import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Mail, Calendar } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface BookingConfirmationProps {
  bookingCode: string;
  eventName: string;
  eventDate: string;
  venue: string;
  seats?: string;
  quantity?: number;
  totalPrice: number;
}

export default function BookingConfirmation({
  bookingCode,
  eventName,
  eventDate,
  venue,
  seats,
  quantity,
  totalPrice,
}: BookingConfirmationProps) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
          <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground">Your tickets have been successfully booked</p>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4" data-testid="text-event-name">{eventName}</h2>
            
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Date & Time</p>
                <p className="font-medium" data-testid="text-event-date">{eventDate}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Venue</p>
                <p className="font-medium" data-testid="text-venue">{venue}</p>
              </div>

              {seats && (
                <div>
                  <p className="text-muted-foreground">Seats</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {seats.split(',').map((seat, i) => (
                      <Badge key={i} variant="secondary">{seat.trim()}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {quantity && (
                <div>
                  <p className="text-muted-foreground">Tickets</p>
                  <p className="font-medium" data-testid="text-quantity">{quantity} {quantity === 1 ? 'ticket' : 'tickets'}</p>
                </div>
              )}

              <div>
                <p className="text-muted-foreground">Total Amount Paid</p>
                <p className="text-2xl font-bold text-primary" data-testid="text-total">₹{totalPrice}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Booking ID</p>
                <p className="font-mono font-medium" data-testid="text-booking-code">{bookingCode}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <QRCodeSVG 
                value={`BOOKING:${bookingCode}`} 
                size={180}
                data-testid="qr-code"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Show this QR code at the venue
            </p>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="outline" data-testid="button-download">
          <Download className="w-4 h-4 mr-2" />
          Download Ticket
        </Button>
        <Button variant="outline" data-testid="button-email">
          <Mail className="w-4 h-4 mr-2" />
          Email Ticket
        </Button>
        <Button variant="outline" data-testid="button-calendar">
          <Calendar className="w-4 h-4 mr-2" />
          Add to Calendar
        </Button>
      </div>
    </div>
  );
}
