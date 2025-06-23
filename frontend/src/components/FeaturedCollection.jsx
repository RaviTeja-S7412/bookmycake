// components/DesignerCollections.jsx
import { useNavigate } from "react-router-dom";

export default function FeaturedCollection({data}) {

    const navigate = useNavigate();
    
    return (
        <section className='bg-gray-200 py-10 font-[poppins]'>
            <div className="default-width">
                <h4 className="sm:!text-4xl poppins-semibold text-gray-800 mb-4">Featured Collection</h4>
                <div className="slider-container">
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-5">
                        {data?.map((feature, index) => (<>
                            <div className="rounded-md shadow p-2 bg-white">
                                <div className="feature-img rounded-lg overflow-hidden cursor-pointer" onClick={() => navigate('/products/' + feature?.route)}>
                                    <img src={import.meta.env.VITE_APIBASE_URL + feature?.product_image} alt={feature?.product_name} className="w-full h-48 object-cover" />
                                </div>
                                <div className="relative">
                                    <div className="veg-icon flex" style={{ marginBottom: '7px', flexWrap: 'wrap' }}>
                                        <div>
                                            <div className="w-[16px] h-[16px] border border-green-500 text-center bg-[#fff] mr-[7px] mt-[10px] relative rounded-[3px]">
                                                <span className="inline-block w-[8px] h-[8px] bg-[#3DA66E] rounded-[50%] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="feature-title flex cursor-pointer" onClick={() => navigate('/products/' + feature?.route)}>
                                        <p className="font-semibold mt-2">{feature?.product_name}</p>
                                    </div>
                                    {/* <div className="feature-footer flex justify-space-between items-center w-full left-[0px] bottom-[12px] py-[5px]">
                                        <p className="flex items-center m-0 font-semibold">₹ {feature.price}</p>
                                        <button className="text-[#333] px-[20px] py-[5px] rounded rounded-[8px] font-semibold border border-black !ml-auto">Add</button>
                                    </div> */}
                                </div>
                            </div>
                        </>))}
                    </div>
                </div>
            </div>
        </section>
    );
}
