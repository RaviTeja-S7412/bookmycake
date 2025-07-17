import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosIntance from "../../components/axios";
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { addTocart } from "../../redux/actions/front/cart.actions";
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/styles.min.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function ProductSingle() {
  const images = [
    "/assets/images/jungle-lion-cake.jpg", // Thumbnail
    "/assets/images/jungle-lion-cake-details.jpg", // Main Image
  ];

  const [value, onChange] = useState(new Date());
  const { product_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)

  const [selectedImage, setSelectedImage] = useState(images[1]);
  const [selectedFlavor, setSelectedFlavor] = useState("Chocolate Truffle");
  const [selectedWeight, setSelectedWeight] = useState("1kg");
  const [selectedArea, setSelectedArea] = useState('');

  const [selectedDay, setSelectedDay] = useState('Today');
  const [fixTime, setFixTime] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [flavors, setFlavors] = useState([]);
  const [weights, setWeights] = useState([]);
  const [areas, setAreas] = useState([]);
  const [message, setMessage] = useState('');

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
      const futureSlots = allSlots.filter(slot => slot.start > (currentHour + 1));
      setAvailableSlots(futureSlots);
      setSelectedSlot(futureSlots.length > 0 ? futureSlots?.[0]?.label : '');
      setSelectedDate(now.toISOString().split('T')[0]);
    } else {
      // For Tomorrow or Calendar, show all slots
      if (selectedDay === 'Tomorrow') {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setSelectedDate(tomorrow.toISOString().split('T')[0]);
      }
      setAvailableSlots(allSlots);
      setSelectedSlot(allSlots.length > 0 ? allSlots?.[0]?.label : '');
    }
  }, [selectedDay]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const get_singleproductroute = async () => {
    setLoading(true);

    const params = {
      route: product_id
    };

    try {
      const res = await axiosIntance.get(`/admin/get_singleproductroute`, { params });

      if (res.status === 200) {
        const fetchedProduct = res.data.product_data;
        setProduct(fetchedProduct);
        const uniqueFlavors = [...new Set(fetchedProduct?.product_options.map(product => product.flavor))]
        setFlavors(uniqueFlavors);
        setSelectedFlavor(uniqueFlavors?.[0]);
        const weights = fetchedProduct?.product_options.filter(product => product.flavor === uniqueFlavors?.[0]);
        setSelectedWeight(weights?.[0]?.weight);
        setWeights(weights);
        setAreas(res.data.areas || []);
      } else {
      }
    } catch (error) {
      // console.error('Error fetching product:', error);
      // Handle API error
    } finally {
      setLoading(false);
    }
  };

  const add_cart = () => {

    if (selectedDate === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Please select date',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }
    if (selectedSlot === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Please select time slot',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }
    const params = {
      product_id: product?.id,
      flavor: selectedFlavor,
      weight: selectedWeight,
      area: selectedArea,
      delivery_date: selectedDate,
      delivery_time: selectedSlot,
      qty: 1,
      type: 'product',
      product_price: weights?.filter((w) => w.weight === selectedWeight)?.[0]?.price,
      user_id: localStorage.getItem('user_id') ? localStorage.getItem('user_id') : localStorage.getItem('guest_user_id'),
      message: message, // Add message from textarea if needed
      user_type: localStorage.getItem('user_type') ? 'user' : 'guest'
    };
    dispatch(addTocart(params));

    setTimeout(() => {
      navigate('/props');
    }, 1000);
  };

  useEffect(() => {
    if (product_id) {
      get_singleproductroute();
    }
  }, [product_id]);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Calendar modal state
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  return (
    <div className="default-width mx-auto p-4 lg:grid grid-cols-3 md:grid-cols-3 gap-4 font-[poppins]">
      {/* Image Gallery Section */}
      <div>
        {/* Main image */}
        <div>
          <InnerImageZoom
            alt={product?.product_name}
            src={import.meta.env.VITE_APIBASE_URL + product?.product_image}
            zoomSrc={import.meta.env.VITE_APIBASE_URL + product?.product_image}
            className="rounded-2xl shadow-lg"
          />
        </div>
        {/* Down thumbnails */}
        <div className="mt-3"></div>
      </div>

      {/* Product Info Section */}
      <div className="col-span-2">
        <h1 className="text-4xl font-bold mb-2">{product?.product_name}</h1>
        <p className="text-3xl font-bold text-black mb-2">
          ₹ {weights?.filter((w) => w.weight === selectedWeight)?.[0]?.price}
        </p>
        <p className="text-sm text-gray-500 mb-4">Tax included.</p>
        <p className="mb-4 text-lg">{product?.product_description}</p>

        {/* Flavor */}
        <div className="mb-4">
          <p className="font-semibold mb-1">Flavor</p>
          <div className="flex flex-wrap gap-2">
            {flavors.map((flavor) => (
              <button
                key={flavor}
                onClick={() => {
                  setSelectedFlavor(flavor);
                  const weights = product?.product_options.filter(
                    (product) => product.flavor === flavor
                  );
                  setSelectedWeight(weights?.[0]?.weight);
                  setWeights(weights);
                }}
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

        <div className="mb-4 gap-4">
          {/* Weight */}
          <div>
            <p className="font-semibold mb-1">Weight</p>
            <div className="flex flex-wrap gap-2">
              {weights.map((weight) => (
                <button
                  key={weight?.weight}
                  onClick={() => setSelectedWeight(weight?.weight)}
                  className={`px-4 py-2 border rounded-full ${selectedWeight === weight?.weight
                    ? "bg-black text-white"
                    : "bg-white text-black"
                    }`}
                >
                  {weight?.weight / 1000} Kg
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Egg Option */}
        <div className="mb-4">
          <p className="font-semibold mb-1">Egg Option</p>
          <div className="flex flex-wrap gap-2">
            {["Eggless"].map((eggoption) => (
              <button
                className={`px-4 py-2 border rounded-full ${"Eggless" === eggoption
                  ? "bg-black text-white"
                  : "bg-white text-black"
                  }`}
              >
                {eggoption}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 xl:flex lg:flex block w-full">
          <div className="xl:w-1/2 lg:w-full w-full">
            <p className="font-semibold mb-1">Select Date & Time</p>
            <div className="flex gap-2 mb-3">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    if (day === "Calender") {
                      setShowCalendarModal(true); // 👈 This opens the calendar modal
                    }
                  }}
                  className={`border px-4 py-2 rounded ${selectedDay === day
                    ? "bg-black text-white"
                    : "bg-white text-black"
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
                <span className="ml-2">
                  Fix Time Delivery - <strong>Free</strong>
                </span>
              </div>
              {selectedDay === "Calender" && (
                <div className="mb-3 mt-3">
                  {/* Modal */}
                  {showCalendarModal && (
                    <div
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                      onClick={() => setShowCalendarModal(false)}
                    >
                      <div
                        className="bg-white rounded-lg p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-lg font-semibold">
                            Select Delivery Date
                          </h2>
                          <button
                            className="text-gray-500 hover:text-black"
                            onClick={() => setShowCalendarModal(false)}
                          >
                            &times;
                          </button>
                        </div>
                        <Calendar
                          onChange={(date) => {
                            onChange(date);
                            setSelectedDate(
                              date instanceof Date
                                ? date.toISOString().split("T")[0]
                                : ""
                            );
                            setShowCalendarModal(false);
                          }}
                          value={value}
                          defaultView="day"
                        />
                      </div>
                    </div>
                  )}
                  {selectedDate && (
                    <div className="mt-2 text-sm text-gray-700 font-semibold">
                      Selected Date: {selectedDate}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="xl:w-1/2 lg:w-2/5 w-full">
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
                          ? "bg-red-400 text-white"
                          : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {slot.label}
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No time slots available today.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="lg:w-1/2">
            <p className="font-semibold mb-1">Message on Cake</p>
            <textarea
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full border border-gray-300 rounded-md p-2"
              maxLength="50"
            ></textarea>
          </div>
          <div className="w-1/2">
            {cart?.cart_data?.filter(
              (p) =>
                p?.product_data?.route === product_id &&
                p?.flavor === selectedFlavor &&
                p?.weight == selectedWeight
            )?.length > 0 ? (
              <button
                className={`px-4 py-2 border rounded-full bg-green-800 text-white w-full mt-3`}
                onClick={() => navigate("/cart")}
              >
                Go to Cart
              </button>
            ) : (
              <button
                className={`px-4 py-2 border rounded-full bg-black text-white w-full mt-3`}
                onClick={() => add_cart()}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}