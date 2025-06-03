import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosIntance from "../../components/axios";
import { cilCheckAlt, cilPlus } from '@coreui/icons';
import CIcon from "@coreui/icons-react";
import Spinner from "../../components/front/Spinner";

export default function Props() {
  const [activeCategory, setActiveCategory] = useState();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [props, setProps] = useState([]);
  const [cartItems, setCartitems] = useState([]);
  const navigate = useNavigate();

  const getProps = async () => {
    setLoading(true);
    try {
      const res = await axiosIntance.get(`/admin/getProps`);

      if (res.status === 200) {
        // Fetch cart items first, then set props and categories
        await getcartitems();
        setProps(res.data.props);
        setCategories(res.data.categories);
        // Set active category only if categories exist
        if (res.data.categories && res.data.categories.length > 0) {
          setActiveCategory(res.data.categories[0]?.id);
        }
      }
    } catch (error) {
      // console.error('Error fetching product:', error);
      // Handle API error
    } finally {
      setLoading(false);
    }
  };
  
  const getcartitems = async () => {
    try {
      const user_id = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : localStorage.getItem('guest_user_id');
      const res = await axiosIntance.post(`/admin/getcartitems`, { user_id });

      if (res.status === 200) {
        setCartitems(res.data.cart_data?.filter(item => item.type === 'prop') || []);
      }
    } catch (error) {
      // console.error('Error fetching product:', error);
      // Handle API error
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getProps();
  }, []);

  const addProp = (prop_id) => {
    const prop = props.find((p) => p.id === prop_id);
    
    // Check if the product is already in the cart
    const exists = cartItems.some(item => item.product_id === prop.id);
    if (exists) return;

    const cartItem = {
      product_id: prop.id,
      user_id: localStorage.getItem('user_id') ? localStorage.getItem('user_id') : localStorage.getItem('guest_user_id'),
      product_price: prop.price,
      qty: 1,
      type: 'prop',
      user_type: localStorage.getItem('user_type') ? 'user' : 'guest',
    };
    setCartitems([...cartItems, cartItem]);

  }
  
  const deleteProp = (prop_id) => {
    const cart = cartItems.filter(item => item.product_id != prop_id);
    setCartitems(cart);
  }

  const saveCartItems = async () => {
    try {
      const res = await axiosIntance.post('/admin/addprop', { cartItems, user_id: localStorage.getItem('user_id') ? localStorage.getItem('user_id') : localStorage.getItem('guest_user_id') });
      if (res.status === 200) {
        setTimeout(() => {
          navigate('/cart');  
        }, 2000);
      }
    } catch (error) {
      console.error('Error saving cart items:', error);
      // Handle API error
    }
  }

  return (
      <div className="p-4 sm:p-6 bg-pink-50 min-h-screen font-[poppins]">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
              Add More Fun To Celebration.....
          </h2>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 mt-4">
              {categories.map((category) => (
                  <button
                      key={category?.id}
                      onClick={() => setActiveCategory(category?.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          activeCategory === category?.id
                              ? "bg-[#910f3f] text-white"
                              : "border border-orange-400 text-[#910f3f]"
                      }`}
                  >
                      {category?.category_name}
                  </button>
              ))}
          </div>

          <div className="flex justify-center">
              <div className="w-full max-w-7xl">
                {loading ? (
                  <Spinner />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {props?.length > 0 && props.filter((p) => p.prop_cat_id == activeCategory)?.map((product, index) => (
                          <div key={`${product.prop_name}-${index}`}
                              className="bg-white shadow rounded-xl overflow-hidden text-center p-4 flex flex-col justify-between h-[22rem]">
                              <img src={import.meta.env.VITE_APIBASE_URL + product.prop_image} alt={product.prop_name}
                                  className="w-full h-40 sm:h-48 object-cover mb-3 rounded-lg"/>
                              <h6 className="text-md font-semibold">{product.prop_name}</h6>
                              <div className="flex mt-3 items-center justify-between">
                                  <p className="text-lg font-bold text-gray-800">₹{product.price}</p>
                                  {cartItems.some(item => item.product_id == product.id) ? (
                                      <button className="bg-green-500 text-white rounded-full p-2 text-lg p-2"  onClick={() => deleteProp(product.id)}>
                                          <CIcon icon={cilCheckAlt} size="l" className="w-5 h-5"/>
                                      </button>
                                  ) : (
                                    <button className="bg-[#910f3f] hover:bg-[#57132c] text-white rounded-full p-2 text-lg" onClick={() => addProp(product.id)}>
                                        <CIcon icon={cilPlus} size="l" className="w-5 h-5"/>
                                    </button>
                                  )}
                              </div>
                          </div>
                      ))}
                  </div>
                )}
              </div>
          </div>

          {/* Footer Actions */}
        <div className="flex justify-center gap-8 my-5">
          <button className="text-gray-600 underline" onClick={() => navigate('/cart')}>Skip</button>
          <button className="bg-[#910f3f] text-white px-6 py-2 rounded-md font-medium hover:bg-[#57132c]" onClick={() => saveCartItems()}>
            Continue
          </button>
        </div>
      </div>
  );
}
