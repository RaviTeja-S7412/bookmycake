import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosIntance from "../../components/axios";
import Spinner from "../../components/front/Spinner";

export default function Cart() {
  const [cartItems, setCartitems] = useState([]);
  const [cartTotal, setCarttotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const price = 1599;
  const navigate = useNavigate();

  const getcartitems = async () => {
    setLoading(true);
    try {
      const user_id = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : localStorage.getItem('guest_user_id');
      const res = await axiosIntance.post(`/admin/getcartitems`, { user_id });

      if (res.status === 200) {
        setCartitems(res.data.cart_data);
        setCarttotal(res.data.cart_data.reduce((total, item) => {
          return total + (item.product_price * item.qty);
        }
        , 0));
      }
    } catch (error) {
      // console.error('Error fetching product:', error);
      // Handle API error
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (product_id, qty, id) => {
    try {
      const user_id = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : localStorage.getItem('guest_user_id');
      const res = await axiosIntance.post(`/admin/updatecart`, { user_id, product_id, qty, id });

      if (res.status === 200) {
        getcartitems();
      }else{

      }
    } catch (error) {
      // console.error('Error fetching product:', error);
      // Handle API error
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getcartitems();
  }, []);

  return (
    <div className="default-width px-6 py-10 bg-white font-[poppins]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Your Cart</h2>
        <button className="text-sm text-gray-600 hover:underline" onClick={() => navigate('/')}>
          Continue shopping
        </button>
      </div>

      {loading ? <Spinner /> : cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <div className="grid lg:grid-cols-1 gap-2" key={index}>
            <div className="p-2 rounded-lg">
              <div class="w-full max-w-5xl mx-auto border p-4 sm:flex items-center justify-between">
                {/* <!-- Product Details --> */}
                <div class="lg:flex items-start space-x-4 sm:w-2/3">
                  <img src={item?.type === "product" ? import.meta.env.VITE_APIBASE_URL + item?.product_data?.product_image : import.meta.env.VITE_APIBASE_URL + item?.product_data?.prop_image} alt={item?.type === "product" ? item?.product_data?.product_name : item?.product_data?.prop_name} class={"w-24 h-24 object-cover rounded-md border"} />
                  <div>
                    <p class={`text-lg font-semibold mb-1 ${item?.type === "product" ? 'cursor-pointer' : ''}`} onClick={() => item?.type === "product" ? navigate('/products/'+item?.product_data?.route) : ''}>{item?.type === "product" ? item?.product_data?.product_name : item?.product_data?.prop_name}</p>
                    <p class="text-sm mb-1"><span class="font-semibold">Price:</span> ₹{item?.product_price}</p>
                    {item?.flavor && (<p class="text-sm mb-1"><span class="font-semibold">Flavor:</span> {item?.flavor}</p>)}
                    {item?.weight && (<p class="text-sm mb-1"><span class="font-semibold">Weight:</span> {item?.weight/1000} Kg</p>)}
                    {item?.delivery_date !== "0000-00-00" && (<p class="text-sm mb-1"><span class="font-semibold">Delivery Date:</span> {new Date(item?.delivery_date).toLocaleDateString()}</p>)}
                    {item?.delivery_time && (<p class="text-sm mb-1"><span class="font-semibold">Delivery Time:</span> {item?.delivery_time}</p>)}
                    {item?.message && (<p class="text-sm mb-1"><span class="font-semibold">Message:</span> {item?.message}</p>)}
                    {/* {item?.area} */}
                  </div>
                </div>

                {/* <!-- Quantity & Total --> */}
                <div class="sm:flex items-center space-x-6 sm:w-1/3 justify-end">
                  {/* <!-- Quantity Control --> */}
                  <div class="flex items-center border rounded overflow-hidden justify-between">
                    <button class="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100" onClick={() => {
                      if (item?.qty > 1) {
                        updateCart(item?.product_id, item?.qty - 1, item?.id);
                      }
                    }}>-</button>
                    <span class="px-4 py-1 text-base">{item?.qty}</span>
                    <button class="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100" onClick={() => updateCart(item?.product_id, item?.qty+1, item?.id)}>+</button>
                  </div>

                  {/* <!-- Delete Icon --> */}
                  <button class="text-gray-500 hover:text-red-600 lg:!mr-5 my-3">
                    <img className="h-5 w-5" src="./assets/delte_icon.png" alt="Delete" />
                  </button>

                  {/* <!-- Total Price --> */}
                  <div class="text-lg font-semibold lg:text-right">₹{(item?.product_price * item?.qty).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">
          <p className="text-lg">Your cart is empty</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      )}

      {/* Subtotal Section */}

      <div className="grid lg:grid-cols-1 gap-2">
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
          <div className="rounded-lg w-full max-w-sm ml-auto mt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">Subtotal</span>
              <span className="text-2xl font-bold">₹{cartTotal.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Tax included and shipping calculated at checkout
            </p>
            <button className="px-4 py-2 border rounded-full bg-black text-white w-full mt-0" onClick={() => {
              const user_id = localStorage.getItem('user_id');
              if (user_id) {
                navigate('/checkout');
              } else {
                navigate('/login');
              }
            }}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
