import React, { useState } from "react";

const categories = ["Popular", "Cake Toppers", "Desserts"];

const products = [
  {
    name: "1 Number Candle",
    price: 79,
    image: "src/assets/props/one_candle.jpg",
  },
  {
    name: "Curly Candles",
    price: 99,
    image: "src/assets/props/curly_candle.jpg",
  },
  {
    name: "Magic Candles",
    price: 79,
    image: "src/assets/props/magic_candle.jpg",
  },
  {
    name: "Party Popper",
    price: 99,
    image: "src/assets/props/party_papers.jpg",
  },
  {
    name: "Flower Candle",
    price: 99,
    image: "src/assets/props/flower_candle.jpg",
  },
  {
    name: "Birthday Cap",
    price: 79,
    image: "src/assets/props/birthday_cap.jpg",
  },
  {
    name: "Balloons",
    price: 99,
    image: "src/assets/props/baloons.jpg",
  },
  {
    name: "Happy B'Day Banner",
    price: 79,
    image: "src/assets/props/happy_bday_banner.jpg",
  },
  {
    name: "Anniversary Banner",
    price: 99,
    image: "src/assets/props/happy_anniversary.jpg",
  },
  {
    name: "Congrats Banner",
    price: 99,
    image: "src/assets/props/congratulation_banner.jpg",
  },
];

export default function Props() {
  const [activeCategory, setActiveCategory] = useState("Popular");

return (
    <div className="p-4 sm:p-6 bg-pink-50 min-h-screen">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Add More Fun To Celebration.....
        </h2>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeCategory === category
                            ? "bg-orange-400 text-white"
                            : "border border-orange-400 text-orange-400"
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>

        <div className="flex justify-center">
            <div className="w-full max-w-7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products.map((product, index) => (
                        <div key={`${product.name}-${index}`}
                            className="bg-white shadow rounded-xl overflow-hidden text-center p-4 flex flex-col justify-between h-[22rem]">
                            <img src={product.image} alt={product.name}
                                className="w-full h-40 sm:h-48 object-cover mb-3 rounded-lg"/>
                            <h6 className="text-md font-semibold">{product.name}</h6>
                            <div className="flex mt-3 items-center justify-between">
                                <p className="text-lg font-bold text-gray-800">₹{product.price}</p>
                                <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 text-lg">
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
}
