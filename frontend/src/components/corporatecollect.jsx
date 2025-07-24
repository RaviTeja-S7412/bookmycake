import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import CIcon from '@coreui/icons-react'
import { cilBookmark } from '@coreui/icons'
import Wishlist from "./front/Wishlist";


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
    <div className="flex xl:flex-row lg:flex-row flex-col bg-white font-[poppins]">
      {/* Left Content Block */}
      <div className="xl:w-2/5 lg:w-2/5 w-full bg-[#fff] p-[10px] sm:p-[40px] flex justify-center items-center">
        <div className="border border-2 !border-[#ed1016] rounded-xl p-[10px] sm:p-[40px]">
          <div className="d-flex items-center">
            <img
              src="assets/images/candle-cake.png"
              alt="Corporate Collection"
              className=""
            />
            <h2 className="text-xl !text-[#ed1016] poppins-semibold ml-5 mt-3">Why BMC for your Corporate Cakes:</h2>
          </div>
          <p className="text-xl !text-[#ed1016] poppins-regular mt-4">At BMC we guarantee the freshness of our cakes which are curated, crafted and made only after we receive orders from our esteemed corporate clients. Varieties are innovations are the two pillars that our Chefs always do focus on.</p>

          <button className="border border-2 border-white text-white poppins-semibold px-5 py-2 rounded-lg mt-4" onClick={() => navigate('/collections/corporate-cakes')}>
            Explore
          </button>
        </div>
      </div>

      {/* Cake Grid */}
      <div className="xl:w-3/5 lg:w-3/5 w-full">
        <div className="slider-container">
          <Slider {...settings}>
            {data?.map((feature, index) => {
              var startingSize = feature?.product_options && JSON.parse(feature.product_options)?.sort((a, b) => a.price - b.price)?.[0];
              return (
                <div key={index} className="p-2 bg-white">
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
                        <Wishlist product_id={feature?.pr_id} isWishlisted={feature?.isWishlisted} />
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
              )
            }
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
}
