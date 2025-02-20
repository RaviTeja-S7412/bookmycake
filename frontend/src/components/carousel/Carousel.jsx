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
import { Navigation,Pagination,Mousewheel, Keyboard  } from 'swiper/modules';

export default function Carousel() {
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className=""
      >
        {
            Products.map(image=>(
                <SwiperSlide className='relative' ><img src={image.imageSrc} alt={image.name} className='w-full h-auto max-h-64'/> <span className='absolute top-3 left-3 font-bold text-gray-100'>{image.name}</span></SwiperSlide>
            ))
        }
      </Swiper>
    </>
  );
}
