import { useNavigate } from "react-router-dom";
import Slider from "react-slick";


export default function CorporateCollections({ data }) {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    arrows: false,
    infinite: data?.length > 6 ? true : false,
    autoplay: data?.length > 6 ? true : false,
    autoplaySpeed: 3000,
    slidesToShow: data?.length > 1 ? 3 : '',
    speed: 500,
    // rows: 2,
    rows: data?.length > 1 ? 2 : '',
    // slidesPerRow: 1,
    slidesPerRow: data?.length > 1 ? 1 : '',
    slidesToScroll: 3,
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
    <div className="flex xl:flex-row lg:flex-row flex-col bg-black text-white pt-2 !bg-[#ac8657]">
      {/* Left Content Block */}
      <div className="xl:w-2/5 lg:w-2/5 w-full bg-[#2e1e1c] p-[10px] sm:p-[40px] flex justify-center items-center">
        <div className="border border-2 border-white rounded-xl p-[10px] sm:p-[40px]">
          <div className="d-flex items-center">
            <img
              src="assets/images/candle-cake.png"
              alt="Corporate Collection"
              className=""
            />
            <h2 className="text-xl text-white poppins-semibold ml-5 mt-3">Corporate Collections</h2>
          </div>
          <p className="text-xl text-white poppins-regular mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            Lorem ipsum dolor sit amet.</p>

          <button className="border border-2 border-white text-white poppins-semibold px-5 py-2 rounded-lg mt-4" onClick={() => navigate('/collections/corporate-cakes')}>
            Explore
          </button>
        </div>
      </div>

      {/* Cake Grid */}
      <div className="xl:w-3/5 lg:w-3/5 w-full">
        <div className="slider-container">
          <Slider {...settings}>
            {data?.map((feature, index) => (
              <div key={index} className="relative d-block" onClick={() => navigate('/products/' + feature?.route)}>
                <div className="relative group ins-brdr cursor-pointer">
                  <img
                    src={import.meta.env.VITE_APIBASE_URL + feature?.product_image}
                    alt={feature?.product_name}
                    className="object-cover object-center max-h-[300px] w-full"
                  />
                  {/* Black gradient overlay effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-50 bg-gradient-to-t from-black to-transparent z-0" />
                  <p className="absolute bottom-5 left-0 right-0 text-center text-white text-xl poppins-semibold font-[poppins] z-10">
                    {feature?.product_name}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
