import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Products from '../../Data/Products';
import Banners from '../../Data/banners';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Autoplay, Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

export default function Carousel({ data }) {
  console.log('data: ', data);
  return (
    <>
      <Swiper
        cssMode={true}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={false}
        pagination={false}
        mousewheel={true}
        keyboard={true}
        modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
        className=""
      >
        {
          data?.map(image => (
            <SwiperSlide className='relative'>
              <img src={import.meta.env.VITE_APIBASE_URL + image?.image} alt={image.name} className='w-full' />
              {/* Black overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <span className='absolute bottom-0 left-0 right-0 font-bold text-gray-100 lg:text-[50px] z-10'>{image?.banner_title}</span>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
}
