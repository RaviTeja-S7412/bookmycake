import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import Products from "../../Data/Products"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import axiosIntance from "../../components/axios";

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductSingle() {

  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])

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


  const getSingleProduct = async () => {
    setLoading(true);
 
      const params = {
        "id": sort_by
      }

      const res = await axiosIntance.post(`/admin/get_filterproducts`, params);
      console.log('res: ', res);
      

      if (res.status === 200) {
        // setProducts(res?.data?.products)
      } else {
        
      }
   
  }

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 !py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8 grid sm:grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8">
        <div className="mx-auto mt-6">
          <img
            alt={product.images[0].alt}
            src={product.images[0].src}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Product info */}
        <div className="mx-auto px-4 pt-10 pb-16 sm:px-6 gap-x-8 px-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{'Elsa Frozen Cake'}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{'Rs. 650.00'}</p>

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
                    {product.sizes.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={classNames(
                          size.inStock
                            ? 'cursor-pointer bg-white text-gray-900 shadow-xs'
                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                          'group relative flex items-center justify-center rounded-md border px-2 py-2 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6',
                        )}
                      >
                        <span>{'0.5 KG'}</span>
                        {size.inStock ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-indigo-500 group-data-focus:border"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0 size-full stroke-2 text-gray-200"
                            >
                              <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                            </svg>
                          </span>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              {/* Flavor */}
              <div className="mb-3">
                <h5 className="font-medium text-gray-900 mt-3">Flavor</h5>
                <fieldset aria-label="Choose a size" className="mt-2">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-3 sm:grid-cols-8 lg:grid-cols-5"
                  >
                    {product.sizes.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={classNames(
                          size.inStock
                            ? 'cursor-pointer bg-white text-gray-900 shadow-xs'
                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                          'group relative flex items-center justify-center rounded-md border px-2 py-2 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6',
                        )}
                      >
                        <span>{'0.5 KG'}</span>
                        {size.inStock ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-indigo-500 group-data-focus:border"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0 size-full stroke-2 text-gray-200"
                            >
                              <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                            </svg>
                          </span>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

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
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              
            <div className="relative font-inter antialiased">
              <main className="relative flex flex-col justify-center overflow-hidden">
                <div className="w-full max-w-2xl mx-auto">
                  {/* Accordion component */}
                  <div className="divide-y divide-slate-200">
                    {/* Accordion item 1 */}
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
                              className={`transform origin-center transition duration-200 ease-out ${
                                expanded.faq1 ? '!rotate-180' : ''
                              }`}
                            />
                            <rect
                              y="7"
                              width="16"
                              height="2"
                              rx="1"
                              className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                                expanded.faq1 ? '!rotate-180' : ''
                              }`}
                            />
                          </svg>
                        </button>
                      </h5>
                      <div
                        id="faqs-text-01"
                        role="region"
                        aria-labelledby="faqs-title-01"
                        className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
                          expanded.faq1 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-3">
                            If you go over your organisations or user limit, a member of the team will reach out about
                            bespoke pricing. In the meantime, our collaborative features won't appear in accounts or users
                            that are over the 100-account or 1,000-user limit.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Accordion item 2 */}
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
                              className={`transform origin-center transition duration-200 ease-out ${
                                expanded.faq2 ? '!rotate-180' : ''
                              }`}
                            />
                            <rect
                              y="7"
                              width="16"
                              height="2"
                              rx="1"
                              className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                                expanded.faq2 ? '!rotate-180' : ''
                              }`}
                            />
                          </svg>
                        </button>
                      </h5>
                      <div
                        id="faqs-text-02"
                        role="region"
                        aria-labelledby="faqs-title-02"
                        className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
                          expanded.faq2 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-3">
                            If you go over your organisations or user limit, a member of the team will reach out about
                            bespoke pricing. In the meantime, our collaborative features won't appear in accounts or users
                            that are over the 100-account or 1,000-user limit.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Accordion item 3 */}
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
                              className={`transform origin-center transition duration-200 ease-out ${
                                expanded.faq3 ? '!rotate-180' : ''
                              }`}
                            />
                            <rect
                              y="7"
                              width="16"
                              height="2"
                              rx="1"
                              className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                                expanded.faq3 ? '!rotate-180' : ''
                              }`}
                            />
                          </svg>
                        </button>
                      </h5>
                      <div
                        id="faqs-text-03"
                        role="region"
                        aria-labelledby="faqs-title-03"
                        className={`grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
                          expanded.faq3 ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-3">
                            If you go over your organisations or user limit, a member of the team will reach out about
                            bespoke pricing. In the meantime, our collaborative features won't appear in accounts or users
                            that are over the 100-account or 1,000-user limit.
                          </p>
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
  )
}
