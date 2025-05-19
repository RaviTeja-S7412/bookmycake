import React, { useState } from "react";

export default function ProductSingle() {
  const images = [
    "/assets/images/jungle-lion-cake.jpg", // Thumbnail 
    "/assets/images/jungle-lion-cake.jpg", // Main Image
  ];

  const [selectedImage, setSelectedImage] = useState(images[1]);
  const [selectedFlavor, setSelectedFlavor] = useState("Chocolate Truffle");
  const [selectedWeight, setSelectedWeight] = useState("1kg");
  const [selectedEggoption, setSelectedEggoption] = useState("Egg");

  return (
    <div className="max-w-8xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image Gallery Section */}
      <div className="flex gap-4">
        {/* Left thumbnails */}
        <div className="flex flex-col gap-4">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`w-16 h-16 object-cover rounded-lg border cursor-pointer ${
                selectedImage === img ? "ring-2 ring-black" : ""
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Main image */}
        <div className="flex-1">
          <img
            src={selectedImage}
            alt="Selected Cake"
            className="w-full rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* Product Info Section */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Jungle Paradise Cake</h1>
        <p className="text-3xl font-bold text-black mb-2">₹1,499</p>
        <p className="text-sm text-gray-500 mb-4">Tax included.</p>
        <p className="mb-4 ">
          A jungle theme cake with base in blue, sides decorated with trees, grass, flowers and clouds. The top filled with animals just like in a jungle. Order cake online | Gurugram, Noida and Greater Noida. For any assistance or modification in cakes (in size or color or type) call at +91-9560804738. Available in 4 flavors: Chocolate Truffle, Black Forest, Pineapple and Caramel Butterscotch
        </p>

        {/* Flavor */}
        <div className="mb-4">
          <p className="font-semibold mb-1">Flavor</p>
          <div className="flex flex-wrap gap-2">
            {["Chocolate Truffle", "Exotic Pineapple", "Black Forest", "Caramel Butterscotch"].map((flavor) => (
              <button
                key={flavor}
                onClick={() => setSelectedFlavor(flavor)}
                className={`px-4 py-2 border rounded-full ${
                  selectedFlavor === flavor
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {flavor}
              </button>
            ))}
          </div>
        </div>

        {/* Weight */}
        <div className="mb-4">
          <p className="font-semibold mb-1">Weight</p>
          <div className="flex flex-wrap gap-2">
            {["1kg", "1.5kg", "2kg"].map((weight) => (
              <button
                key={weight}
                onClick={() => setSelectedWeight(weight)}
                className={`px-4 py-2 border rounded-full ${
                  selectedWeight === weight
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {weight}
              </button>
            ))}
          </div>
        </div>

        {/* Egg Option */}
        <div className="mb-4">
          <p className="font-semibold mb-1">Egg Option</p>
          <div className="flex flex-wrap gap-2">
            {["Egg", "Eggless"].map((eggoption) => (
              <button
                key={eggoption}
                onClick={() => setSelectedEggoption(eggoption)}
                className={`px-4 py-2 border rounded-full ${
                  selectedEggoption === eggoption
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {eggoption}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
