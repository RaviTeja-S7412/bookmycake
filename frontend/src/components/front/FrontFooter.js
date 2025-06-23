import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const FrontFooter = () => {
  const navigate = useNavigate();
  return (
    <div className='mt-5 bg-white'>
      <footer className="w-[90%] m-auto text-black py-8 font-[poppins]">
        <div className='grid lg:grid-cols-3 gap-4'>
          <div>
            <NavLink to="/" className="flex items-center mb-4 text-white ">
              <span className="text-xl font-bold no-underline"><img
                alt=""
                src="/assets/logo.jpg"
                className="h-full w-full"
              /></span>
            </NavLink>
          </div>
          <div>
            <h5>Quick Links</h5>
            <ul className='text-sm leading-10'>
              <li onClick={() => navigate('/contact')} className='cursor-pointer'>Contact us</li>
              <li onClick={() => navigate('/terms-and-conditions')} className='cursor-pointer'>Terms and Conditions</li>
              <li onClick={() => navigate('/cancellation-and-refund-policy')} className='cursor-pointer'>Cancellation and Refunds</li>
              <li>Track Order</li>
            </ul>
          </div>
          <div>
            <h5>Contact Us</h5>
            <ul className='text-sm leading-10'>
              <li>Call / Whatsapp us on 99900-26799</li>
              <li>Email : info@bookmycake.co</li>
            </ul>
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
        </div>
        <div className='w-full text-center py-3'>
          © 2025, Bookmycake
        </div>
      </footer>
    </div>
  );
};

export default FrontFooter;