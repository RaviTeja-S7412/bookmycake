import { useState } from 'react';
import React from "react";

export default function Products() {

  const [showPrice, setShowPrice] = useState(true);
  const [showFlavor, setShowFlavor] = useState(true);
  const [showIngredients, setShowIngredients] = useState(true);
  const [showWeight, setShowWeight] = useState(true);

  const cakes = [
    {
      name: "Jungle theme",
      price: "₹1,499",
      delivery: "Tomorrow",
      rating: 4.5,
      reviews: 120,
      image: "/assets/images/products/jungle_cake.jpg",
    },
    {
      name: "Jungle theme pink Cake",
      price: "₹1,699",
      delivery: "Tomorrow",
      rating: 5.0,
      reviews: 3,
      image: "/assets/images/products/blue_berry.jpg",
    },
    {
      name: "Lion King Sunet Cake",
      price: "₹1,499",
      delivery: "Tomorrow",
      rating: 5.0,
      reviews: 0,
      image: "/assets/images/products/pink_berry.jpg",
    },
    {
      name: "Lion King Sunet Cake",
      price: "₹1,499",
      delivery: "Tomorrow",
      rating: 5.0,
      reviews: 0,
      image: "/assets/images/products/jungle-animals-cake.jpg",
    },
    {
      name: "Jungle theme pink Cake",
      price: "₹1,699",
      delivery: "Tomorrow",
      rating: 5.0,
      reviews: 3,
      image: "/assets/images/products/jungle-lion-cake.jpg",
    },
    {
      name: "Jungle theme",
      price: "₹1,499",
      delivery: "Tomorrow",
      rating: 4.5,
      reviews: 120,
      image: "/assets/images/products/jungle_cake.jpg",
    },
  ];

  return (
    <div className="default-width font-[Poppins]">
      <h2 className="text-3xl poppins-bold my-3 py-2">Products</h2>

      <div className="flex flex-wrap md:flex-nowrap">

        {/* Sidebar Filters */}
        <div className="md:w-1/4 p-4 bg-[#910f3f] mb-6 md:mb-0 text-white" style={{ height: 'fit-content' }}>
          {/* Price */}
          <div onClick={() => setShowPrice(!showPrice)} className="flex justify-between items-center cursor-pointer mb-1">
            <h6 className="poppins-semibold mb-0">Price</h6>
            <img src="/icons/uparrow-white.png" alt="arrow"
              className={`transition-transform duration-300 ${showPrice ? 'rotate-0' : 'rotate-180'}`} />
          </div>

          {showPrice && (
            <div className="grid grid-cols-2 gap-4 mb-2 text-black">
              <input type="text" placeholder="From" className="border bg-white px-2 py-1 mt-1" />
              <input type="text" placeholder="To" className="border bg-white px-2 py-1 mt-1" />
            </div>
          )}
          <hr />

          {/* Flavor */}
          <div onClick={() => setShowFlavor(!showFlavor)} className="flex justify-between items-center cursor-pointer mt-3">
            <h6 className="poppins-semibold mb-0">Flavor</h6>
            <img src="/icons/uparrow-white.png" alt="arrow"
              className={`transition-transform duration-300 ${showFlavor ? 'rotate-0' : 'rotate-180'}`} />
          </div>
          {showFlavor && (
            <ul className="space-y-6 leading-tight text-sm mt-3">
              <li><input type="checkbox" className="mr-4" /> Belgian Chocolate</li>
              <li><input type="checkbox" className="mr-4" /> Black Forest</li>
              <li><input type="checkbox" className="mr-4" /> Butterscotch</li>
              <li><input type="checkbox" className="mr-4" /> Caramel Butterscotch</li>
              <li><input type="checkbox" className="mr-4" /> Chocolate Hazelnut</li>
            </ul>
          )}
          <hr />

          {/* Ingredients */}
          <div onClick={() => setShowIngredients(!showIngredients)} className="flex justify-between items-center cursor-pointer mt-3">
            <h6 className="poppins-semibold mb-0">Ingredients</h6>
            <img src="/icons/uparrow-white.png" alt="arrow"
              className={`transition-transform duration-300 ${showIngredients ? 'rotate-0' : 'rotate-180'}`} />
          </div>
          {showIngredients && (
            <ul className="space-y-6 leading-tight text-sm mt-3">
              <li><input type="checkbox" className="mr-4" /> Egg</li>
              <li><input type="checkbox" className="mr-4" /> Eggless</li>
            </ul>
          )}
          <hr />

          {/* Weight */}
          <div onClick={() => setShowWeight(!showWeight)} className="flex justify-between items-center cursor-pointer mt-3">
            <h6 className="poppins-semibold mb-0">Weight</h6>
            <img src="/icons/uparrow-white.png" alt="arrow"
              className={`transition-transform duration-300 ${showWeight ? 'rotate-0' : 'rotate-180'}`} />
          </div>
          {showWeight && (
            <ul className="space-y-6 leading-tight text-sm mt-3">
              <li><input type="checkbox" className="mr-4" /> 500 Gms</li>
              <li><input type="checkbox" className="mr-4" /> 0.5 kg</li>
              <li><input type="checkbox" className="mr-4" /> 1 kg</li>
              <li><input type="checkbox" className="mr-4" /> 1.5 kg</li>
              <li><input type="checkbox" className="mr-4" /> 2 kg</li>
            </ul>
          )}
        </div>

        {/* Product Grid */}
        <div className="md:w-3/4 md:pl-6">
          <div className="flex justify-between items-center mb-4 bg-[#910f3f] p-2 sm:p-4 text-white">
            <p className="poppins-semibold mb-0">181 products</p>
            <div>
              <label className="mr-2 font-medium text-sm">Sort by:</label>
              <select className="border rounded py-1">
                <option className='text-black'>Featured</option>
                <option className='text-black'>Price: Low to High</option>
                <option className='text-black'>Price: High to Low</option>
                <option className='text-black'>Newest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cakes.map((cake, index) => (
              // <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <div key={index} className="bg-white shadow-md overflow-hidden">
                <img src={cake.image} alt={cake.name} className="w-full h-auto object-cover" />
                <div className="p-2">
                  <h6 className="text-lg poppins-semibold">{cake.name}</h6>
                  <p className="text-sm text-gray-600 mb-1">
                    Earliest delivery: <span className="font-sm poppins-semibold">{cake.delivery}</span>
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg poppins-bold mb-0">{cake.price}</p>
                    <div className="flex items-center">
                      {[...Array(4)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-300 ms-1" fill="currentColor" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <svg className="w-4 h-4 ms-1 text-gray-300" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <span className="ml-2 text-gray-600 text-sm">({cake.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
