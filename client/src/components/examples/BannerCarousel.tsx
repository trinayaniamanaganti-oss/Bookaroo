import BannerCarousel from '../BannerCarousel';

export default function BannerCarouselExample() {
  const banners = [
    { 
      id: '1', 
      imageUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=1920&h=600&q=80', 
      title: 'Mission Impossible: Final Reckoning', 
      category: 'ACTION BLOCKBUSTER' 
    },
    { 
      id: '2', 
      imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1920&h=600&q=80', 
      title: 'Coldplay Music of the Spheres Tour', 
      category: 'LIVE IN CONCERT' 
    },
    { 
      id: '3', 
      imageUrl: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1920&h=600&q=80', 
      title: 'Pathaan Returns', 
      category: 'BOLLYWOOD SPECTACULAR' 
    },
    { 
      id: '4', 
      imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1920&h=600&q=80', 
      title: 'India vs Australia Final Match', 
      category: 'CRICKET WORLD CUP' 
    },
    { 
      id: '5', 
      imageUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1920&h=600&q=80', 
      title: 'The Phantom of the Opera', 
      category: 'THEATER' 
    },
  ];

  return <BannerCarousel banners={banners} />;
}
