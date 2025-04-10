import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import axiosIntance from "../../components/axios";

export default function ProductSingle() {

  const { product_id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [expanded, setExpanded] = useState({
    faq1: false,
    faq2: false,
    faq3: false,
  });

  const handleToggle = (faq) => {
    setExpanded((prevState) => ({
      ...prevState,
      [faq]: !prevState[faq]
    }));
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
        setSelectedSize(JSON.parse(fetchedProduct?.product_size)?.[0]); 
        setSelectedFlavor(fetchedProduct?.product_flavor?.[0]); 
        
      } else {
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      // Handle API error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product_id) {
      get_singleproductroute();
    }
  }, [product_id]);

  // If product is loading or doesn't exist, show loading state or an error message
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const productImages = [
    { src: product.product_image, alt: product.product_name }
  ];

  const sizes = JSON.parse(product.product_size); // Assuming the size data is in a JSON string
  console.log('sizes: ', sizes);
  const flavors = JSON.parse(product.product_flavor); // Assuming the flavor data is in a JSON string
  console.log('flavors: ', flavors);

  const getPrice = () => {
    return selectedSize ? `Rs. ${selectedSize.price}` : 'Rs. 0';
  };
  

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 !py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8 grid sm:grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8">
        <div className="mx-auto mt-6">
          <img
            alt={productImages[0].alt}
            src={import.meta.env.VITE_APIBASE_URL + product.product_image}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Product info */}
        <div className="mx-auto px-4 pt-10 pb-16 sm:px-6 gap-x-8 px-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.product_name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            {/* <p className="text-3xl tracking-tight text-gray-900">{`Rs. ${sizes[0].price}`}</p> */}
            <p className="text-3xl tracking-tight text-gray-900">{getPrice()}</p>


            <form className="mt-10">
              {/* Size */}
              <div>
                <h5 className="font-medium text-gray-900">Size</h5>
                <fieldset aria-label="Choose a size" className="mt-2">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-3 sm:grid-cols-8 lg:grid-cols-5"
                  >
                    {sizes.map((size) => (
                      <Radio
                        key={size.kg}
                        value={size}
                        className={`group relative flex items-center justify-center rounded-md border px-2 py-2 text-sm font-medium uppercase sm:flex-1 sm:py-6 ${size.price ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                      >
                        <span>{`${size.kg} KG`}</span>
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

                {/* Flavor */}
                {flavors.length > 0 && (
                  <div className="mb-3">
                    <h5 className="font-medium text-gray-900 mt-3">Flavor</h5>
                    <fieldset aria-label="Choose a flavor" className="mt-2">
                      <RadioGroup
                        value={selectedFlavor}
                        onChange={setSelectedFlavor}
                        className="grid grid-cols-4 gap-3 sm:grid-cols-8 lg:grid-cols-5"
                      >
                        {flavors.map((flavor, index) => (
                          <Radio
                            key={index}
                            value={flavor}
                            className="group relative flex items-center justify-center rounded-md border px-2 py-2 text-sm font-medium uppercase sm:flex-1 sm:py-6 cursor-pointer"
                          >
                            <span>{flavor}</span>
                          </Radio>
                        ))}
                      </RadioGroup>
                    </fieldset>
                  </div>
                )}




              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
              >
                Add to cart Get 20% off
              </button>
            </form>
          </div>

          <div className="py-10 border-r border-gray-200 pt-6 pr-8 pb-16">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.product_description}</p>
              </div>
            </div>

            <div className="mt-10">
              <div className="relative font-inter antialiased">
                <main className="relative flex flex-col justify-center overflow-hidden">
                  <div className="w-full max-w-2xl mx-auto">
                    {/* Accordion component */}
                    <div className="divide-y divide-slate-200">
                      {/* Ingredients */}
                      <div className="py-2">
                        <h5>
                          <button
                            id="faqs-title-01"
                            type="button"
                            className="flex items-center justify-between w-full text-left font-semibold py-2"
                            onClick={() => handleToggle('faq1')}
                            aria-expanded={expanded.faq1}
                            aria-controls="faqs-text-01"
                          >
                            <span>Ingredients</span>
                            <svg
                              className="fill-indigo-500 shrink-0 ml-8"
                              width="16"
                              height="16"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                className={`transform origin-center transition duration-200 ease-out ${expanded.faq1 ? '!rotate-180' : ''}`}
                              />
                              <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                className={`transform origin-center rotate-90 transition duration-200 ease-out ${expanded.faq1 ? '!rotate-180' : ''}`}
                              />
                            </svg>
                          </button>
                        </h5>
                        <div
                          id="faqs-text-01"
                          role="region"
                          aria-labelledby="faqs-title-01"
                          className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${expanded.faq1 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                        >
                          <div className="overflow-hidden">
                            <p className="pb-3">{product.ingredients || 'No ingredients listed.'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Nutritional Info */}
                      <div className="py-2">
                        <h5>
                          <button
                            id="faqs-title-02"
                            type="button"
                            className="flex items-center justify-between w-full text-left font-semibold py-2"
                            onClick={() => handleToggle('faq2')}
                            aria-expanded={expanded.faq2}
                            aria-controls="faqs-text-02"
                          >
                            <span>Nutritional Info</span>
                            <svg
                              className="fill-indigo-500 shrink-0 ml-8"
                              width="16"
                              height="16"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                className={`transform origin-center transition duration-200 ease-out ${expanded.faq2 ? '!rotate-180' : ''}`}
                              />
                              <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                className={`transform origin-center rotate-90 transition duration-200 ease-out ${expanded.faq2 ? '!rotate-180' : ''}`}
                              />
                            </svg>
                          </button>
                        </h5>
                        <div
                          id="faqs-text-02"
                          role="region"
                          aria-labelledby="faqs-title-02"
                          className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${expanded.faq2 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                        >
                          <div className="overflow-hidden">
                            <p className="pb-3">{product.nutritional_info || 'No nutritional info available.'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Shipping */}
                      <div className="py-2">
                        <h5>
                          <button
                            id="faqs-title-03"
                            type="button"
                            className="flex items-center justify-between w-full text-left font-semibold py-2"
                            onClick={() => handleToggle('faq3')}
                            aria-expanded={expanded.faq3}
                            aria-controls="faqs-text-03"
                          >
                            <span>Shipping</span>
                            <svg
                              className="fill-indigo-500 shrink-0 ml-8"
                              width="16"
                              height="16"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                className={`transform origin-center transition duration-200 ease-out ${expanded.faq3 ? '!rotate-180' : ''}`}
                              />
                              <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                className={`transform origin-center rotate-90 transition duration-200 ease-out ${expanded.faq3 ? '!rotate-180' : ''}`}
                              />
                            </svg>
                          </button>
                        </h5>
                        <div
                          id="faqs-text-03"
                          role="region"
                          aria-labelledby="faqs-title-03"
                          className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${expanded.faq3 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                        >
                          <div className="overflow-hidden">
                            <p className="pb-3">{product.shipping || 'No shipping info available.'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
