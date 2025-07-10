
export default function CategoryCards({ categories }) {
  return (
    <section className="default-width py-10">
      <h5 className="sm:!text-4xl poppins-semibold text-gray-800 mb-4">Shop by Categories</h5>
      <div className="grid lg:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 cursor-pointer">
        {categories?.map((cat, index) => (
          <div
            key={index}
            className="bg-[#bc4d5e] text-white rounded-3xl p-1 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
          >
            <img src={import.meta.env.VITE_APIBASE_URL + cat.category_image} alt={cat.category_name} className="mb-3 lg:w-[30%]" />
            <div className="text-center poppins-semibold">{cat.category_name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

