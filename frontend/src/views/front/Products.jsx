import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import Products from "../../Data/Products"
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosIntance from "../../components/axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
  export default function AllProducts() {

    const navigate = useNavigate();
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
    
    const [availability, setAvailability] = useState([
      { name: 'In Stock', value: 'in-stock', current: false },
      { name: 'Out Of Stock', value: 'out-of-stock', current: false },
    ]);

    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
   
    const getProducts = async (sort_by = '', availability_by = '') => {
      setLoading(true);
   
        const params = {
          "sort_by": sort_by,
          "availability_by" : availability_by,
        }

        const res = await axiosIntance.get(`/admin/get_filterproducts`,{ params });
        
        if (res.status === 200) {
          setProducts(res?.data?.products)
        } else {
          
        }
     
    }

    useEffect(() => {
      getProducts(sortOptions?.find((option) => option.current)?.value);
    }, []);

    // console.log(products);
    

    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 !py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h3 className="text-lg font-medium text-gray-900">All Products</h3>
          <div className="items-baseline justify-between border-b border-gray-200 pt-10 pb-6">
            <div className="flex items-center grid grid-cols-3 gap-x-4 gap-y-2">
              <div className="flex text-left col-span-2 gap-x-5"> 
                <Menu as="div" className="">
                  <div>
                    <MenuButton className="group inline-flex justify-center font-medium text-sm text-gray-700 hover:text-gray-900">
                      Filter: <span className="w-26 text-right font-normal">Availability</span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 mt-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute ml-2 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <div className="py-1">
                      {availability.map((option) => (
                        <MenuItem key={option.name}>
                          <a
                            href={option.href}
                            className={classNames(
                              option.current ? 'font-medium !text-gray-900' : '!text-gray-500',
                              'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden !no-underline',
                            )}
                            onClick={() => {
                              setAvailability(availability.map((item) => ({ ...item, current: item.name === option.name })));
                              getProducts(sortOptions?.find((option) => option.current)?.value, option.value);
                            }}
                          >
                            {option.name}
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>
                <Menu as="div" className="">
                  <div>
                    <MenuButton className="group inline-flex justify-center font-normal text-sm text-gray-700 hover:text-gray-900">
                      Price
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 mt-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute z-10 mt-2 w-80 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <p className="text-sm font-medium text-gray-900 p-2">The Highest Price Is 1000 </p>
                    <hr />
                    <div className="py-1 flex gap-2 p-2">
                      <div className="">
                        <label className="text-sm font-medium text-gray-900">Min Price</label>
                        <input type="number" value={minPrice || ''} onChange={(e) => setMinPrice(e.target.value)} className="border border-gray-300 rounded-md w-full p-1" />
                      </div>
                      <div className="">
                        <label className="text-sm font-medium text-gray-900">Max Price</label>
                        <input type="number" value={maxPrice || ''} onChange={(e) => setMaxPrice(e.target.value)} className="border border-gray-300 rounded-md w-full p-1" />
                      </div>
                    </div>
                  </MenuItems>
                </Menu>
              </div>        
              <div className="relative inline-block">      
                <Menu as="div" className="">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort By:<span className="w-36 text-right font-normal"> {sortOptions.find((option) => option.current).name}</span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 mt-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute ml-10 z-10 mt-2 w-46 rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <a
                            href={option.href}
                            className={classNames(
                              option.current ? 'font-medium !text-gray-900' : '!text-gray-500',
                              'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden !no-underline',
                            )}
                            onClick={() => {
                              setSortOptions(sortOptions.map((item) => ({ ...item, current: item.name === option.name })));
                              getProducts(option?.value, availability?.find((option) => option.current)?.value);
                            }}
                          >
                            {option.name}
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>
                <div className="absolute inset-y-0 right-0 text-right">
                  {products?.length} Products
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => {
                // Parse the product_size JSON to get available sizes
                const productSizes = JSON.parse(product.product_size);

                // Find the size with the minimum kg value (smallest size)
                const startingSize = productSizes.reduce((min, size) => {
                  return parseFloat(size.kg) < parseFloat(min.kg) ? size : min;
                });
                return (
                  <div key={product.id} className="group relative shadow-md rounded-lg overflow-hidden group-hover:shadow-lg" onClick={() => navigate('/products/'+product.route)}>
                    <img
                      alt={product.imageAlt}
                      src={import.meta.env.VITE_APIBASE_URL + product.product_image}
                      className="aspect-square w-full bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                    />
                    <div className="mt-4 flex justify-between p-2">
                      <div>
                        <p className="text-md">
                          <a href={'javascript:void(0)'} className="!text-gray-900 font-medium !no-underline">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.product_name}
                          </a>
                        </p>
                        {/* <p className="mt-1 text-gray-500">{product.flavour}</p> */}
                      </div>
                      {/* Display the price of the smallest size */}
                      <p className="font-medium !text-gray-900">₹ {startingSize.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
      </div>
    )
  }
  