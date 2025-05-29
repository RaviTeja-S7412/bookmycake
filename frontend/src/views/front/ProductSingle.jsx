import React, { useState, useEffect } from "react";

export default function ProductSingle() {
  const images = [
    "/assets/images/jungle-lion-cake.jpg", // Thumbnail
    "/assets/images/jungle-lion-cake-details.jpg", // Main Image
  ];

  const [selectedImage, setSelectedImage] = useState(images[1]);
  const [selectedFlavor, setSelectedFlavor] = useState("Chocolate Truffle");
  const [selectedWeight, setSelectedWeight] = useState("1kg");
  const [selectedArea, setSelectedArea] = useState('');

  const [selectedDay, setSelectedDay] = useState('Today');
  const [fixTime, setFixTime] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const days = ['Today', 'Tomorrow', 'Calender'];

  // 12-hour window: 9AM to 9PM divided into 3-hour slots
  const allSlots = [
    { label: '9AM-11AM', start: 9 },
    { label: '11AM-1PM', start: 11 },
    { label: '1PM-3PM', start: 13 },
    { label: '3PM-5PM', start: 15 },
    { label: '5PM-7PM', start: 17 },
    { label: '7PM-9PM', start: 19 },
    { label: '9PM-11PM', start: 21 },
  ];

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();

    if (selectedDay === 'Today') {
      const futureSlots = allSlots.filter(slot => slot.start > currentHour);
      setAvailableSlots(futureSlots);
    } else {
      // For Tomorrow or Calendar, show all slots
      setAvailableSlots(allSlots);
    }

    // Reset selectedSlot when available slots change
    setSelectedSlot('');
  }, [selectedDay]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const areas = [
    'Panagutta',
    'Somajiguda',
    'Khairatabad',
    'Nampally',
    'Koti',
    'Dilsukhnagar',
    'Banjarahills',
    'Jublee Hills',
    'Hitech-city',
    'Madhapur',
    'Gachibowli',
  ];

  return (
    <div className="default-width mx-auto p-4 grid grid-cols-3 md:grid-cols-3 gap-4 font-[poppins]">
      {/* Image Gallery Section */}
      <div>
        {/* Main image */}
        <div className="flex">
          <div>
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg mr-7 mb-2 border cursor-pointer ${selectedImage === img ? "" : ""
                  }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <img
            src={selectedImage}
            alt="Selected Cake"
            className="w-full rounded-2xl shadow-lg"
          />
        </div>

        {/* Down thumbnails */}
        <div className="mt-3">

        </div>
      </div>

      {/* Product Info Section */}
      <div className="col-span-2">
        <h1 className="text-4xl font-bold mb-2">Jungle Paradise Cake</h1>
        <p className="text-3xl font-bold text-black mb-2">₹1,499</p>
        <p className="text-sm text-gray-500 mb-4">Tax included.</p>
        <p className="mb-4 text-lg">
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
                className={`px-4 py-2 border rounded-full ${selectedFlavor === flavor
                  ? "bg-black text-white"
                  : "bg-white text-black"
                  }`}
              >
                {flavor}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-4">
          {/* Weight */}
          <div>
            <p className="font-semibold mb-1">Weight</p>
            <div className="flex flex-wrap gap-2">
              {["1kg", "1.5kg", "2kg"].map((weight) => (
                <button
                  key={weight}
                  onClick={() => setSelectedWeight(weight)}
                  className={`px-4 py-2 border rounded-full ${selectedWeight === weight
                    ? "bg-black text-white"
                    : "bg-white text-black"
                    }`}
                >
                  {weight}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-1">Select Area</p>
            <select
              id="area"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Choose an area</option>
              {areas.map((area, index) => (
                <option key={index} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-4">
          <div>
            <p className="font-semibold mb-1">Select Date & Time</p>
            <div className="flex gap-2 mb-3">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`border px-4 py-2 rounded ${selectedDay === day ? 'bg-black text-white' : 'bg-white text-black'
                    }`}
                >
                  {day}
                </button>
              ))}
            </div>
            <div className="mb-2">
              <div className="flex items-center text-sm">
                <input
                  type="radio"
                  checked={fixTime}
                  onChange={() => setFixTime(true)}
                  className="mr-2"
                />
                <span className="ml-2">Fix Time Delivery - <strong>Free</strong></span>
              </div>
              {selectedDay === 'Calender' && (
                <div className="mb-3 mt-3">
                  <label className="text-sm font-bold">Choose a date:</label>
                  <input
                    type="date"
                    value={selectedDate || ''}
                    onChange={handleDateChange}
                    className="ml-2 p-2 border rounded"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="ml-5">
            {fixTime && (
              <div className="mb-2">
                <div className="font-semibold mb-1">Fixed Time Delivery:</div>
                <div className="flex gap-2 flex-wrap">
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot) => (
                      <button
                        key={slot.label}
                        onClick={() => setSelectedSlot(slot.label)}
                        className={`px-4 py-2 rounded border ${selectedSlot === slot.label
                          ? 'bg-red-400 text-white'
                          : 'bg-gray-100 text-gray-700'
                          }`}
                      >
                        {slot.label}
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-500">No time slots available today.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="w-1/2">
            <p className="font-semibold mb-1">Message on Cake</p>
            <textarea
              rows="3"
              placeholder="Type your message here..."
              className="w-full border border-gray-300 rounded-md p-2"
              maxLength="50"></textarea>
          </div>
          <div className="w-1/2">
            <button
              className={`px-4 py-2 border rounded-full bg-black text-white w-full mt-3`}
            >
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}