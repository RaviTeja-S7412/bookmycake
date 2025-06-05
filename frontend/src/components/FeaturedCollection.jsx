// components/DesignerCollections.jsx
import Slider from "react-slick";

const features = [
    { title: "Almond Cake", image: "/assets/images/products/featured/almond.jpg", price: 1619 },
    { title: "Buscuite Cake", image: "/assets/images/products/featured/buscuite.jpg", price: 2150 },
    { title: "Cheese Cake", image: "/assets/images/products/featured/cheese.jpg", price: 2145 },
    { title: "Choconuts Cake", image: "/assets/images/products/featured/choconuts.jpg", price: 1548 },
    { title: "Strawberry Chocolate Cake", image: "/assets/images/products/featured/strawberry-chocolate.jpg", price: 1519 },
];

export default function FeaturedCollection() {

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 4,
        slidesToScroll: 0.5,
        initialSlide: 0,
        autoplay: false,
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
        <section className='bg-gray-200 py-10 font-[poppins]'>
            <div className="default-width">
                <h4 className="sm:!text-4xl poppins-semibold text-gray-800 mb-4">Featured Collection</h4>
                <div className="slider-container">
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-5">
                        {features.map((feature, index) => (<>
                            <div className="rounded-md shadow p-2 bg-white">
                                <div className="feature-img rounded-lg overflow-hidden">
                                    <img src={feature.image} alt={feature.title} className="w-full h-48 object-cover" />
                                </div>
                                <div className="relative">
                                    <div className="veg-icon flex" style={{ marginBottom: '7px', flexWrap: 'wrap' }}>
                                        <div>
                                            <div className="w-[16px] h-[16px] border border-green-500 text-center bg-[#fff] mr-[7px] mt-[10px] relative rounded-[3px]">
                                                <span className="inline-block w-[8px] h-[8px] bg-[#3DA66E] rounded-[50%] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="feature-title flex">
                                        <p className="font-semibold mt-2">{feature.title}</p>
                                    </div>
                                    <div className="feature-footer flex justify-space-between items-center w-full left-[0px] bottom-[12px] py-[5px]">
                                        <p className="flex items-center m-0 font-semibold">₹ {feature.price}</p>
                                        <button className="text-[#333] px-[20px] py-[5px] rounded rounded-[8px] font-semibold border border-black !ml-auto">Add</button>
                                    </div>
                                </div>
                            </div>
                        </>))}
                    </div>
                </div>
            </div>
        </section>
    );
}
