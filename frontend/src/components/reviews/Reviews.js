import React, { useEffect, useState } from 'react';
import Slider from "react-slick";

const reviews = [
    {
        name: "Ashok K.",
        date: "1/20/2025",
        rating: 5,
        review: "Good.",
        itemType: "Chocolate Indulgence Pastry",
        avatar: "/assets/images/avatars/3.jpg",
        image: "/assets/images/real_madrid.jpg"
    },
    {
        name: "Amarendra Swain",
        date: "1/20/2025",
        rating: 5,
        review: "Good.",
        itemType: "Chocolate Indulgence Pastry",
        avatar: "/assets/images/avatars/3.jpg",
        image: "/assets/images/real_madrid.jpg"
    },
    {
        name: "Manoj",
        date: "1/20/2025",
        rating: 5,
        review: "Good.",
        itemType: "Chocolate Indulgence Pastry",
        avatar: "/assets/images/avatars/3.jpg",
        image: "/assets/images/real_madrid.jpg"
    },
    {
        name: "Melisa Khan",
        date: "1/20/2025",
        rating: 4,
        review: "Good.",
        itemType: "Chocolate Indulgence Pastry",
        avatar: "/assets/images/avatars/3.jpg",
        image: "/assets/images/real_madrid.jpg",
    },

];

export default function Carousel() {

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <div className="review slider-container mb-[80px]">
                <Slider {...settings}>
                    {reviews.map((review, index) => (
                        <div key={index} className="p-2">
                            <div className="bg-white border border-black font-[poppins] min-h-[400px] max-h-[400px] overflow-hidden">
                                <div className='review_body p-4'>
                                    <div className="flex items-center">
                                        <img src={review.avatar} alt={review.name} className="w-13 h-13 rounded-full mr-4" />
                                        <div>
                                            <p className="!text-md poppins-semibold mb-0 mt-3">{review.name}</p>
                                            <p className="text-gray-500">{review.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path d="M10 15.27L16.18 20l-1.64-7.03L19 8.24l-7.19-.61L10 .25 7.19 7.63 0 8.24l5.46 4.73L3.82 20z" />
                                            </svg>
                                        ))}
                                        {[...Array(5 - review.rating)].map((_, i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path d="M10 15.27L16.18 20l-1.64-7.03L19 8.24l-7.19-.61L10 .25 7.19 7.63 0 8.24l5.46 4.73L3.82 20z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-gray-700">{review.review}</p>
                                    <p className="text-gray-500 mt-1">{review.itemType}</p>
                                </div>
                                <div className='review_img'>
                                    <img src={review.image} alt={review.name} className="w-full max-h-[200px] object-cover" />
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
}
