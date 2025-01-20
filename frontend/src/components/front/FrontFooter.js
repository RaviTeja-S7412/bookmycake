
import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'

const FrontFooter = () => {


  return (
    <>
      <footer id="footer" className="footer dark-background">

        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="index.html" className="logo d-flex align-items-center">
                <span className="sitename">BookMyCake</span>
              </a>
              <div className="footer-contact pt-3">
                <p>Bookmycake Private Limited
                Gehlot farms,</p>
                <p>(Opp 521) Sector 47 gurgaon
                Haryana-122001</p>
                <p className="mt-3"><strong>Phone:</strong> <span>+91 99900-26799</span></p>
                <p><strong>Email:</strong> <span>Hello@bookmycake.co</span></p>
              </div>
              {/* <div className="social-links d-flex mt-4">
                <a href=""><i className="bi bi-twitter-x"></i></a>
                <a href=""><i className="bi bi-facebook"></i></a>
                <a href=""><i className="bi bi-instagram"></i></a>
                <a href=""><i className="bi bi-linkedin"></i></a>
              </div> */}
              <NavLink to={'/'}>
              <span className="d-flex align-items-center me-auto cursor-pointer">
                <img src='/assets/logo.jpg' alt="Logo" />
              </span>
            </NavLink>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><a href="#">Search</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Locate Us</a></li>
                <li><a href="#">Terms and Conditions</a></li>
                <li><a href="#">Cancellation and Refunds</a></li>
                <li><a href="#">Track Order</a></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Heading</h4>
              <ul>
                <li><p>Call / Whatsapp us on 99900-26799 for any queries or to get quote for designer cakes,</p></li>
                <li><p>Whatsapp us the image<br/> Email : Hello@bookmycake.co</p></li>
               
              </ul>
            </div>
            </div>
          </div>

          <div className="container copyright text-center mt-4">
            <p>© <span>Copyright</span> <strong className="px-1 sitename">BookMyCake</strong> <span>All Rights Reserved</span></p>
            
          </div>

      </footer>
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

      {/* <div id="preloader"></div> */}

      <script src="/src/assets/front/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="/src/assets/front/vendor/php-email-form/validate.js"></script>
      <script src="/src/assets/front/vendor/aos/aos.js"></script>
      <script src="/src/assets/front/vendor/glightbox/js/glightbox.min.js"></script>
      <script src="/src/assets/front/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
      <script src="/src/assets/front/vendor/isotope-layout/isotope.pkgd.min.js"></script>
      <script src="/src/assets/front/vendor/purecounter/purecounter_vanilla.js"></script>
      <script src="/src/assets/front/vendor/waypoints/noframework.waypoints.js"></script>
      <script src="/src/assets/front/vendor/swiper/swiper-bundle.min.js"></script>

      <script src="/src/assets/front/js/main.js"></script>
    </>
  )
}

export default FrontFooter
