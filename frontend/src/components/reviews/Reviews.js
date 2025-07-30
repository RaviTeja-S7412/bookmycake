import React, { useEffect, useState } from 'react';
import Slider from "react-slick";

export default function Reviews({ data }) {

    const settings = {
        dots: false,
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
                    {data.map((review, index) => {
                        switch (review.starRating) {
                            case "ONE":
                                review.rating = 1;
                                break;
                            case "TWO":
                                review.rating = 2;
                                break;
                            case "THREE":
                                review.rating = 3;
                                break;
                            case "FOUR":
                                review.rating = 4;
                                break;
                            case "FIVE":
                                review.rating = 5;
                                break;
                            default:
                                review.rating = 0;
                        }
                        // Format date as "a min ago", "a day ago", etc.
                        function timeAgo(dateString) {
                            const now = new Date();
                            const date = new Date(dateString);
                            const seconds = Math.floor((now - date) / 1000);

                            if (isNaN(date.getTime())) return dateString;

                            const intervals = [
                                { label: 'year', seconds: 31536000 },
                                { label: 'month', seconds: 2592000 },
                                { label: 'day', seconds: 86400 },
                                { label: 'hour', seconds: 3600 },
                                { label: 'min', seconds: 60 },
                                { label: 'sec', seconds: 1 }
                            ];

                            for (const interval of intervals) {
                                const count = Math.floor(seconds / interval.seconds);
                                if (count >= 1) {
                                    return count === 1
                                        ? `a ${interval.label} ago`
                                        : `${count} ${interval.label}s ago`;
                                }
                            }
                            return 'just now';
                        }

                        return (
                            <div key={index} className="p-2">
                                <div className="bg-white border rounded-sm font-[poppins] min-h-[250px] max-h-[250px] overflow-auto">
                                    <div className='review_body p-2'>
                                        <div className="flex items-center">
                                            {/* <img src={review.reviewer_image} alt={review.reviewer_name} className="w-13 h-13 rounded-full mr-4" /> */}
                                            <div>
                                                <p className="!text-md poppins-semibold mb-0 mt-3 capitalize">{review.reviewer_name}
                                                    {/* {review.reviewer_image} */}
                                                </p>
                                                <p className="text-gray-500">
                                                    {timeAgo(review.createTime)}
                                                </p>
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
                                        <p className="text-gray-700 mb-0 !text-[14px]">{review.comment}</p>
                                        {/* <p className="text-gray-500 mt-1 mb-0">{review.itemType}</p> */}
                                    </div>
                                    {/* <div className='review_img'>
                                    <img src={review.image} alt={review.name} className="w-full max-h-[200px] object-cover" />
                                </div> */}
                                </div>
                            </div>
                        )
                    }
                    )}
                </Slider>
            </div>
        </>
    );
}
