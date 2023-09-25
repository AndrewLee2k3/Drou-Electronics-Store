import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ItemBanner from './ItemBanner';
import images from '@/assets';

const Banner = () => {
  return (
    <Swiper
      slidesPerView={1}
      effect={'fade'}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      pagination={{
        bulletActiveClass:
          'bg-primary w-8 opacity-100 h-2 rounded-md hover:bg-black duration-300',
        clickable: true
      }}
      modules={[EffectFade, Pagination, Autoplay]}
      className="w-full h-[600px] mb-20"
    >
      <SwiperSlide>
        <ItemBanner
          label="SALE UP TO 30% OFF"
          title="Apple Watch Series"
          sub="Feature packed at a better value than ever Powerful sensors to monitor your fitness"
          banner={images.banner.watchBn}
        />
      </SwiperSlide>

      <SwiperSlide>
        <ItemBanner
          label="New arrivals collection"
          title="iPhone Accessories"
          sub="Snap on a case, wallet, wireless charger battery pack all accessories you're looking"
          banner={images.banner.phoneBn}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
