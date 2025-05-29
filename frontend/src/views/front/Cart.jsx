import React, { useState } from "react";

export default function Cart() {
  const [quantity, setQuantity] = useState(1);
  const price = 1599;

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="default-width px-6 py-10 bg-white font-[poppins]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Your Cart</h2>
        <button className="text-sm text-gray-600 hover:underline">
          Continue shopping
        </button>
      </div>

      <div className="grid lg:grid-cols-1 gap-2">
        <div className="p-2 rounded-lg">
          <div class="w-full max-w-5xl mx-auto border p-4 flex items-center justify-between">
            {/* <!-- Product Details --> */}
            <div class="lg:flex items-start space-x-4 w-2/3">
              <img src="src/assets/products/jungle_cake.jpg" alt="Jungle Theme Cake" class="w-24 h-24 object-cover rounded-md border" />
              <div>
                <p class="text-lg font-semibold mb-1">Jungle Theme</p>
                <p class="text-sm mb-1"><span class="font-semibold">Price:</span> ₹1,599</p>
                <p class="text-sm mb-1"><span class="font-semibold">Flavor:</span> Chocolate Truffle</p>
                <p class="text-sm mb-1"><span class="font-semibold">Weight:</span> 1 Kg</p>
              </div>
            </div>

            {/* <!-- Quantity & Total --> */}
            <div class="lg:flex items-center space-x-6 w-1/3 justify-end">
              {/* <!-- Quantity Control --> */}
              <div class="lg:flex items-center border rounded overflow-hidden">
                <button class="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100" onClick={decrement}>-</button>
                <span class="px-4 py-1 text-base">{quantity}</span>
                <button class="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100" onClick={increment}>+</button>
              </div>

              {/* <!-- Delete Icon --> */}
              <button class="text-gray-500 hover:text-red-600 lg:!mr-5">
                <img className="h-5 w-5" src="src/assets/delte_icon.png" alt="Delete" />
              </button>

              {/* <!-- Total Price --> */}
              <div class="text-lg font-semibold lg:text-right">₹{(price * quantity).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-1 gap-2">
        <div className="p-2 rounded-lg">
          <div class="w-full max-w-5xl mx-auto border p-4 flex items-center justify-between">
            {/* <!-- Product Details --> */}
            <div class="lg:flex items-start space-x-4 w-2/3">
              <img src="src/assets/products/jungle_cake.jpg" alt="Jungle Theme Cake" class="w-24 h-24 object-cover rounded-md border" />
              <div>
                <p class="text-lg font-semibold mb-1">Jungle Theme</p>
                <p class="text-sm mb-1"><span class="font-semibold">Price:</span> ₹1,599</p>
                <p class="text-sm mb-1"><span class="font-semibold">Flavor:</span> Chocolate Truffle</p>
                <p class="text-sm mb-1"><span class="font-semibold">Weight:</span> 1 Kg</p>
              </div>
            </div>

            {/* <!-- Quantity & Total --> */}
            <div class="lg:flex items-center space-x-6 w-1/3 justify-end">
              {/* <!-- Quantity Control --> */}
              <div class="lg:flex items-center border rounded overflow-hidden">
                <button class="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100" onClick={decrement}>-</button>
                <span class="px-4 py-1 text-base">{quantity}</span>
                <button class="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100" onClick={increment}>+</button>
              </div>

              {/* <!-- Delete Icon --> */}
              <button class="text-gray-500 hover:text-red-600 lg:!mr-5">
                <img className="h-5 w-5" src="src/assets/delte_icon.png" alt="Delete" />
              </button>

              {/* <!-- Total Price --> */}
              <div class="text-lg font-semibold lg:text-right">₹{(price * quantity).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-1 gap-2">
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
          <div className="rounded-lg w-full max-w-sm ml-auto mt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">Subtotal</span>
              <span className="text-2xl font-bold">₹{(price * quantity).toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Tax included and shipping calculated at checkout
            </p>
            <button className="px-4 py-2 border rounded-full bg-black text-white w-full mt-0">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
