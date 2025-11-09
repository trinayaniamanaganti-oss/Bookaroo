import EventCard from '../EventCard';
import poster1 from '@assets/generated_images/Sci-fi_movie_poster_neon_3110f571.png';

export default function EventCardExample() {
  return (
    <div className="p-6 max-w-xs">
      <EventCard
        id="1"
        imageUrl={poster1}
        title="Interstellar Odyssey"
        category="Movie"
        venue="PVR Phoenix Mall"
        date="Fri, 10 Nov"
        rating="8.9"
        language="English"
        genre="Sci-Fi"
        price={250}
        featured={true}
      />
    </div>
  );
}
