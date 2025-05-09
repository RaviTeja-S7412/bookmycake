export default function CorporateCollections() {
  const cakes = [
    { title: "Orange Slice Cake", image: "assets/images/lemon-chessescake-food-photography-recipe-idea.jpg" },
    { title: "Black Forest Cake", image: "assets/images/front-view-delicious-cake-concept.jpg" },
    { title: "Chocolate Truffle Cake", image: "assets/images/front-view-round-chocolate-cake-stand.jpg" },
    { title: "Blue Berry Cake", image: "assets/images/high-angle-delicious-chocolate-cake-concept.jpg" },
    { title: "Blue Berry Cake", image: "assets/images/high-angle-delicious-chocolate-cake-concept.jpg" },
    { title: "Oreo Chocolate Cake", image: "assets/images/delicious-cake-with-biscuits.jpg" },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-black text-white">
      {/* Left Content Block */}
      <div className="md:w-1/3 bg-[#2e1e1c] flex flex-col justify-center p-6 sm:p-8 md:p-10">
        <div className="border border-white p-4 sm:p-6 rounded-md">
          <h4 className="font-bold mb-4 flex items-center text-lg sm:text-xl">
            <img src="/icons/anniversary_cake.png" className="w-8 h-6 sm:w-10 sm:h-8 mr-3" alt="dessert icon" />Corporate Collections</h4>

          <p className="text-gray-300 text-sm sm:text-base mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices.
          </p>
          <button className="bg-transparent border border-white py-2 px-4 text-white hover:bg-white hover:text-black transition text-sm sm:text-base">Explore Now</button>
        </div>
      </div>

      {/* Cake Grid */}
      <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {cakes.map((cake, index) => (
          <div key={index} className="relative group overflow-hidden h-52 sm:h-60 md:h-64">
            <img
              src={cake.image}
              alt={cake.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-0 right-0 flex justify-center text-center text-white text-xs sm:text-sm font-semibold px-2">
              {cake.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
