import EventDetail from '../EventDetail';
import poster from '@assets/generated_images/Sci-fi_movie_poster_neon_3110f571.png';

export default function EventDetailExample() {
  return (
    <div className="min-h-screen bg-background">
      <EventDetail
        imageUrl={poster}
        title="Interstellar Odyssey"
        category="Movie"
        rating="8.9"
        duration="2h 45m"
        genre="Sci-Fi/Thriller"
        language="English"
        date="Fri, 10 Nov - Sun, 12 Nov"
        venue="Multiple Cinemas"
        price={250}
        description="A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. As time runs out, they must journey beyond the stars to discover the mysteries of the universe and save their loved ones back on Earth."
        onBookNow={() => console.log('Book now clicked')}
      />
    </div>
  );
}
