// components/DesignerCollections.jsx
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

export default function DesignerCollections({data}) {

  const navigate = useNavigate();
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
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
    <section className='bg-[url(/assets/images/designer-bg.jpg)] bg-cover bg-no-repeat bg-center'>
      <div className="default-width py-10">
        <h4 className="sm:!text-4xl poppins-semibold text-gray-800 mb-4 text-white">Designer Collections</h4>
        <div className="slider-container">
          <Slider {...settings}>
            {data?.map((feature, index) => (
              <div key={index} className="p-2 cursor-pointer" onClick={() => navigate('/products/' + feature?.route)}>
                <div className="border border-[#b5b6b8] overflow-hidden relative">
                  <img src={import.meta.env.VITE_APIBASE_URL + feature?.product_image} alt={feature?.product_name} className="w-full max-h-[290px] object-cover" />
                </div>
                <div className="bg-[#1f1f1f] text-[#ffb14f] text-center py-[10px] font-[poppins] poppins-medium shadow-md w-4/5 mx-auto mt-[-20px] z-10 relative border border-[#b5b6b8] text-xl mb-[30px]">
                  {feature?.product_name}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
