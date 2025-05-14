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
      <div className="md:w-2/5 bg-[#2e1e1c] flex flex-col justify-center p-6 sm:p-8 md:p-10">
        <div class="card">
          <div class="title">
            <span class="cake-icon"></span>
            Corporate Collections
          </div>
          <div class="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
          </div>
          <a href="#" class="button">Explore Now</a>
        </div>
      </div>

      {/* Cake Grid */}
      <div className="md:w-3/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {cakes.map((cake, index) => (
          <div key={index} className="relative group">
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
