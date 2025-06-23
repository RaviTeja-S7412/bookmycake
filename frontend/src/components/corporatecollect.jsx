import { useNavigate } from "react-router-dom";

export default function CorporateCollections({data}) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row bg-black text-white">
      {/* Left Content Block */}
      <div className="md:w-2/5 bg-[#2e1e1c] p-[10px] sm:p-[40px]"> 
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
      <div className="md:w-3/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((feature, index) => (
          <div key={index} className="relative group ins-brdr cursor-pointer" onClick={() => navigate('/products/' + feature?.route)}>
            <img
              src={import.meta.env.VITE_APIBASE_URL + feature?.product_image}
              alt={feature?.product_name}
              className="object-cover object-center max-h-[300px] w-full"
            />
            <p className="absolute top-5 left-0 right-0 text-center text-white text-xl poppins-semibold font-[poppins]">
              {feature?.product_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
