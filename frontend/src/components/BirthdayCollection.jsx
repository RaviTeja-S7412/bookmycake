// components/DesignerCollections.jsx
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import CIcon from '@coreui/icons-react'
import { cilBookmark } from '@coreui/icons'

export default function BirthdayCollection() {

    const products = [
        {
            product_name: "Balloons Rounded Designer Cake",
            product_image: "/assets/images/products/featured/buscuite.jpg",
            route: "balloons-rounded-designer-cake",
            product_options: JSON.stringify([{ weight: 1000, price: 4571 }]),
            is_veg: true
        },
        {
            product_name: "Princess Group Photo Cake",
            product_image: "/assets/images/products/featured/almond.jpg",
            route: "balloons-rounded-designer-cake",
            product_options: JSON.stringify([{ weight: 1000, price: 800 }]),
            is_veg: true
        },
        {
            product_name: "Paw Patrol Designer Cake",
            product_image: "/assets/images/products/featured/cheese.jpg",
            route: "balloons-rounded-designer-cake",
            product_options: JSON.stringify([{ weight: 1000, price: 4578 }]),
            is_veg: true
        },
        {
            product_name: "Unicorn Rainbow Cake",
            product_image: "/assets/images/products/featured/choconuts.jpg",
            route: "balloons-rounded-designer-cake",
            product_options: JSON.stringify([{ weight: 1000, price: 1234 }]),
            is_veg: true
        },
        {
            product_name: "First Birthday Cake - Blue",
            product_image: "/assets/images/products/featured/strawberry-chocolate.jpg",
            route: "balloons-rounded-designer-cake",
            product_options: JSON.stringify([{ weight: 1000, price: 4569 }]),
            is_veg: true
        },
    ]

    const navigate = useNavigate();
    const settings = {
        dots: false,
        arrows: false,
        infinite: products?.length > 2 ? true : false,
        speed: 1500,
        slidesToShow: 4,
        slidesToScroll: 3,
        initialSlide: 0,
        autoplay: products?.length > 2 ? true : false,
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
                </div>
            </div>
        </section>
    );
}
