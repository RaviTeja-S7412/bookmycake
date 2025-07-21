// components/DesignerCollections.jsx
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import CIcon from '@coreui/icons-react'
import { cilBookmark } from '@coreui/icons'

export default function FeaturedCollection({ data }) {

  const navigate = useNavigate();
  const settings = {
    dots: false,
    arrows: false,
    infinite: data?.length > 4 ? true : false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: data?.length > 4 ? 1 : 5,
    initialSlide: 0,
    autoplay: data?.length > 4 ? true : false,
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
        <div className="gap-4">
          <div className="slider-container">
            <Slider {...settings}>
              {data.map((feature, index) => {
                var startingSize = feature?.product_options && JSON.parse(feature.product_options)?.sort((a, b) => a.price - b.price)?.[0];
                return (
                  <div key={index} className="p-2 bg-white">
                    <div
                      className="feature-img rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => navigate('/products/' + feature?.route)}
                    >
                      <img
                        src={import.meta.env.VITE_APIBASE_URL + feature?.product_image}
                        alt={feature?.product_name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="relative">
                      {/* <div className="veg-icon flex mb-[7px] flex-wrap">
                        <div className="w-[16px] h-[16px] border border-green-500 text-center bg-white mr-[7px] mt-[10px] relative rounded-[3px]">
                          <span className="inline-block w-[8px] h-[8px] bg-[#3DA66E] rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></span>
                        </div>
                      </div> */}
                      <div className="feature-title cursor-pointer" onClick={() => navigate('/products/' + feature?.route)}>
                        <p className="font-semibold mt-2 mb-0">{feature?.product_name}</p>
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
                            <span className="text-gray-600 ml-1">{feature?.avg_rating} <small>({feature?.ratings_count} {feature?.ratings_count > 1 ? 'Reviews' : 'Review'})</small></span>
                            : <span className="text-gray-600 ml-1">No Reviews</span>
                          }
                        </div>
                    </div>
                  </div>
                )
              })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
