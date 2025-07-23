// components/DesignerCollections.jsx
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import CIcon from '@coreui/icons-react'
import { cilBookmark } from '@coreui/icons'

export default function IndianCollection({ data }) {

    const navigate = useNavigate();
    return (
        <section className='bg-gray-200 bg-cover bg-no-repeat bg-center font-[poppins]'>
            <div className="default-width py-5">
                <h4 className="sm:!text-4xl poppins-semibold mb-4">Indian Fusion Cakes</h4>
                <div className="grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-4">
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
                <div className="text-center" >
                    <button className="px-5 py-2 border rounded-full bg-[#ed1016] text-white mt-5 border-2 border-white" onClick={() => navigate('/collections/indian-fusion-cakes')}>View All</button>
                </div>
            </div>
        </section>
    );
}
