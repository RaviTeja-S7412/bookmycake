import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, FreeMode } from 'swiper/modules';

export default function Carousel() {
    const reviews = [
        {
            name: "Ashok K.",
            date: "1/20/2025",
            rating: 5,
            review: "Good.",
            itemType: "Chocolate Indulgence Pastry / Chocolate Rocher Pastry / Eggless.",
            avatar: "/assets/images/avatars/3.jpg",
            image: "/assets/images/real_madrid.jpg"
        },
        {
            name: "Amarendra Swain",
            date: "1/20/2025",
            rating: 5,
            review: "Good. It is a long established fact that a reader will be distracted...",
            itemType: "Chocolate Indulgence Pastry / Chocolate Rocher Pastry / Eggless.",
            avatar: "/assets/images/avatars/3.jpg",
            image: "/assets/images/real_madrid.jpg"
        },
        {
            name: "Manoj",
            date: "1/20/2025",
            rating: 5,
            review: "Good.",
            itemType: "Chocolate Indulgence Pastry / Chocolate Rocher Pastry / Eggless.",
            avatar: "/assets/images/avatars/3.jpg",
            image: "/assets/images/real_madrid.jpg"
        },
        {
            name: "Melisa Khan",
            date: "1/20/2025",
            rating: 4,
            review: "Good.",
            itemType: "Chocolate Indulgence Pastry / Chocolate Rocher Pastry / Eggless.",
            avatar: "/assets/images/avatars/3.jpg",
            image: "/assets/images/real_madrid.jpg",
        },
       
    ];

    const [slidesPerView, setSlidesPerView] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setSlidesPerView(1); // For extra small screens (mobile)
            } else if (window.innerWidth < 768) {
                setSlidesPerView(2); // For small screens (tablets)
            } else if (window.innerWidth < 1024) {
                setSlidesPerView(3); // For medium screens (larger tablets/small laptops)
            } else {
                setSlidesPerView(4); // For large screens and above
            }
        };

        // Initial call to set the initial number of slides
        handleResize();

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={20}
            freeMode={true}
            pagination={{ clickable: true }}
            modules={[FreeMode, Pagination]}
            className="mySwiper py-10 px-4"
        >
            {reviews.map((review, idx) => (
                <SwiperSlide key={idx}>
                    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between h-full">
                        <div className="flex items-left mb-4">
                            <img src={review.avatar} alt={review.name} className="w-25 h-25 rounded-full mr-3 object-cover" />
                            <div>
                                <p className="font-bold text-gray-800 mb-0 text-sm text-left">{review.name}</p>
                                <p className="text-sm text-left text-gray-500">{review.date}</p>
                            </div>
                        </div>

                        <div className="flex mb-2">
                            {[...Array(review.rating)].map((_, i) => (
                                <span key={i} className="text-yellow-500"><img src="/icons/star_yellow.png" alt="Star" className="w-4 h-4" /></span>
                            ))}
                        </div>

                        <p className="text-gray-700 text-left text-sm mb-2">{review.review}</p>

                        <div className="text-xs text-left text-gray-500 mb-4">
                            <span className="font-semibold">Item type:</span> {review.itemType}
                        </div>

                        <img src={review.image} alt="Cake" className="mt-auto object-cover w-full max-h-40 rounded-md" />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
