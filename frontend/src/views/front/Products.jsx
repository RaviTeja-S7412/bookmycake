import { useEffect, useState } from 'react';
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosIntance from "../../components/axios";

export default function Products() {

  const navigate = useNavigate();
  const { category_id, sub_category_id } = useParams();

  const [showPrice, setShowPrice] = useState(true);
  const [showFlavor, setShowFlavor] = useState(true);
  const [showWeight, setShowWeight] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flavors, setFlavors] = useState([]);
  const [weights, setWeights] = useState([]);

  const [sortOptions, setSortOptions] = useState([
    { name: 'Featured', value: 'latest', current: true },
    { name: 'Best selling', value: 'best-selling', current: false },
    { name: 'Alphabetically, A-Z', value: 'alpha_asc', current: false },
    { name: 'Alphabetically, Z-A', value: 'alpha_desc', current: false },
    { name: 'Price, low to high', value: 'price_asc', current: false },
    { name: 'Price, high to low', value: 'price_desc', current: false },
    { name: 'Date, old to new', value: 'date_asc', current: false },
    { name: 'Date, new to old', value: 'date_desc', current: false },
  ]);

  const filters = [
    {
      name: "Jungle theme",
      price: "₹1,499",
      delivery: "Tomorrow",
    },
    {
      name: "Jungle theme pink Cake",
      price: "₹1,699",
      delivery: "Tomorrow",
    },
  ];

  const getProducts = async (sort_by='') => {
    setLoading(true);
  
    const params = {
      "sort_by": sort_by,
      // "availability_by" : availability_by,
    }
    if(sub_category_id){
      params.sub_category_id = sub_category_id;
    }else if(category_id){
      params.category_id = category_id;
    }

    const res = await axiosIntance.get(`/admin/get_filterproducts`,{ params });
    
    if (res.status === 200) {
      setProducts(res?.data?.products)
      setFlavors(res?.data?.flavors)
      setWeights(res?.data?.weights)
    } else {
      
    }
    
  }

  useEffect(() => {
    getProducts(sortOptions?.find((option) => option.current)?.value);
  }, [category_id, sub_category_id]);

  return (
    <div className="default-width font-[Poppins]">
      <h2 className="text-3xl poppins-bold my-3 py-2">Products</h2>

      <div className="flex flex-wrap md:flex-nowrap">

        {/* Sidebar Filters */}
        <div className="md:w-1/4 p-4 bg-[#910f3f] mb-6 md:mb-0 text-white" style={{ height: 'fit-content' }}>
          {/* Price */}
          <div onClick={() => setShowPrice(!showPrice)} className="flex justify-between items-center cursor-pointer mb-1">
            <h6 className="poppins-semibold mb-0">Price</h6>
            <img src="/icons/uparrow-white.png" alt="arrow"
              className={`transition-transform duration-300 ${showPrice ? 'rotate-0' : 'rotate-180'}`} />
          </div>

          {showPrice && (
            <div className="grid grid-cols-2 gap-4 mb-2 text-black">
              <input type="text" placeholder="From" className="border bg-white px-2 py-1 mt-1" />
              <input type="text" placeholder="To" className="border bg-white px-2 py-1 mt-1" />
            </div>
          )}
          <hr />

          {/* Flavor */}
          <div onClick={() => setShowFlavor(!showFlavor)} className="flex justify-between items-center cursor-pointer mt-3">
            <h6 className="poppins-semibold mb-0">Flavor</h6>
            <img src="/icons/uparrow-white.png" alt="arrow"
              className={`transition-transform duration-300 ${showFlavor ? 'rotate-0' : 'rotate-180'}`} />
          </div>
          {showFlavor && (
            <>
              <div className="checkbox-wrapper">
                {flavors?.length > 0 ? (
                  flavors.map((flavor, index) => (
                    <label for={`cbk1-${index}`} key={index}>
                      <input type="checkbox" id={`cbk1-${index}`} />
                        <span className="cbx">
                          <svg width="12px" height="11px" viewBox="0 0 12 11">
                            <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
                          </svg>
                        </span>
                        <span>{flavor}</span>
                    </label>
                  ))
                ) : 'No flavors available'}
              </div>
            </>
          )}
          <hr />

          {/* Weight */}
          <div onClick={() => setShowWeight(!showWeight)} className="flex justify-between items-center cursor-pointer mt-3">
            <h6 className="poppins-semibold mb-0">Weight</h6>
            <img src="/icons/uparrow-white.png" alt="arrow"
              className={`transition-transform duration-300 ${showWeight ? 'rotate-0' : 'rotate-180'}`} />
          </div>
          {showWeight && (
            <div className="checkbox-wrapper">
              {weights?.length > 0 ? (
                  weights?.sort((a, b) => a - b)?.map((weight, index) => (
                    <label for="cbk1-8">
                      <input type="checkbox" id="cbk1-8" />
                        <span className="cbx">
                          <svg width="12px" height="11px" viewBox="0 0 12 11">
                            <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
                          </svg>
                        </span>
                        <span>{weight/1000+ ' Kg'}</span>
                    </label>
                  ))
                ) : 'No weights available'}
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="md:w-3/4 md:pl-6">
          <div className="flex justify-between items-center mb-4 bg-[#910f3f] p-2 sm:p-4 text-white">
            <p className="poppins-semibold mb-0">{products?.length} products</p>
            <div>
              <label className="mr-2 font-medium text-sm">Sort by:</label>
              <select className="border rounded py-1 px-2 bg-white text-black" 
                onChange={(e) => {
                  setSortOptions(sortOptions.map((item) => ({ ...item, current: item.value === e.target.value })));
                  getProducts(e.target.value);
                }}
              >
                {sortOptions.map((option) => (
                  <option value={option?.value} key={option?.value}>{option?.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => {
              var startingSize = product.product_options?.sort((a, b) => a.price - b.price)?.[0];
            return(
              <div key={index} className="bg-white shadow-md overflow-hidden">
                <img src={import.meta.env.VITE_APIBASE_URL + product.product_image} alt={product.product_image} className="w-full h-auto object-cover  cursor-pointer"  onClick={() => navigate('/products/'+product.route)} />
                <div className="p-2">
                  <h6 className="text-lg poppins-semibold cursor-pointer" onClick={() => navigate('/products/'+product.route)}>{product.product_name}</h6>
                  {/* <p className="text-sm text-gray-600 mb-1">
                    Earliest delivery: <span className="font-sm poppins-semibold">{cake.delivery}</span>
                  </p> */}

                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg poppins-bold mb-0">₹ {startingSize?.price}</p>
                    <div className="flex items-center">
                      {[...Array(4)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-300 ms-1" fill="currentColor" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />  
                        </svg>
                      ))}
                      <svg className="w-4 h-4 ms-1 text-gray-300" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <span className="ml-2 text-gray-600 text-sm">({3})</span>
                    </div>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>

      </div>
    </div>
  );
}
