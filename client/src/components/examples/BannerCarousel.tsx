import BannerCarousel from '../BannerCarousel';
import banner1 from '@assets/generated_images/Action_movie_banner_explosion_4fe37ee5.png';
import banner2 from '@assets/generated_images/Concert_stadium_stage_lights_df115b14.png';
import banner3 from '@assets/generated_images/Bollywood_dance_scene_banner_21260230.png';
import banner4 from '@assets/generated_images/Cricket_stadium_night_match_7d98a7a3.png';
import banner5 from '@assets/generated_images/Theater_stage_red_curtains_cef4faff.png';

export default function BannerCarouselExample() {
  const banners = [
    { id: '1', imageUrl: banner1, title: 'Mission Impossible: Final Reckoning', category: 'ACTION BLOCKBUSTER' },
    { id: '2', imageUrl: banner2, title: 'Coldplay Music of the Spheres Tour', category: 'LIVE IN CONCERT' },
    { id: '3', imageUrl: banner3, title: 'Pathaan Returns', category: 'BOLLYWOOD SPECTACULAR' },
    { id: '4', imageUrl: banner4, title: 'India vs Australia Final Match', category: 'CRICKET WORLD CUP' },
    { id: '5', imageUrl: banner5, title: 'The Phantom of the Opera', category: 'THEATER' },
  ];

  return <BannerCarousel banners={banners} />;
}
