export default function CorporateCollections() {
  const cakes = [
    { title: "Orange Slice Cake", image: "assets/images/lemon-chessescake-food-photography-recipe-idea.jpg" },
    { title: "Black Forest Cake", image: "assets/images/front-view-delicious-cake-concept.jpg" },
    { title: "Chocolate Truffle Cake", image: "assets/images/front-view-round-chocolate-cake-stand.jpg" },
    { title: "Blue Berry Cake", image: "assets/images/high-angle-delicious-chocolate-cake-concept.jpg" },
    { title: "Dry Fruite Cake", image: "assets/images/blue-berry-cake.jpg" },
    { title: "Oreo Chocolate Cake", image: "assets/images/delicious-cake-with-biscuits.jpg" },
  ];

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

          <button className="border border-2 border-white text-white poppins-semibold px-5 py-2 rounded-lg mt-4">
            Explore
          </button>
        </div>
      </div>

      {/* Cake Grid */}
      <div className="md:w-3/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {cakes.map((cake, index) => (
          <div key={index} className="relative group ins-brdr">
            <img
              src={cake.image}
              alt={cake.title}
              className="w-full h-full object-cover"
            />
            <p className="absolute top-5 left-0 right-0 text-center text-white text-xl poppins-semibold font-[poppins]">
              {cake.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
