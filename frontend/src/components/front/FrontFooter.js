import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const FrontFooter = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  return (
    <div className='mt-5 bg-orange-100 font-[poppins]'>
      <footer class="default-width text-red-600 px-0 py-10">
        {/* <!-- Newsletter Subscription --> */}
        <div class="mb-10 xl:grid xl:grid-cols-2 2xl:grid 2xl:grid-cols-2 lg:grid lg:grid-cols-2 block gap-4">
          <div>
            <h1 class="text-2xl font-bold mb-2">Subscribe to our Newsletter</h1>
          </div>
          <div>
            <form class="flex justify-center mx-auto border-2 border-red-500 rounded-md">
              <input
                type="email"
                placeholder="Enter Email Address"
                class="w-full px-4 py-2 rounded-l-md focus:outline-none"
              />
              <button type="submit" class="px-4 py-2 rounded-r-md">
                →
              </button>
            </form>
          </div>
        </div>
        <div class="mt-10 xl:grid xl:grid-cols-3 2xl:grid 2xl:grid-cols-3 lg:grid lg:grid-cols-3 block gap-4">
          <div>
            <div>
              <NavLink to="/" className="flex items-center mb-0 text-white ">
                <span className="text-xl font-bold no-underline"><img
                  alt=""
                  src="/assets/logo.png"
                  className="h-full w-full"
                /></span>
              </NavLink>
            </div>
            <p class="text-lg mt-3">&copy; {currentYear}</p>
            <div className='flex gap-4'>
              <div>
                <NavLink to={"https://www.facebook.com/BookMyCakeIN"} target="_blank">
                  <img
                    alt=""
                    src="/assets/images/icons/facebook.png"
                    className="h-full w-full"
                  />
                </NavLink>
              </div>
              <div>
                <NavLink to={"https://www.instagram.com/bookmycake_official/"} target="_blank">
                  <img
                    alt=""
                    src="/assets/images/icons/instagram.png"
                    className="h-full w-full"
                  />
                </NavLink>
              </div>
            </div>
          </div>
          <div className='col-span-2'>
            <div className='grid grid-cols-3 gap-4'>
              <div>
                <h3 class="!text-xl !font-bold mb-2 uppercase">Know Us</h3>
                <ul class="list-none p-0 mt-3">
                  <li class="mb-2">
                    <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Our Story</NavLink>
                  </li>
                  <li class="mb-2">
                    <NavLink to="/contact" className="!text-red-600 hover:text-red-800 !no-underline">Contact Us</NavLink>
                  </li>
                  <li class="mb-2">
                    <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Locate Us</NavLink>
                  </li>
                  <li class="mb-2">
                    <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Blog</NavLink>
                  </li>
                  <li class="mb-2">
                    <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Media</NavLink>
                  </li>
                  <li class="mb-2">
                    <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Careers</NavLink>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="!text-xl !font-bold mb-2 uppercase">Need Help</h3>
                <ul class="list-none p-0 mt-3">
                  <li class="mb-2">
                    <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">FAQ</NavLink>
                  </li>
                  <li class="mb-2">
                    <NavLink to="/cancellation-and-refund-policy" className="!text-red-600 hover:text-red-800 !no-underline">Cancellation and Refund</NavLink>
                  </li>
                  <li class="mb-2">
                    <NavLink to="/privacy-policy" className="!text-red-600 hover:text-red-800 !no-underline">Privacy Policy</NavLink>
                  </li>
                  <li class="mb-2">
                    <NavLink to="/terms-and-conditions" className="!text-red-600 hover:text-red-800 !no-underline">Terms and Conditions</NavLink>
                  </li>
                  <li class="mb-2">
                    <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Customer Grievance</NavLink>
                  </li>
                  <li class="mb-2">
                    <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Sitemap</NavLink>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="!text-xl !font-bold mb-2 uppercase">More Info</h3>
                <ul class="list-none p-0 mt-3">
                  <li class="mb-2">
                    <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Corporate Cakes</NavLink>
                  </li>
                  <li class="mb-2">
                    <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Coupons & Offers</NavLink>
                  </li>
                  <li class="mb-2">
                    <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Download App</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FrontFooter;