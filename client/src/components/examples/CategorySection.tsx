import CategorySection from '../CategorySection';
import poster1 from '@assets/generated_images/Sci-fi_movie_poster_neon_3110f571.png';
import poster2 from '@assets/generated_images/Romantic_comedy_couple_poster_25cfdf8a.png';
import poster3 from '@assets/generated_images/Horror_mansion_poster_dark_34bd089b.png';

export default function CategorySectionExample() {
  const events = [
    {
      id: '1',
      imageUrl: poster1,
      title: 'Interstellar Odyssey',
      category: 'Movie',
      venue: 'PVR Phoenix Mall',
      rating: '8.9',
      language: 'English',
      genre: 'Sci-Fi',
      price: 250,
    },
    {
      id: '2',
      imageUrl: poster2,
      title: 'Love in Paris',
      category: 'Movie',
      venue: 'INOX Marina',
      rating: '7.5',
      language: 'English',
      genre: 'Romance',
      price: 200,
    },
    {
      id: '3',
      imageUrl: poster3,
      title: 'The Haunting',
      category: 'Movie',
      venue: 'Cinepolis Andheri',
      rating: '8.2',
      language: 'English',
      genre: 'Horror',
      price: 220,
    },
  ];

  return (
    <div className="p-6">
      <CategorySection 
        title="Recommended Movies" 
        events={events}
        onEventClick={(id) => console.log('Event clicked:', id)}
        onViewAll={() => console.log('View all clicked')}
      />
    </div>
  );
}
