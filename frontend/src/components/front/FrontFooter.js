import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosIntance from '../axios';

const FrontFooter = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axiosIntance.post(`/front/save_subscribe`, {email: email});
    // console.log('res: ', res);
    if (res.status === 200) {
      setTimeout(() => {
        location.reload()
      }, 2000);
    }
  }
  return (
    <>
      <div className='!bg-[#ffe9d9] font-[poppins]'>
        <footer className="default-width text-red-600 px-0 pt-10">
          {/* <!-- Newsletter Subscription --> */}
          <div className="mb-10 xl:grid xl:grid-cols-2 2xl:grid 2xl:grid-cols-2 lg:grid lg:grid-cols-2 block gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Subscribe to our Newsletter</h1>
            </div>
            <div>
              <form className="flex justify-center mx-auto border-2 border-red-500 rounded-md" onSubmit={(e) => handleSubmit(e)}>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-2 rounded-l-md focus:outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="px-4 py-2 rounded-r-md">
                  →
                </button>
              </form>
            </div>
          </div>
          <div className="mt-10 xl:grid xl:grid-cols-3 2xl:grid 2xl:grid-cols-3 lg:grid lg:grid-cols-3 block gap-4">
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
              <div className='flex gap-4 mt-4'>
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
                  <h3 className="!text-xl !font-bold mb-2 uppercase">Know Us</h3>
                  <ul className="list-none p-0 mt-3">
                    <li className="mb-2">
                      <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Our Story</NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink to="/contact" className="!text-red-600 hover:text-red-800 !no-underline">Contact Us</NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Locate Us</NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Blog</NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Media</NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Careers</NavLink>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="!text-xl !font-bold mb-2 uppercase">Need Help</h3>
                  <ul className="list-none p-0 mt-3">
                    <li className="mb-2">
                      <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">FAQ</NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink to="/cancellation-and-refund-policy" className="!text-red-600 hover:text-red-800 !no-underline">Cancellation and Refund</NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink to="/privacy-policy" className="!text-red-600 hover:text-red-800 !no-underline">Privacy Policy</NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink to="/terms-and-conditions" className="!text-red-600 hover:text-red-800 !no-underline">Terms and Conditions</NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Customer Grievance</NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Sitemap</NavLink>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="!text-xl !font-bold mb-2 uppercase">More Info</h3>
                  <ul className="list-none p-0 mt-3">
                    <li className="mb-2">
                      <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Corporate Cakes</NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Coupons & Offers</NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink to="#" className="!text-red-600 hover:text-red-800 !no-underline">Download App</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <div className="text-center py-3 w-full bg-[#fbd6db] font-[poppins]">
        <p className="text-sm text-red-600 mb-0">
          &copy; {currentYear} Bookmycake Pvt Ltd | U15146DL2021PTC389546 | 10823005001700
        </p>
      </div>
    </>
  );
};

export default FrontFooter;