// components/DesignerCollections.jsx
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import CIcon from '@coreui/icons-react'
import { cilBookmark } from '@coreui/icons'

export default function BirthdayCollection({ data }) {

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
        <section className='bg-[url(/assets/images/birthday-bg.jpg)] bg-cover bg-no-repeat bg-center font-[poppins]'>
            <div className="default-width py-10">
                <h4 className="sm:!text-4xl poppins-semibold text-gray-800 mb-4 text-white">Birthdays & Anniversaries</h4>
                <div className="slider-container">
                    <Slider {...settings}>
                        {
                            data.map((feature, index) => {
                                const options = feature?.product_options && JSON.parse(feature.product_options);
                                var price = options?.sort((a, b) => a.price - b.price)?.[0];
                                var size = options?.sort((a, b) => a.weight - b.weight)?.[0];
                                return (
                                    <div key={index} className="p-2" onClick={() => navigate('/products/' + feature?.route)}>
                                        <div className="!bg-white rounded">
                                            <div className="relative feature-img overflow-hidden">
                                                <div className="p-3 rounded-lg flex justify-between">
                                                    <p className="font-semibold mb-0 text-ellipsis overflow-hidden whitespace-nowrap">{feature.product_name}</p>
                                                    <p className="font-medium mb-0 text-ellipsis overflow-hidden whitespace-nowrap">₹ {price?.price}</p>
                                                </div>
                                                {/* Veg icon on image */}
                                                <div className="relative">
                                                    <div className="absolute top-2 left-2 z-10 w-[20px] h-[20px] border border-green-500 bg-white rounded flex items-center justify-center">
                                                        <span className="inline-block w-[10px] h-[10px] bg-[#3DA66E] rounded-full"></span>
                                                    </div>
                                                    <img
                                                        src={import.meta.env.VITE_APIBASE_URL + feature?.product_image}
                                                        alt={feature.product_name}
                                                        className="w-full max-h-[290px] object-cover cursor-pointer"
                                                    />
                                                </div>
                                                <div className="p-1 rounded-lg">
                                                    <div className="flex justify-between mt-2">
                                                        <p className="mb-0">Weight: {size?.weight / 1000 + " kg"}</p>
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
                </div>
            </div>
        </section>
    );
}
