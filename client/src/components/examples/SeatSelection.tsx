import SeatSelection from '../SeatSelection';

export default function SeatSelectionExample() {
  return (
    <SeatSelection 
      onConfirm={(seats, total) => {
        console.log('Selected seats:', seats);
        console.log('Total price:', total);
      }}
    />
  );
}
