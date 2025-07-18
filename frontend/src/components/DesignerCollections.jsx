// components/DesignerCollections.jsx
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

export default function DesignerCollections({data}) {

  const navigate = useNavigate();
  const settings = {
    dots: false,
    arrows: false,
    infinite: data?.length > 2 ? true : false,
    speed: 1500,
    slidesToShow: 3,
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
    <section className='bg-[url(/assets/images/designer-bg.jpg)] bg-cover bg-no-repeat bg-center'>
      <div className="default-width py-10">
        <h4 className="sm:!text-4xl poppins-semibold text-gray-800 mb-4 text-white">Designer Collections</h4>
        <div className="slider-container">
          <Slider {...settings}>
            {data?.map((feature, index) => {
              var startingSize = feature?.product_options && JSON.parse(feature.product_options)?.sort((a, b) => a.price - b.price)?.[0];
              return(
                <div key={index} className="p-2 cursor-pointer" onClick={() => navigate('/products/' + feature?.route)}>
                  <div className="border border-[#b5b6b8] overflow-hidden relative">
                    <img src={import.meta.env.VITE_APIBASE_URL + feature?.product_image} alt={feature?.product_name} className="w-full max-h-[290px] object-cover" />
                  </div>
                  <div className="bg-[#1f1f1f] flex text-[#ffb14f] py-[10px] font-[poppins] poppins-medium shadow-md w-4/5 mx-auto mt-[-20px] z-10 relative border border-[#b5b6b8] text-sm mb-[30px] px-3 justify-between">
                    <p className="mb-0">{feature?.product_name}</p>
                    <p className="mb-0">₹ {startingSize?.price}</p>
                  </div>
                </div>
              )}
            )}
          </Slider>
        </div>
      </div>
    </section>
  );
}
