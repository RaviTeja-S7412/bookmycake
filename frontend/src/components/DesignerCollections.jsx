// components/DesignerCollections.jsx
import Slider from "react-slick";

const cakes = [
  { title: "Elsa Frozen Cake", image: "/assets/images/wallpaperflare.com_wallpaper.jpg" },
  { title: "Real Madrid Cake", image: "/assets/images/real_madrid.jpg" },
  { title: "Avengers Cake", image: "/assets/images/avengers.jpg" },
  { title: "Elsa Frozen Cake", image: "/assets/images/wallpaperflare.com_wallpaper.jpg" },
  { title: "Avengers Cake", image: "/assets/images/avengers.jpg" },
];

export default function DesignerCollections() {

  const settings = {
    dots: true,
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
            {cakes.map((cake, index) => (
              <div key={index} className="p-2">
                <div className="border border-[#b5b6b8] overflow-hidden relative">
                  <img src={cake.image} alt={cake.title} className="w-full max-h-[290px] object-cover" />
                </div>
                <div className="bg-[#1f1f1f] text-[#ffb14f] text-center py-[10px] font-[poppins] poppins-medium shadow-md w-4/5 mx-auto mt-[-20px] z-10 relative border border-[#b5b6b8] text-xl mb-[30px]">
                  {cake.title}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
