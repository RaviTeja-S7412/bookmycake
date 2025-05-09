const categories = [
  { title: "Christmas Specials", icon: "/icons/christams_special.png" },
  { title: "Birthday Cakes", icon: "/icons/birthday-cake.png" },
  { title: "Desserts", icon: "/icons/desserts.png" },
  { title: "Anniversary Cakes", icon: "/icons/anniversary_cake.png" },
  { title: "Photo Cakes", icon: "/icons/photoframe_cake.png" },
];

export default function CategoryCards() {
  return (
    <section className="w-4/5 mx-auto my-6">
      <h5 className="text-2xl font-bold text-left text-gray-800 mb-6 py-2">Shop by Categories</h5>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-[#bc4d5e] text-white rounded-lg p-6 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
            style={{ height: '250px' }} // Increased height here
          >
            <img src={cat.icon} alt={cat.title} className="w-15 h-15 mb-3" />
            <div className="text-center text-sm font-medium">{cat.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

