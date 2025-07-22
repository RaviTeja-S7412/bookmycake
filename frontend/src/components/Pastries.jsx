// components/DesignerCollections.jsx
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import CIcon from '@coreui/icons-react'
import { cilBookmark } from '@coreui/icons'

export default function Pastries({ data }) {

    const navigate = useNavigate();
    const settings = {
        dots: false,
        arrows: false,
        infinite: data?.length > 2 ? true : false,
        speed: 1500,
        slidesToShow: 4,
        slidesToScroll: 3,
        initialSlide: 0,
        autoplay: data?.length > 2 ? true : false,
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
        <section className='bg-[#e6e7eb] bg-cover bg-no-repeat font-[poppins]'>
            <div className="default-width py-5">
                <h4 className="sm:!text-4xl poppins-semibold mb-4">Pastries & Small Cakes</h4>
                {/* <div className="slider-container">
                     <Slider {...settings}>
                        {
                            products.map((feature, index) => {
                                const options = JSON.parse(feature.product_options);
                                const price = options[0]?.price || 0;
                                return (
                                    <div key={index} className="p-2">
                                        <div className="!bg-white rounded">
                                            <div className="relative feature-img overflow-hidden">
                                                <div className="p-3 rounded-lg flex justify-between">
                                                    <p className="font-semibold mb-0">{feature.product_name}</p>
                                                    <p className="font-medium mb-0">₹ {price}</p>
                                                </div>
                                                <img
                                                    src={feature.product_image}
                                                    alt={feature.product_name}
                                                    className="w-full max-h-[290px] object-cover cursor-pointer"
                                                />
                                                <div className="p-1 rounded-lg">
                                                    <div className="flex justify-between mt-2">
                                                        <p className="mb-0">Weight: {options[0]?.weight ? options[0].weight / 1000 + " kg" : "N/A"}</p>
                                                        <p className="mb-0 cursor-pointer"><CIcon icon={cilBookmark} /></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </Slider>
                </div> */}
                <div className="grid 2xl:grid-cols-6 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 gap-4">
                    {
                        data.map((feature, index) => {
                            var startingSize = feature?.product_options && JSON.parse(feature.product_options)?.sort((a, b) => a.price - b.price)?.[0];
                            return (
                                <div key={index} className="p-2 bg-white" onClick={() => navigate('/products/' + feature?.route)}>
                                    <div className="relative feature-img rounded-lg overflow-hidden cursor-pointer">
                                        {/* Veg icon on image */}
                                        <div className="absolute top-2 left-2 z-10 w-[20px] h-[20px] border-2 border-green-500 bg-white flex items-center justify-center">
                                            <span className="inline-block w-[10px] h-[10px] bg-[#3DA66E] rounded-full"></span>
                                        </div>
                                        <img
                                            src={import.meta.env.VITE_APIBASE_URL + feature?.product_image}
                                            alt={feature.product_name}
                                            className="w-full h-48 object-cover"
                                            onClick={() => navigate('/products/' + feature?.route)}
                                        />
                                    </div>
                                    <div className="relative">
                                        <div className="feature-title cursor-pointer" onClick={() => navigate('/products/' + feature?.route)}>
                                            <p className="font-semibold mt-2 mb-0">{feature.product_name}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="font-medium mb-0">₹ {startingSize?.price}</p>
                                            <div className="p-1 cursor-pointer">
                                                <CIcon icon={cilBookmark} />
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-yellow-500 text-sm">&#9733;</span>
                                            {feature?.ratings_count > 0 ?
                                                <span className="text-gray-600 ml-1">{Number(feature?.avg_rating).toFixed(0)} <small>({feature?.ratings_count} {feature?.ratings_count > 1 ? 'Reviews' : 'Review'})</small></span>
                                                : <span className="text-gray-600 ml-1">No Reviews</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="text-center">
                    <button className="px-5 py-2 border rounded-full bg-red-500 text-white mt-5 border-2 border-white">View All</button>
                </div>
            </div>
        </section>
    );
}
