// components/DesignerCollections.jsx
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import CIcon from '@coreui/icons-react'
import { cilBookmark } from '@coreui/icons'

export default function IndianCollection() {

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
        {
            product_name: "First Birthday Cake - Blue",
            product_image: "/assets/images/products/featured/strawberry-chocolate.jpg",
            route: "balloons-rounded-designer-cake",
            product_options: JSON.stringify([{ weight: 1000, price: 4569 }]),
            is_veg: true
        },

    ]

    const navigate = useNavigate();    

    return (
        <section className='bg-[#fff] bg-cover bg-no-repeat bg-center font-[poppins]'>
            <div className="default-width py-5">
                <h4 className="sm:!text-4xl poppins-semibold mb-4 !text-[#bc4d5e] text-center">Indian Fusion Cakes</h4>
                <div className="grid 2xl:grid-cols-6 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 gap-4">
                    {
                        products.map((feature, index) => {
                            const options = JSON.parse(feature.product_options);
                            const price = options[0]?.price || 0;
                            return (
                                <div key={index} className="indian-collection-border">
                                    <div className="!bg-white rounded pb-2">
                                        <div className="relative feature-img overflow-hidden">
                                            <div className="absolute top-2 left-2 z-10 w-[20px] h-[20px] border border-green-500 bg-white rounded flex items-center justify-center">
                                                <span className="inline-block w-[10px] h-[10px] bg-[#3DA66E] rounded-full"></span>
                                            </div>
                                            <img
                                                src={feature.product_image}
                                                alt={feature.product_name}
                                                className="w-full max-h-[290px] object-cover cursor-pointer"
                                                onClick={() => navigate(`/product/${feature.route}`)}
                                            />
                                            <div className="p-1">
                                                <p className="font-semibold pastries-title mb-0">{feature.product_name}</p>
                                            </div>
                                            <div className="flex justify-between px-1">
                                                <p className="font-medium mb-0">₹ {price}</p>
                                                <p className="mb-0 cursor-pointer"><CIcon icon={cilBookmark} /></p>
                                            </div>
                                            <div className="px-1 rounded-lg">
                                                <div>
                                                    <span className="text-gray-600 ml-1">4.5 <small>(9k Reviews)</small></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="text-center">
                    <button className="px-5 py-2 border rounded-full bg-[#bc4d5e] text-white mt-5 border-2 border-white">View All</button>
                </div>
            </div>
        </section>
    );
}
