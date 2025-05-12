// components/DesignerCollections.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Slider from "react-slick";

const cakes = [
  { title: "Elsa Frozen Cake", image: "/assets/images/wallpaperflare.com_wallpaper.jpg" },
  { title: "Real Madrid Cake", image: "/assets/images/real_madrid.jpg" },
  { title: "Avengers Cake", image: "/assets/images/avengers.jpg" },
];

export default function DesignerCollections() {
  return (
    <section className='bg-[url(/assets/images/designer-bg.jpg)] bg-cover bg-no-repeat bg-center'>
      <div className="default-width py-10">
      <h4 className="!text-4xl poppins-semibold text-gray-800 mb-4 text-white">Designer Collections</h4>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination]}
        className="pb-10"
      >
        {cakes.map((cake, index) => (
          <SwiperSlide key={index} className="bg-transparent">
            <div className="flex flex-col items-center bg-transparent">
              <div className="w-full h-52 sm:h-60 md:h-64 overflow-hidden rounded-md shadow-md">
                <img
                  src={cake.image}
                  alt={cake.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="mt-[-18px] z-10 w-[80%] bg-[#1f1f1f] text-[#ffb14f] text-center py-2 font-medium shadow-md rounded-sm text-sm md:text-base">
                {cake.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .swiper {
          background: transparent !important;
        }
        .swiper-pagination {
          bottom: 0px !important;
          text-align: center;
        }
        .swiper-pagination-bullet {
          background: white;
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .swiper-pagination-bullet-active {
          background: #000;
        }
      `}</style>
      </div>
    </section>
  );
}
