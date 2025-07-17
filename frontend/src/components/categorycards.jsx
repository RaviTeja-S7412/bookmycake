import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

export default function CategoryCards({ categories }) {

  const navigate = useNavigate();

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
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
    <section className="default-width py-10">
      <h5 className="sm:!text-4xl poppins-semibold text-gray-800 mb-4">Shop by Categories</h5>
      <div className="gap-4 cursor-pointer">
        <div className="slider-container">
          <Slider {...settings}>
            {categories?.map((cat, index) => (
              <div className="p-2" key={index} onClick={() => navigate('/collections/' + cat.route)}>
                <div
                  className="bg-[#bc4d5e] text-white rounded-3xl p-1 !flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <img src={import.meta.env.VITE_APIBASE_URL + cat.category_image} alt={cat.category_name} className="mb-3 lg:w-[30%]" />
                  <div className="text-center poppins-semibold">{cat.category_name}</div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

