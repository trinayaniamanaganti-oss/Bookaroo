import MovieTimeSlots from '../MovieTimeSlots';

export default function MovieTimeSlotsExample() {
  return (
    <MovieTimeSlots 
      onSelectTime={(theater, time) => {
        console.log('Selected:', theater, time);
      }}
    />
  );
}
