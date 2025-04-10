import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Navigation, Pagination, Mousewheel, Keyboard, FreeMode } from 'swiper/modules';

export default function Carousel() {
    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={20}
                freeMode={true}
                modules={[FreeMode, Pagination, Autoplay]}
                className="mySwiper"
                // autoplay={{
                //     delay: 2500,
                //     disableOnInteraction: false,
                // }}
                loop={true}
            >
                <SwiperSlide>
                    <div class="group relative bg-[#ffa69e] p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                        <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-[#8b0836] to-[#5D8AA8] opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-4 border-transparent"></div>
                        <div class="relative z-10">
                            <div class="!text-[#8b0836] text-5xl my-1 leading-[0] font-serif">“</div>
                            <p class="!text-[#8b0836] text-lg leading-relaxed mb-4">
                                “Their expertise and attention to detail are unmatched. We’ve seen amazing results after implementing their solutions.”
                            </p>
                            <div className='flex'></div>
                            <div class="flex items-center mt-6">
                                <img src="products/1.jpg" alt="Client 2" class="!w-16 !h-16 rounded-full border-4 border-[#8b0836] shadow-md mr-4" />
                                <div>
                                    <h3 class="text-lg font-bold !text-[#8b0836]">CloudScape</h3>
                                    <p class="text-sm !text-[#8b0836]">United Kingdom</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="group relative bg-[#ffa69e] p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                        <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-[#8b0836] to-[#5D8AA8] opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-4 border-transparent"></div>
                        <div class="relative z-10">
                            <div class="!text-[#8b0836] text-5xl my-1 leading-[0] font-serif">“</div>
                            <p class="!text-[#8b0836] text-lg leading-relaxed mb-4">
                                “Their expertise and attention to detail are unmatched. We’ve seen amazing results after implementing their solutions.”
                            </p>
                            <div className='flex'></div>
                            <div class="flex items-center mt-6">
                                <img src="products/1.jpg" alt="Client 2" class="!w-16 !h-16 rounded-full border-4 border-[#8b0836] shadow-md mr-4" />
                                <div>
                                    <h3 class="text-lg font-bold !text-[#8b0836]">CloudScape</h3>
                                    <p class="text-sm !text-[#8b0836]">United Kingdom</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="group relative bg-[#ffa69e] p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                        <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-[#8b0836] to-[#5D8AA8] opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-4 border-transparent"></div>
                        <div class="relative z-10">
                            <div class="!text-[#8b0836] text-5xl my-1 leading-[0] font-serif">“</div>
                            <p class="!text-[#8b0836] text-lg leading-relaxed mb-4">
                                “Their expertise and attention to detail are unmatched. We’ve seen amazing results after implementing their solutions.”
                            </p>
                            <div className='flex'></div>
                            <div class="flex items-center mt-6">
                                <img src="products/1.jpg" alt="Client 2" class="!w-16 !h-16 rounded-full border-4 border-[#8b0836] shadow-md mr-4" />
                                <div>
                                    <h3 class="text-lg font-bold !text-[#8b0836]">CloudScape</h3>
                                    <p class="text-sm !text-[#8b0836]">United Kingdom</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div class="group relative bg-[#ffa69e] p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                        <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-[#8b0836] to-[#5D8AA8] opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-4 border-transparent"></div>
                        <div class="relative z-10">
                            <div class="!text-[#8b0836] text-5xl my-1 leading-[0] font-serif">“</div>
                            <p class="!text-[#8b0836] text-lg leading-relaxed mb-4">
                                “Their expertise and attention to detail are unmatched. We’ve seen amazing results after implementing their solutions.”
                            </p>
                            <div className='flex'></div>
                            <div class="flex items-center mt-6">
                                <img src="products/1.jpg" alt="Client 2" class="!w-16 !h-16 rounded-full border-4 border-[#8b0836] shadow-md mr-4" />
                                <div>
                                    <h3 class="text-lg font-bold !text-[#8b0836]">CloudScape</h3>
                                    <p class="text-sm !text-[#8b0836]">United Kingdom</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
