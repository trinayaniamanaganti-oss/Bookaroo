import BookingConfirmation from '../BookingConfirmation';

export default function BookingConfirmationExample() {
  return (
    <BookingConfirmation
      bookingCode="BMS-2024-ABC123"
      eventName="Interstellar Odyssey"
      eventDate="Friday, 10 Nov 2024, 7:00 PM"
      venue="PVR Phoenix Mall, Screen 3"
      seats="A5, A6, A7"
      totalPrice={750}
    />
  );
}
