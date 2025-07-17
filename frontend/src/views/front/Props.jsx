import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cilCheckAlt, cilPlus } from '@coreui/icons';
import CIcon from "@coreui/icons-react";
import Spinner from "../../components/front/Spinner";
import { addTocartProp, getCart, getProps } from "../../redux/actions/front/cart.actions";
import { useDispatch, useSelector } from "react-redux";

export default function Props() {
  const [activeCategory, setActiveCategory] = useState();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartitems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (cart?.get_cart) {
      dispatch(getCart());
    } else {
      setCartitems(cart?.cart_data?.filter(item => item.type === 'prop') || []);
    }
    if (cart?.get_props) {
      dispatch(getProps());
    } else {
      setActiveCategory(cart?.prop_categories[0]?.id);
    }
  }, [cart?.get_cart, cart?.get_props]);

  const addProp = (prop_id) => {
    const prop = cart?.props.find((p) => p.id === prop_id);

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

  const saveCartItems = () => {
    const user_id = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : localStorage.getItem('guest_user_id');
    dispatch(addTocartProp({ cartItems, user_id }))

    setTimeout(() => {
      navigate('/cart');
    }, 1000);

  }

  return (
    <div className="default-width mt-4 font-[poppins]">
      <h2 className="text-2xl sm:text-3xl font-bold text-center">
        Add More Fun To Celebration.....
      </h2>

      <div>
        <p>Width: {screenSize.width}</p>
        <p>Height: {screenSize.height}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 mt-4">
        {cart?.prop_categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setActiveCategory(category?.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category?.id
              ? "bg-[#910f3f] text-white"
              : "border border-orange-400 text-[#910f3f]"
              }`}
          >
            {category?.category_name}
          </button>
        ))}
      </div>
      <div className="xl:flex lg:flex md:block sm:block">
        <div className="2xl:w-1/4 xl:w-1/4 md:w-full sm:w-full rwd-laptop-left border-r-2 border-gray-200 sm:block max-h-[50vh] overflow-y-auto p-2">
          <p className="text-black font-semibold text-lg">Selected Product</p>
          <div class="w-[100%] bg-white border-2 border-gray-200 rounded-md p-2 flex items-center space-x-6 mb-2">
            {/* <!-- Cake Image --> */}
            <img src="products/4.jpg" alt="Purple Flowers Cake"
              class="w-20 h-20 object-cover rounded-lg shadow-md" />

            {/* <!-- Cake Info --> */}
            <div class="flex-1">
              <p class="!text-md font-semibold text-gray-800 mb-0">Purple Flowers square Cake</p>
              <p class="text-md text-gray-900 font-bold mt-2 mb-0">$200.00</p>

              {/* <!-- Details --> */}
              <div class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span class="font-semibold text-gray-800">Flavour</span><br />
                  Pineapple
                </div>
                <div>
                  <span class="font-semibold text-gray-800">Weight</span><br />
                  2 Kgs
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="2xl:w-3/4 xl:w-3/4 md:w-full sm:w-full rwd-laptop-right">
          <div className="p-4 sm:p-6 font-[poppins]">
            <div className="flex justify-center">
              <div className="w-full max-w-7xl">
                {loading ? (
                  <Spinner />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                    {cart?.props?.length > 0 && cart?.props.filter((p) => p.prop_cat_id == activeCategory)?.map((product, index) => (
                      <div key={`${product.prop_name}-${index}`}
                        className="bg-white shadow rounded-xl overflow-hidden text-center p-4 flex flex-col justify-between h-[22rem]">
                        <img src={import.meta.env.VITE_APIBASE_URL + product.prop_image} alt={product.prop_name}
                          className="w-full h-40 sm:h-48 object-cover mb-3 rounded-lg" />
                        <h6 className="text-md font-semibold">{product.prop_name}</h6>
                        <div className="flex mt-3 items-center justify-between">
                          <p className="text-lg font-bold text-gray-800">₹{product.price}</p>
                          {cartItems.some(item => item.product_id == product.id) ? (
                            <button className="bg-green-500 text-white rounded-full p-2 text-lg p-2" onClick={() => deleteProp(product.id)}>
                              <CIcon icon={cilCheckAlt} size="l" className="w-5 h-5" />
                            </button>
                          ) : (
                            <button className="bg-[#910f3f] hover:bg-[#57132c] text-white rounded-full p-2 text-lg" onClick={() => addProp(product.id)}>
                              <CIcon icon={cilPlus} size="l" className="w-5 h-5" />
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
        </div>
      </div>
    </div>
  );
}
