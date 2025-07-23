import { useEffect, useState } from 'react';
import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axiosIntance from "../../components/axios";
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import Pagination from '../../components/front/Pagination';
import Spinner from '../../components/front/Spinner';
import CIcon from '@coreui/icons-react'
import { cilBookmark } from '@coreui/icons'

export default function Products() {

  const navigate = useNavigate();
  const { category_id, sub_category_id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [showPrice, setShowPrice] = useState(true);
  const [showFlavor, setShowFlavor] = useState(true);
  const [showWeight, setShowWeight] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flavors, setFlavors] = useState([]);
  const [selectedFlavors, setselectedFlavors] = useState([]);
  const [weights, setWeights] = useState([]);
  const [selectedWeights, setselectedWeights] = useState([]);
  const [minPrice, setMinprice] = useState(0);
  const [maxPrice, setMaxprice] = useState(0);
  const [highestPrice, setHighestprice] = useState(0);
  const [filter, setFilter] = useState(false);
  const [totalProducts, setTotalproducts] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsperpage] = useState(12);

  const [sortOptions, setSortOptions] = useState([
    { name: 'Featured', value: 'latest', current: true },
    { name: 'Best selling', value: 'best-selling', current: false },
    { name: 'Alphabetically, A-Z', value: 'alpha_asc', current: false },
    { name: 'Alphabetically, Z-A', value: 'alpha_desc', current: false },
    // { name: 'Price, low to high', value: 'price_asc', current: false },
    // { name: 'Price, high to low', value: 'price_desc', current: false },
    { name: 'Date, old to new', value: 'date_asc', current: false },
    { name: 'Date, new to old', value: 'date_desc', current: false },
  ]);


  const getProducts = async (sort_by = '', search = '', min_price = '', max_price = '', selected_flavors = [], selected_weights = []) => {
    setLoading(true);
    const params = {
      "sort_by": sort_by,
      "search": search,
      "limit": itemsPerPage,
      "page": currentPage
    }

    if (min_price && max_price) {
      params.min_price = Number(min_price);
      params.max_price = Number(max_price);
    }

    if (selected_flavors.length > 0) {
      params.flavors = selected_flavors;
    }

    if (selected_weights.length > 0) {
      params.weights = selected_weights;
    }

    if (sub_category_id) {
      params.sub_category_id = sub_category_id;
    } else if (category_id) {
      params.category_id = category_id;
    }
    params.customer_type = localStorage?.getItem('user_type') ? localStorage?.getItem('user_type') : 'retail';

    const res = await axiosIntance.get(`/admin/get_filterproducts`, { params });

    if (res.status === 200) {
      setProducts(res?.data?.products)
      setFlavors(res?.data?.flavors)
      setWeights(res?.data?.weights)
      setHighestprice(res?.data?.highestPrice);
      setTotalproducts(res?.data?.total);
      setItemsperpage(res?.data?.limit);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {
    const search = searchParams.get('search') || "";
    getProducts(sortOptions?.find((option) => option.current)?.value, search);
  }, [category_id, sub_category_id, searchParams?.get('search'), currentPage]);

  const filterProducts = () => {
    const min_price = minPrice ? Number(minPrice) : Number(0);
    const max_price = maxPrice ? Number(maxPrice) : Number(highestPrice);
    const selected_flavors = selectedFlavors.length > 0 ? selectedFlavors : [];
    const selected_weights = selectedWeights.length > 0 ? selectedWeights : [];
    const search = searchParams.get('search');
    getProducts(sortOptions?.find((option) => option.current)?.value, search, min_price, max_price, selected_flavors, selected_weights);
  }

  useEffect(() => {
    if (filter) {
      filterProducts();
      setFilter(false);
    }
  }, [filter]);

  const handleFlavorchange = (flavor) => {
    if (selectedFlavors.includes(flavor)) {
      setselectedFlavors(selectedFlavors.filter((item) => item !== flavor));
    } else {
      setselectedFlavors([...selectedFlavors, flavor]);
    }
    setFilter(true);
  };

  const handleWeightchange = (weight) => {
    if (selectedWeights.includes(Number(weight))) {
      setselectedWeights(selectedWeights.filter((item) => Number(item) !== Number(weight)));
    } else {
      setselectedWeights([...selectedWeights, Number(weight)]);
    }
    setFilter(true);
  };

  return (
    <div className="default-width font-[Poppins]">
      <nav className="flex mt-3 p-1" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a href='javascript:void(0)' onClick={() => navigate(`/`)} className="inline-flex !no-underline items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white text-black">
              <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </a>
          </li>
          {category_id && (
            <li>
              <div className="flex items-center">
                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>
                <a href='javascript:void(0)' onClick={() => navigate(`/collections/${category_id}`)} className="!no-underline ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white  text-black">{category_id
                  .split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}</a>
              </div>
            </li>
          )}
          {sub_category_id && (
            <li>
              <div className="flex items-center">
                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>
                <a href='javascript:void(0)' onClick={() => navigate(`/collections/${category_id}/${sub}`)} className="!no-underline ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">{sub_category_id}</a>
              </div>
            </li>
          )}
        </ol>
      </nav>

      <div className="flex flex-wrap md:flex-nowrap">
        {/* Sidebar Filters */}
        <div className="md:w-1/4 p-4 bg-[#ed1016] mb-6 md:mb-0 text-white" style={{ height: 'fit-content' }}>
          {/* Price */}
          <div onClick={() => setShowPrice(!showPrice)} className="flex justify-between items-center cursor-pointer mb-1">
            <h6 className="poppins-semibold mb-0">Price</h6>
            <ChevronDownIcon className={`size-6 text-white transition-transform duration-300 ${showPrice ? 'rotate-180' : 'rotate-0'}`} />
          </div>

          {showPrice && (
            <div className="grid grid-cols-2 gap-4 mb-2 text-black">
              <input type="number" placeholder="From" onChange={(e) => {
                setMinprice(e.target.value)
                setFilter(true);
              }} className="border bg-white px-2 py-1 mt-1" />
              <input type="number" placeholder="To" onChange={(e) => {
                setMaxprice(e.target.value)
                setFilter(true);
              }} className="border bg-white px-2 py-1 mt-1" />
            </div>
          )}
          <hr />

          {/* Flavor */}
          <div onClick={() => setShowFlavor(!showFlavor)} className="flex justify-between items-center cursor-pointer mt-3">
            <h6 className="poppins-semibold mb-0">Flavor</h6>
            <ChevronDownIcon className={`size-6 text-white transition-transform duration-300 ${showPrice ? 'rotate-180' : 'rotate-0'}`} />
          </div>
          {showFlavor && (
            <>
              <div className="checkbox-wrapper">
                {flavors?.length > 0 ? (
                  flavors.map((flavor, index) => (
                    <label for={`cbk1-${index}`} key={index}>
                      <input type="checkbox" id={`cbk1-${index}`} onChange={(e) => handleFlavorchange(e.target.value)} value={flavor} checked={selectedFlavors.includes(flavor)} />
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
            <ChevronDownIcon className={`size-6 text-white transition-transform duration-300 ${showPrice ? 'rotate-180' : 'rotate-0'}`} />
          </div>
          {showWeight && (
            <div className="checkbox-wrapper">
              {weights?.length > 0 ? (
                weights?.sort((a, b) => a - b)?.map((weight, index) => (
                  <label for={`cbk-${index}`} key={'w' + index}>
                    <input type="checkbox" id={`cbk-${index}`} onChange={(e) => handleWeightchange(e.target.value)} value={weight} checked={selectedWeights.includes(weight)} />
                    <span className="cbx">
                      <svg width="12px" height="11px" viewBox="0 0 12 11">
                        <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
                      </svg>
                    </span>
                    <span>{weight / 1000 + ' Kg'}</span>
                  </label>
                ))
              ) : 'No weights available'}
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="md:w-3/4 md:pl-6">
          <div className="flex justify-between items-center mb-4 bg-[#ed1016] p-2 sm:p-4 text-white">
            <p className="poppins-semibold mb-0">{totalProducts} products</p>
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
          <div className={`grid grid-cols-1 sm:grid-cols-${loading ? '1' : '2'} lg:grid-cols-${loading ? '1' : '4'} gap-6`}>
            {/* Image loading state for each product */}
            {/*
              We'll use an array of booleans, one for each product, to track image loading.
            */}
            {(() => {
              const [imgLoadedArr, setImgLoadedArr] = useState([]);

              // Reset image loaded state when products change
              useEffect(() => {
                setImgLoadedArr(Array(products.length).fill(false));
              }, [products.length]);
              if (loading) {
                return (
                  <div className="mx-auto w-full max-w-sm text-center">
                    <Spinner />
                  </div>
                )
              }

              return products.map((product, index) => {
                var startingSize = product?.product_options && JSON.parse(product.product_options)?.sort((a, b) => a.price - b.price)?.[0];
                const imgLoaded = imgLoadedArr[index] || false;

                const handleImgLoad = () => {
                  setImgLoadedArr((prev) => {
                    const updated = [...prev];
                    updated[index] = true;
                    return updated;
                  });
                };

                return (
                  loading ? <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
                    <div className="animate-pulse">
                      <div className="flex mb-4 rounded-sm dark:bg-gray-700">
                        <svg width="300" height="220" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
                          <text x="30" y="80" className="svg-text">BookMyCake</text>
                        </svg>
                      </div>
                    </div>
                  </div> :
                    <div key={index} className="shadow-md p-2 bg-white ">
                      <div className="relative feature-img rounded-lg overflow-hidden cursor-pointer">
                        {!imgLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10 min-h-[220px]">
                            <svg className="animate-spin h-8 w-8 text-[#910f3f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                          </div>
                        )}
                        <div className="absolute top-2 left-2 z-10 w-[20px] h-[20px] border-2 border-green-500 bg-white flex items-center justify-center">
                          <span className="inline-block w-[10px] h-[10px] bg-[#3DA66E] rounded-full"></span>
                        </div>
                        <img
                          src={import.meta.env.VITE_APIBASE_URL + product.product_image}
                          alt={product.product_image}
                          className={`w-full h-48 object-cover cursor-pointer max-h-[320px]`}
                          onClick={() => navigate('/products/' + product.route)}
                          onLoad={handleImgLoad}
                        />
                      </div>
                      <div className="relative">
                        <div className="feature-title cursor-pointer" onClick={() => navigate('/products/' + product.route)}>
                          <p className="font-semibold mt-2 mb-0">{product.product_name}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="font-medium mb-0">₹ {startingSize?.price}</p>
                          <div className="p-1 cursor-pointer">
                            <CIcon icon={cilBookmark} />
                          </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-yellow-500 text-sm">&#9733;</span>
                            {product?.ratings_count > 0 ?
                              <span className="text-gray-600 ml-1">{Number(product?.avg_rating).toFixed(0)} <small>({product?.ratings_count} {product?.ratings_count > 1 ? 'Reviews' : 'Review'})</small></span>
                              : <span className="text-gray-600 ml-1">No Reviews</span>
                            }
                          </div>
                      </div>
                    </div>

                )
              });
            })()}
          </div>
          {totalProducts > 0 ?
            <div className='align-content-center'>
              {totalProducts > itemsPerPage && <Pagination totalItems={totalProducts} itemsPerPage={itemsPerPage} setCurrPage={(page) => setCurrentPage(page)} />}
            </div>
            : !loading && <div className='text-center text-bold mt-20'>No Products Found</div>}
        </div>

      </div>
    </div>
  );
}
