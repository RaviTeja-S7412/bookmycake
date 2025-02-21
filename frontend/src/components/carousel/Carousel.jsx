import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Products from '../../Data/Products';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Autoplay,Navigation,Pagination,Mousewheel, Keyboard  } from 'swiper/modules';

export default function Carousel() {
  return (
    <>
      <Swiper
        cssMode={true}
        spaceBetween={30}
        autoplay={{
            delay:3000,
            
        }}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Autoplay,Navigation, Pagination, Mousewheel, Keyboard]}
        className=""
      >
        {
            Products.map(image=>(
                <SwiperSlide className='relative' ><img src={image.imageSrc} alt={image.name} className='w-full h-auto max-h-64 rounded border-1 border-[#b9b3cc]'/> <span className='absolute top-3 left-3 font-bold text-gray-100'>{image.name}</span></SwiperSlide>
            ))
        }
      </Swiper>
    </>
  );
}
