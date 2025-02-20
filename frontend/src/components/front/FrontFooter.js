
import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'

const FrontFooter = () => {


  return (
    <>
      <footer id="footer" className="bg-rose-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <NavLink to="/" className="flex items-center mb-4 text-white ">
                <span className="text-xl font-bold no-underline">BookMyCake</span>
              </NavLink>
              <div className="text-sm">
                <p>Bookmycake Private Limited Gehlot farms,</p>
                <p>(Opp 521) Sector 47 Gurgaon Haryana-122001</p>
                <p className="mt-3"><strong>Phone:</strong> <span>+91 99900-26799</span></p>
                <p><strong>Email:</strong> <span>Hello@bookmycake.co</span></p>
              </div>
              <NavLink to={'/'}>
                <span className="flex items-center mt-4 cursor-pointer">
                  <img src='/assets/logo.jpg' alt="Logo" className="h-20 max-w-min" />
                </span>
              </NavLink>
            </div>

            <div className="w-full md:w-1/4 lg:w-1/4 px-4 mb-8">
              <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
              <ul className="text-sm space-y-2 !p-0">
                <li className='!leading-6'><a href="#" className="text-white !no-underline">Search</a></li>
                <li className='!leading-6'><a href="#" className="text-white !no-underline">Contact Us</a></li>
                <li className='!leading-6'><a href="#" className="text-white !no-underline">Locate Us</a></li>
                <li className='!leading-6'><a href="#" className="text-white !no-underline">Terms and Conditions</a></li>
                <li className='!leading-6'><a href="#" className="text-white !no-underline">Cancellation and Refunds</a></li>
                <li className='!leading-6'><a href="#" className="text-white !no-underline">Track Order</a></li>
              </ul>
            </div>

            <div className="w-full md:w-1/4 lg:w-1/4 px-4 mb-8">
              <h4 className="text-lg font-semibold mb-4">Heading</h4>
              <ul className="text-sm space-y-2 !p-0">
                <li><p>Call / Whatsapp us on 99900-26799 for any queries or to get quote for designer cakes,</p></li>
                <li><p>Whatsapp us the image<br/> Email : Hello@bookmycake.co</p></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center mt-8">
          <p>© <span>Copyright</span> <strong className="px-1">BookMyCake</strong> <span>All Rights Reserved</span></p>
        </div>
      </footer>
      <a href="#" id="scroll-top" className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700">
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  
   )
}

export default FrontFooter
