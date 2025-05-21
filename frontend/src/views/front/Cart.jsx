import React, { useState } from "react";

export default function Cart() {
  const [quantity, setQuantity] = useState(1);
  const price = 1599;

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-white">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Your Cart</h2>
        <button className="text-sm text-gray-600 hover:underline">
          Continue shopping
        </button>
      </div>

      {/* Header Row */}
      <div className="hidden sm:grid grid-cols-12 font-semibold text-sm text-gray-400 border-b pb-2 mb-4">
        <div className="col-span-6">PRODUCT</div>
        <div className="col-span-3 text-center">QUANTITY</div>
        <div className="col-span-3 text-right">TOTAL</div>
      </div>

      {/* Cart Item */}
      <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-6 border-b py-4">
        {/* Product Info */}
        <div className="col-span-6 flex items-start gap-4">
          <img
            src="src/assets/products/jungle_cake.jpg"
            alt="Jungle theme cake"
            className="w-32 h-32 object-cover rounded-lg shadow"
          />
          <div>
            <h3 className="text-lg font-semibold">Jungle theme</h3>
            <p className="text-base font-bold text-gray-800 mt-1">₹1,599</p>
            <ul className="text-sm text-gray-700 mt-2 space-y-1">
              <li><strong>Flavor:</strong> Chocolate Truffle</li>
              <li><strong>Egg Option:</strong> Egg</li>
              <li><strong>Weight:</strong> 1 Kg</li>
              <li><strong>Day:</strong> Today</li>
              <li><strong>Time:</strong> 5PM–7PM</li>
              <li><strong>Delivery:</strong> Fixed Time Delivery</li>
              <li><strong>City:</strong> Gurgaon</li>
              <li><strong>Area/Sector:</strong> Sector 3</li>
            </ul>
          </div>
        </div>

        {/* Quantity */}
        <div className="col-span-3 flex justify-center">
          <div className="flex border border-gray-300 rounded">
            <button
              onClick={decrement}
              className="px-3 py-1 text-lg font-bold text-gray-600"
            >−</button>
            <span className="px-4 py-1 text-lg">{quantity}</span>
            <button
              onClick={increment}
              className="px-3 py-1 text-lg font-bold text-gray-600"
            >+</button>
          </div>
            <button className="text-red-600 hover:text-red-800">
            <img src="../icons/delte_icon.png" alt="Delete" className="w-5 h-5" />
            </button>
        </div>

        {/* Total Price */}
        <div className="col-span-3 text-right text-lg font-semibold">
          ₹{(price * quantity).toLocaleString()}
        </div>
      </div>
     {/*SubTotal */}
    <div className="flex flex-col items-end mt-8">
        <div className="rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold">Subtotal</span>
                <span className="text-2xl font-bold">₹{(price * quantity).toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
                Tax included and shipping calculated at checkout
            </p>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold py-3 rounded-full transition" style={{ borderRadius: "24px"}}>
                Checkout
            </button>
        </div>
    </div>
    
     
    </div>
  );
}
