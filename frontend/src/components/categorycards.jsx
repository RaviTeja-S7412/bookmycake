const categories = [
  { title: "Fathers Day Specials", icon: "/icons/christmas.png" },
  { title: "Birthday Cakes", icon: "/icons/birthday.png" },
  { title: "Desserts", icon: "/icons/dessert.png" },
  { title: "Anniversary Cakes", icon: "/icons/anniversary.png" },
  { title: "Photo Cakes", icon: "/icons/photo.png" },
];

export default function CategoryCards() {
  return (
    <section className="default-width py-10">
      <h5 className="sm:!text-4xl poppins-semibold text-gray-800 mb-4">Shop by Categories</h5>
      <div className="grid lg:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 cursor-pointer">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-[#bc4d5e] text-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 min-h-[230px]"
          >
            <img src={cat.icon} alt={cat.title} className="mb-3" />
            <div className="text-center poppins-semibold">{cat.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

