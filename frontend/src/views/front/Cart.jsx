import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/front/Spinner";
import { deleteCart, getCart, updateCart } from "../../redux/actions/front/cart.actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axiosIntance from "../../components/axios";

export default function Cart() {
  const [cartTotal, setCarttotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const update_cart = async (product_id, qty, id) => {
    const user_id = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : localStorage.getItem('guest_user_id');
    dispatch(updateCart({ user_id, product_id, qty, id }))
  };

  const delete_cart = (id) => {
    dispatch(deleteCart(id));
  }

  useEffect(() => {
    if(cart?.get_cart){
      dispatch(getCart());
    }else{
      setCarttotal(cart?.cart_data?.reduce((total, item) => {
        return total + (item.product_price * item.qty);
      }, 0));
    }
  }, [cart?.get_cart]);

  const insertOrder = async () => {
    setLoading(true);

    const params = {
      user_id: localStorage.getItem("user_id")
    };
   
    try {
      const res = await axiosIntance.post(`/front/insertOrder`, params);

      if (res.status === 200) {
        updateStatus(res.data.order_id);
        Swal.fire({
          title: res.data.message
        })
      } else {
        Swal.fire({
          title: res.data.message
        })
      }
    } catch (error) {
      // console.error('Error fetching product:', error);
      // Handle API error
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (order_id) => {

    const params = {
      user_id: localStorage.getItem("user_id"),
      order_id: order_id,
      status: "failed"
    };
   
    try {
      const res = await axiosIntance.post(`/front/updatePaymentStatus`, params);

      if (res.status === 200) {
        
        Swal.fire({
          title: res.data.message
        })
      } else {
        Swal.fire({
          title: res.data.message
        })
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    loading ? <Spinner /> : cart?.cart_data?.length > 0 ? (
      <div className="default-width px-6 py-10 bg-white font-[poppins]">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Your Cart</h2>
          <button className="text-sm text-gray-600 hover:underline" onClick={() => navigate('/')}>
            Continue shopping
          </button>
        </div>

        {cart?.cart_data?.map((item, index) => (
          <div className="grid lg:grid-cols-1 gap-2" key={index}>
            <div className="p-2 rounded-lg">
              <div className="w-full max-w-5xl mx-auto border p-4 flex items-center justify-between">
                {/* <!-- Product Details --> */}
                <div className="lg:flex items-start space-x-4 w-2/3">
                  <img src={item?.type === "product" ? import.meta.env.VITE_APIBASE_URL + item?.product_data?.product_image : import.meta.env.VITE_APIBASE_URL + item?.product_data?.prop_image} alt={item?.type === "product" ? item?.product_data?.product_name : item?.product_data?.prop_name} class={"w-24 h-24 object-cover rounded-md border"} />
                  <div>
                    <p className={`text-lg font-semibold mb-1 ${item?.type === "product" ? 'cursor-pointer' : ''}`} onClick={() => item?.type === "product" ? navigate('/products/' + item?.product_data?.route) : ''}>{item?.type === "product" ? item?.product_data?.product_name : item?.product_data?.prop_name}</p>
                    <p className="text-sm mb-1"><span className="font-semibold">Price:</span> ₹{item?.product_price}</p>
                    {item?.flavor && (<p className="text-sm mb-1"><span className="font-semibold">Flavor:</span> {item?.flavor}</p>)}
                    {item?.weight && (<p className="text-sm mb-1"><span className="font-semibold">Weight:</span> {item?.weight / 1000} Kg</p>)}
                    {item?.delivery_date !== "0000-00-00" && (<p className="text-sm mb-1"><span className="font-semibold">Delivery Date:</span> {new Date(item?.delivery_date).toLocaleDateString()}</p>)}
                    {item?.delivery_time && (<p className="text-sm mb-1"><span className="font-semibold">Delivery Time:</span> {item?.delivery_time}</p>)}
                    {item?.message && (<p className="text-sm mb-1"><span className="font-semibold">Message:</span> {item?.message}</p>)}
                    {/* {item?.area} */}
                  </div>
                </div>

                {/* <!-- Quantity & Total --> */}
                <div className="lg:flex items-center space-x-6 w-1/3 justify-end">
                  {/* <!-- Quantity Control --> */}
                  <div className="lg:flex items-center border rounded overflow-hidden">
                    <button className="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100" onClick={() => {
                      if (item?.qty > 1) {
                        update_cart(item?.product_id, item?.qty - 1, item?.id);
                      }
                    }}>-</button>
                    <span className="px-4 py-1 text-base">{item?.qty}</span>
                    <button className="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100" onClick={() => update_cart(item?.product_id, item?.qty + 1, item?.id)}>+</button>
                  </div>

                  {/* <!-- Delete Icon --> */}
                  <button className="text-gray-500 hover:text-red-600 lg:!mr-5" onClick={() => delete_cart(item?.id)}>
                    <img className="h-5 w-5" src="./assets/delte_icon.png" alt="Delete" />
                  </button>

                  {/* <!-- Total Price --> */}
                  <div className="text-lg font-semibold lg:text-right">₹{(item?.product_price * item?.qty).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        ))
        }

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
                  insertOrder();
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
    ) : (
      <div className="default-width px-6 py-10 bg-white font-[poppins] text-center text-gray-500">
        <p className="text-lg">Your cart is empty</p>
        <button className="mt-4 px-4 py-2 border rounded-full bg-black text-white" onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    )
  );
}
