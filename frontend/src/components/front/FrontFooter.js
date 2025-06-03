import React from 'react';
import { NavLink } from 'react-router-dom';

const FrontFooter = () => {
  return (
    <footer className="default-width text-black py-8 font-[poppins]">
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
            <li>Search</li>
            <li>Contact us</li>
            <li>Locate us</li>
            <li>Terms and Conditions</li>
            <li>Cancellation and Refunds</li>
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
  );
};

export default FrontFooter;