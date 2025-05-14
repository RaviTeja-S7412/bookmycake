import React from 'react';
import { NavLink } from 'react-router-dom';

const FrontFooter = () => {
  return (
    <footer className="text-black py-8">
      <div className="default-width font-[poppins]">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Section 1: BookMyCake Logo & Copyright */}
          <div className="md:col-span-1">
            <NavLink to="/" className="flex items-center mb-4 text-white ">
              <span className="text-xl font-bold no-underline"><img
                alt=""
                src="/assets/logo.jpg"
                className="h-full w-full"
              /></span>
            </NavLink>
            <div className="text-sm">
              <p>© 2023</p> {/* As seen in the image */}
              <div className="mt-1">
                {/* <h6 className="font-semibold mb-2">Show Us Some Love  & Connect with us</h6> */}
                <span className="mr-2">Show us some love & Connect with us</span>
                <div className='flex'>
                  <a href="#" className="mr-1"><img src="/icons/facebook.png" alt="Facebook" className="h-5 w-5" /></a>
                  <a href="#" className="mr-1"><img src="/icons/instagram.png" alt="Instagram" className="h-5 w-5" /></a>
                  <a href="#" className="mr-1"><img src="/icons/youtube.png" alt="Youtube" className="h-5 w-5" /></a>
                  <a href="#" className="mr-1"><img src="/icons/linkedin.png" alt="linkedin" className="h-5 w-5" /></a>
                  <a href="#" className="mr-1"><img src="/icons/twitter.png" alt="twitter" className="h-5 w-5" /></a>
                  <a href="#" className="mr-1"><img src="/icons/pinterest.png" alt="pinterest" className="h-5 w-5" /></a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Know Us */}
          <div>
            <h6 className="font-semibold mb-2">Know Us</h6>
            <ul className="text-sm space-y-2 !p-0">
              <li className='!leading-6'><a href="#" className="text-black !no-underline">Our Story</a></li>
              <li className='!leading-6'><a href="#" className="text-black !no-underline">Contact Us</a></li>
              <li className='!leading-6'><a href="#" className="text-black !no-underline">Locate Us</a></li>
              <li className='!leading-6'><a href="#" className="text-black !no-underline">Blog</a></li>
              <li className='!leading-6'><a href="#" className="text-black !no-underline">Media</a></li>
              <li className='!leading-6'><a href="#" className="text-black !no-underline">Careers</a></li>
            </ul>
          </div>

          {/* Section 4: Need Help */}
          <div>
            <h6 className="font-semibold mb-2">Need Help</h6>
            <ul className="text-sm space-y-2 !p-0">
              <li className='!leading-6'><a href="#" className="text-black !no-underline">FAQ</a></li>
              <li className='!leading-6'><a href="#" className="text-black !no-underline">Cancellation and Returns</a></li>
              <li className='!leading-6'><a href="#" className="text-black !no-underline">Privacy Policy</a></li>
              <li className='!leading-6'><a href="#" className="text-black !no-underline">Terms and Conditions</a></li>
              <li className='!leading-6'><a href="#" className="text-black !no-underline">Customer Reviews</a></li>
              <li className='!leading-6'><a href="#" className="text-black !no-underline">Sitemap</a></li>
            </ul>
          </div>

          {/* Section 5: More Info */}
          <div>
            <h6 className="font-semibold mb-2">More Info</h6>
            <ul className="text-sm space-y-2 !p-0">
              <li className='!leading-6'><a href="#" className="text-black !no-underline">Corporate Cakes</a></li>
              <li className='!leading-6'><a href="#" className="text-black !no-underline">Franchise & Offers</a></li>
              <li className='!leading-6'><a href="#" className="text-black !no-underline">Download App</a></li>
            </ul>
          </div>

          {/* Section 6: App Links */}
          <div className="lg:col-span-2">
            <h6 className="font-semibold mb-2">Experience Better, App on Mobile</h6>
            <div className="flex items-start">
              <img src="/icons/qrcode.png" alt="App QR Code" className="h-16 mt-0 mr-1" />
              {/* googleplay icon and app store */}
              <div className="flex flex-col items-start">
                <a href="#"><img src="/icons/google-play-download-icon-0.jpg" alt="Google Play" className="h-8 mb-0" /></a>
                <a href="#"><img src="/icons/google-play-download-icon-0.jpg" alt="Google Play" className="h-8 mb-0" /></a>
                {/* <a href="#"><img src="/icons/appstore_download.png" alt="App Store" className="h-10" /></a> */}
              </div>
              {/* googleplay icon and app store */}
            </div>
          </div>

        </div>
      </div>


      <div className="container mx-auto px-4 text-center mt-8 font-[poppins]">
        <p>© <span>Copyright</span> <strong className="px-1">BookMyCake</strong> <span>All Rights Reserved</span></p>
      </div>

      <a href="#" id="scroll-top" className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700">
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </footer>
  );
};

export default FrontFooter;