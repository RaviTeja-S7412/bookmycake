import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/front/Spinner";
import { deleteCart, getCart, updateCart } from "../../redux/actions/front/cart.actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axiosIntance from "../../components/axios";
import Modal from "../../components/Modal";
import { cartConstants } from "../../redux/actions/constants";

export default function Cart() {

  const [cartTotal, setCarttotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showAddress, setShowaddress] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentmethod] = useState('cod');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [shippingAddress, setShippingaddress] = useState({
    full_name: "",
    mobile_number: "",
    country: "",
    state: "",
    house_no: "",
    area: "",
    city: "",
    pincode: "",
    billingSameAsShipping: false,
    billing_full_name: "",
    billing_mobile_number: "",
    billing_country: "",
    billing_state: "",
    billing_house_no: "",
    billing_area: "",
    billing_city: "",
    billing_pincode: "",
    id: "" // This will hold the selected address ID
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    /* if (!shippingAddress.full_name) newErrors.full_name = true;
    if (!/^\d{10}$/.test(shippingAddress.mobile_number)) newErrors.mobile_number = true;
    if (!shippingAddress.country) newErrors.country = true;
    if (!shippingAddress.state) newErrors.billing_state = true;
    if (!shippingAddress.house_no) newErrors.house_no = true;
    if (!shippingAddress.area) newErrors.area = true;
    if (!shippingAddress.city) newErrors.city = true;
    if (!/^\d{6}$/.test(shippingAddress.pincode)) newErrors.pincode = true; */

    if (!shippingAddress.billingSameAsShipping) {
      if (!shippingAddress.billing_full_name) newErrors.billing_full_name = true;
      if (!/^\d{10}$/.test(shippingAddress.billing_mobile_number)) newErrors.billing_mobile_number = true;
      if (!shippingAddress.billing_country) newErrors.billing_country = true;
      if (!shippingAddress.billing_state) newErrors.billing_state = true;
      if (!shippingAddress.billing_house_no) newErrors.billing_house_no = true;
      if (!shippingAddress.billing_area) newErrors.billing_area = true;
      if (!shippingAddress.billing_city) newErrors.billing_city = true;
      if (!/^\d{6}$/.test(shippingAddress.billing_pincode)) newErrors.billing_pincode = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const update_cart = async (product_id, qty, id) => {
    const user_id = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : localStorage.getItem('guest_user_id');
    dispatch(updateCart({ user_id, product_id, qty, id }))
  };

  const delete_cart = (id) => {
    dispatch(deleteCart(id));
  }

  useEffect(() => {
    if (cart?.get_cart) {
      dispatch(getCart());
    } else {
      setCarttotal(cart?.cart_data?.reduce((total, item) => {
        return total + (item.product_price * item.qty);
      }, 0));
    }
  }, [cart?.get_cart]);

  const insertOrder = async () => {
    setLoading(true);

    const params = {
      user_id: localStorage.getItem("user_id"),
      payment_type: paymentMethod,
      address: shippingAddress
    };
    try {
      const res = await axiosIntance.post(`/front/insertOrder`, params);

      if (res.status === 200) {
        dispatch({ type: cartConstants.GET_CART_REQUEST })
        if (paymentMethod == 'cod') {
          navigate('/order-status/' + res.data.order_id);
        } else {

        }
        // updateStatus(res.data.order_id);
        // Swal.fire({
        //   title: res.data.message
        // })
      } else {
        Swal.fire({
          title: res.data.message,
          icon: 'error',
          confirmButtonText: 'Ok'
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
      status: "success"
    };

    try {
      const res = await axiosIntance.post(`/front/updatePaymentStatus`, params);

      if (res.status === 200) {
        // Swal.fire({
        //   title: res.data.message
        // })
        navigate('/order-status');
      } else {
        // Swal.fire({
        //   title: res.data.message
        // })
        navigate('/order-status');
      }
    } catch (error) {
    } finally {
    }
  };

  const makePayment = async () => {

    const rand = Math.floor(1000000000 + Math.random() * 9000000000); // 10 digit random number
    const params = {
      orderId: 'order_' + rand,
      orderAmount: 100,
      customerDetails: {
        customer_id: 'cust_001',
        customer_email: 'test@example.com',
        customer_phone: '9999999999'
      }
    }
    const res = await axiosIntance.post(`/front/cashfreepay`, params);
    console.log('res: ', res);

    if (res.data.success) {

      const cashfree = Cashfree({
        mode: "production",
      });

      let checkoutOptions = {
        paymentSessionId: res.data.payment_session_id,
        redirectTarget: "_self",
      };
      cashfree.checkout(checkoutOptions);

    } else {
      alert("Failed to create order");
    }
  };

  const addAddress = () => {
    setShowModal(!showModal);
    setShippingaddress({
      full_name: "",
      mobile_number: "",
      country: "",
      state: "",
      house_no: "",
      area: "",
      city: "",
      pincode: "",
      billingSameAsShipping: false,
      billing_full_name: "",
      billing_mobile_number: "",
      billing_country: "",
      billing_state: "",
      billing_house_no: "",
      billing_area: "",
      billing_city: "",
      billing_pincode: "",
      id: "" // This will hold the selected address ID
    });
    setErrors({});
  }

  const saveAddress = async () => {
    
    // setLoading(true);
    const user_id = localStorage.getItem('user_id');  
    const params = {
      user_id: user_id,
      full_name: shippingAddress.full_name,
      mobile_number: shippingAddress.mobile_number,
      country: shippingAddress.country,
      state: shippingAddress.state,
      house_no: shippingAddress.house_no,
      area: shippingAddress.area, 
      city: shippingAddress.city,
      pincode: shippingAddress.pincode
    }

    try {
      const res = await axiosIntance.post(`/front/save_user_address`, params);

      if (res.status === 200) {
        dispatch(getCart());
        addAddress();
      } else {
        Swal.fire({
          title: res.data.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    } catch (error) {
      // console.error('Error fetching product:', error);
      // Handle API error
    } finally {
      setLoading(false);
    }
  }


  const inputClass = field => `border rounded px-3 py-2 ${errors[field] ? "!border-red-500" : "border-gray-300"}`;
  const user_id = localStorage.getItem('user_id');

  return (
    loading ? <Spinner /> : cart?.cart_data?.length > 0 ? (
      <div className="default-width px-6 py-10 bg-white font-[poppins]">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Your Cart</h2>
          <button className="px-4 py-2 border rounded-full bg-[#bc4d5e] text-white mt-0" onClick={() => navigate('/')}>
            Continue shopping
          </button>
        </div>
<div className="xl:flex lg:flex block w-full">
          <div className="xl:w-3/5 lg:w-full w-full">
            {user_id && (
              <div className="grid lg:grid-cols-1 gap-2 mb-6">
                <div className="w-full max-w-5xl mx-auto border p-6">
                  <h3 className="text-lg font-semibold mb-4">Select Shipping Address</h3>
                  {Array.isArray(cart?.user_addresses) && cart.user_addresses.length > 0 ? (
                    <div className="mb-4">
                      <div className="grid lg:grid-cols-3 gap-3 mb-6">
                        {cart.user_addresses.map((addr, idx) => (
                          <div className="border px-2 py-3 shadow-sm">
                            <label key={addr.id} className="flex items-start mb-2 cursor-pointer">
                              <input
                                type="radio"
                                name="selectedAddress"
                                className="mt-1 mr-3"
                                checked={shippingAddress?.id === addr.id}
                                onChange={() => setShippingaddress({ ...shippingAddress, id: addr.id })}
                              />
                              <div>
                                <div className="font-semibold">{addr.full_name} {addr.mobile_number && <span className="text-xs text-gray-500 ml-2">{addr.mobile_number}</span>}</div>
                                <div className="text-sm text-gray-700">
                                  {addr.house_no}, {addr.area}, {addr.city}, {addr.billing_state}, {addr.pincode}, {addr.country}
                                </div>
                                {addr.default && (
                                  <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded mt-1">Default</span>
                                )}
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                      <button
                        className="mt-2 px-3 py-1 border rounded bg-blue-500 text-white text-sm"
                        onClick={() => addAddress()}
                      >
                        + Add New Address
                      </button>
                      <div className="flex items-center mt-4">
                        <input
                          type="checkbox"
                          id="billingSame"
                          className="mr-2"
                          checked={shippingAddress.billingSameAsShipping || false}
                          onChange={e => setShippingaddress({ ...shippingAddress, billingSameAsShipping: e.target.checked })}
                        />
                        <label htmlFor="billingSame" className="text-sm ml-1">Billing address is same as shipping address</label>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <p className="text-gray-500 mb-2">No saved addresses found.</p>
                      <button
                        className="px-3 py-1 border rounded bg-blue-500 text-white text-sm"
                        onClick={() => addAddress()}
                      >
                        + Add New Address
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="xl:w-2/5 lg:w-full w-full bg-green-300 p-2">Mogili</div>
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
