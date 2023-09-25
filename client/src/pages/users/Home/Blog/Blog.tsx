import Title from '../Title/Title';
import ItemBlog from './ItemBlog';
import { Autoplay, Navigation } from 'swiper/modules';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const Blog = () => {
  const swiperRef = useRef<SwiperType>();

  return (
    <div className="flex flex-col gap-10">
      <Title
        title="Blog & Events"
        rightElm
        path="/blog"
        nameRight="View all Events"
      />

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50
          }
        }}
        modules={[Autoplay, Navigation]}
        className="w-full"
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <SwiperSlide key={item}>
            <ItemBlog
              path="blog"
              title="Music magnate headphones"
              time="January 21, 2023"
              image="https://drou-electronics-store.myshopify.com/cdn/shop/articles/04_684500ea-e527-4171-8e1a-07c34d71c243_grande.jpg?v=1674279180"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="relative w-full z-40 ">
        <div className="absolute bottom-[120px] px-1 py-28  flex justify-between w-full group">
          <button
            className="btnSlide"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <AiOutlineLeft />
          </button>

          <button
            className="btnSlide"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <AiOutlineRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
