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
          <button className="text-sm text-gray-600 hover:underline" onClick={() => navigate('/')}>
            Continue shopping
          </button>
        </div>
        {/* <button onClick={() => makePayment()}>Pay</button> */}

        {cart?.cart_data?.map((item, index) => (
          <div className="grid lg:grid-cols-1 gap-2" key={index}>
            <div className="p-2 rounded-lg">
              <div className="w-full max-w-5xl mx-auto border p-4 sm:flex items-center justify-between">
                {/* <!-- Product Details --> */}
                <div className="lg:flex items-start space-x-4 w-2/3">
                  <img src={item?.type === "product" ? import.meta.env.VITE_APIBASE_URL + item?.product_data?.product_image : import.meta.env.VITE_APIBASE_URL + item?.product_data?.prop_image} alt={item?.type === "product" ? item?.product_data?.product_name : item?.product_data?.prop_name} className={"w-24 h-24 object-cover rounded-md border"} />
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
                <div className="sm:flex items-center space-x-6 sm:w-1/3 justify-end">
                  {/* <!-- Quantity Control --> */}
                  <div className="flex items-center border rounded overflow-hidden justify-between">
                    <button className="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100" onClick={() => {
                      if (item?.qty > 1) {
                        update_cart(item?.product_id, item?.qty - 1, item?.id);
                      }
                    }}>-</button>
                    <span className="px-4 py-1 text-base">{item?.qty}</span>
                    <button className="px-3 py-1 text-lg font-semibold text-gray-700 hover:bg-gray-100" onClick={() => update_cart(item?.product_id, item?.qty + 1, item?.id)}>+</button>
                  </div>

                  {/* <!-- Delete Icon --> */}
                  <button className="text-gray-500 hover:text-red-600 lg:!mr-5 my-3" onClick={() => delete_cart(item?.id)}>
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

        <Modal isOpen={showModal} onClose={() => {
            addAddress();
        }} className="modal-dialog modal-lg">
            <>
              <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
              <form onSubmit={e => {
                  e.preventDefault();
                  saveAddress()
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    className={'border rounded px-3 py-2'}
                    placeholder="Full Name"
                    value={shippingAddress.full_name || ""}
                    onChange={e => {
                      setShippingaddress({ ...shippingAddress, full_name: e.target.value })
                    }}
                    required
                  />
                  <input
                    type="text"
                    className={'border rounded px-3 py-2'}
                    placeholder="Mobile Number"
                    value={shippingAddress.mobile_number || ""}
                    onChange={e => {
                      setShippingaddress({ ...shippingAddress, mobile_number: e.target.value });
                    }}
                    required
                    maxLength={10}
                  />
                  <select
                    className={'border rounded px-3 py-2'}
                    value={shippingAddress.country || ""}
                    onChange={e => {setShippingaddress({ ...shippingAddress, country: e.target.value });}}
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Singapore">Singapore</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                    <option value="Brazil">Brazil</option>
                    <option value="South Africa">South Africa</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Italy">Italy</option>
                    <option value="Spain">Spain</option>
                    <option value="Russia">Russia</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Switzerland">Switzerland</option>
                    {/* Add more countries as needed */}
                  </select>
                  <select
                    className={'border rounded px-3 py-2'}
                    value={shippingAddress.state || ""}
                    onChange={e => {setShippingaddress({ ...shippingAddress, state: e.target.value });}}
                    required
                  >
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                  </select>
                  <input
                    type="text"
                    className={'border rounded px-3 py-2'}
                    placeholder="Flat, House no., Building, Company, Apartment"
                    value={shippingAddress.house_no || ""}
                    onChange={e => {setShippingaddress({ ...shippingAddress, house_no: e.target.value });}}
                    required
                  />
                  <input
                    type="text"
                    className={'border rounded px-3 py-2'}
                    placeholder="Area, Street, Sector, Village"
                    value={shippingAddress.area || ""}
                    onChange={e => {setShippingaddress({ ...shippingAddress, area: e.target.value });}}
                    required
                  />
                  <input
                    type="text"
                    className="border rounded px-3 py-2"
                    placeholder="Landmark"
                    value={shippingAddress.landmark || ""}
                    onChange={e => setShippingaddress({ ...shippingAddress, landmark: e.target.value })}
                  />
                  <input
                    type="text"
                    className={'border rounded px-3 py-2'}
                    placeholder="City"
                    value={shippingAddress.city || ""}
                    onChange={e => {setShippingaddress({ ...shippingAddress, city: e.target.value });}}
                    required
                  />
                  <input
                    type="text"
                    className={'border rounded px-3 py-2'}
                    placeholder="Pincode"
                    value={shippingAddress.pincode || ""}
                    onChange={e => {setShippingaddress({ ...shippingAddress, pincode: e.target.value });}}
                    required
                    maxLength={6}
                  />
                </div>
                <div className="flex items-center mt-4">
                    <button
                      type="submit"
                      className="px-3 py-1 border rounded bg-blue-500 text-white text-sm mr-2"
                    >
                      Save Address
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 border rounded bg-gray-300 text-gray-700 text-sm ml-2"
                      onClick={() => addAddress()}
                    >
                      Cancel
                    </button>
                </div>
              </form>
            </>
        </Modal>
        
        {user_id && (
          <div className="grid lg:grid-cols-1 gap-2 mb-6">
            <div className="w-full max-w-5xl mx-auto border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Select Shipping Address</h3>
              {Array.isArray(cart?.user_addresses) && cart.user_addresses.length > 0 ? (
                <div className="mb-4">
                  <div className="grid lg:grid-cols-3 gap-2 mb-6">
                    {cart.user_addresses.map((addr, idx) => (
                      <label key={addr.id} className="flex items-start mb-2 cursor-pointer">
                        <input
                          type="radio"
                          name="selectedAddress"
                          className="mt-1 mr-3"
                          checked={shippingAddress?.id === addr.id}
                          onChange={() => setShippingaddress({...shippingAddress, id: addr.id})}
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
        <div className="grid lg:grid-cols-1 gap-2 mb-6">
          {user_id && (
            <div className="w-full max-w-5xl mx-auto border rounded-lg p-6">
              {!shippingAddress.billingSameAsShipping && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">Billing Address</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      className={inputClass("billing_full_name")}
                      placeholder="Full Name"
                      value={shippingAddress.billing_full_name || ""}
                      onChange={e => {setShippingaddress({ ...shippingAddress, billing_full_name: e.target.value }); validate();}}
                      required
                    />
                    <input
                      type="text"
                      className={inputClass("billing_mobile_number")}
                      placeholder="Mobile Number"
                      value={shippingAddress.billing_mobile_number || ""}
                      onChange={e => {setShippingaddress({ ...shippingAddress, billing_mobile_number: e.target.value }); validate();}}
                      required
                      maxLength={10}
                    />
                    <select
                      className={inputClass("billing_country")}
                      value={shippingAddress.billing_country || ""}
                      onChange={e => {setShippingaddress({ ...shippingAddress, billing_country: e.target.value }); validate();}}
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Canada">Canada</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Singapore">Singapore</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Japan">Japan</option>
                      <option value="China">China</option>
                      <option value="Brazil">Brazil</option>
                      <option value="South Africa">South Africa</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Italy">Italy</option>
                      <option value="Spain">Spain</option>
                      <option value="Russia">Russia</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Switzerland">Switzerland</option>
                      {/* Add more countries as needed */}
                    </select>
                    <select
                      className={inputClass("billing_state")}
                      value={shippingAddress.billing_state || ""}
                      onChange={e => {setShippingaddress({ ...shippingAddress, billing_state: e.target.value }); validate();}}
                      required
                    >
                      <option value="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                      <option value="Ladakh">Ladakh</option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Puducherry">Puducherry</option>
                    </select>
                    <input
                      type="text"
                      className={inputClass("billing_house_no")}
                      placeholder="Flat, House no., Building, Company, Apartment"
                      value={shippingAddress.billing_house_no || ""}
                      onChange={e => {setShippingaddress({ ...shippingAddress, billing_house_no: e.target.value }); validate();}}
                      required
                    />
                    <input
                      type="text"
                      className={inputClass("billing_area")}
                      placeholder="Area, Street, Sector, Village"
                      value={shippingAddress.billing_area || ""}
                      onChange={e => {setShippingaddress({ ...shippingAddress, billing_area: e.target.value }); validate();}}
                      required
                    />
                    <input
                      type="text"
                      className="border rounded px-3 py-2"
                      placeholder="Landmark"
                      value={shippingAddress.billing_landmark || ""}
                      onChange={e => setShippingaddress({ ...shippingAddress, billing_landmark: e.target.value })}
                    />
                    <input
                      type="text"
                      className={inputClass("billing_city")}
                      placeholder="City"
                      value={shippingAddress.billing_city || ""}
                      onChange={e => {setShippingaddress({ ...shippingAddress, billing_city: e.target.value }); validate();}}
                      required
                    />
                    <input
                      type="text"
                      className={inputClass("billing_pincode")}
                      placeholder="Pincode"
                      value={shippingAddress.billing_pincode || ""}
                      onChange={e => {setShippingaddress({ ...shippingAddress, billing_pincode: e.target.value }); validate();}}
                      required
                      maxLength={6}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
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
                <div className="mb-4">
                  <label className="flex items-center mb-2 mr-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      className="mr-2"
                      disabled={true}
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentmethod('online')}
                    />
                    <span className="ml-1">Pay Online</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      className="mr-2"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentmethod('cod')}
                    />
                    <span className="ml-1">Cash on Delivery (COD)</span>
                  </label>
                </div>
                <button type="submit" className="px-4 py-2 border rounded-full bg-black text-white w-full mt-0" onClick={() => {
                  
                  if (user_id) {
                    if (validate()) {
                      insertOrder();
                    }else{
                      Swal.fire({
                        title: 'Error!',
                        text: 'Please fill all required fields',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                      });
                    }
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
