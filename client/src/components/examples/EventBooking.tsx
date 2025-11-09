import EventBooking from '../EventBooking';

export default function EventBookingExample() {
  return (
    <EventBooking 
      eventName="Coldplay Music of the Spheres Tour"
      onConfirm={(tickets, total) => {
        console.log('Tickets:', tickets);
        console.log('Total:', total);
      }}
    />
  );
}
