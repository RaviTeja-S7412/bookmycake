import React, { useEffect, useRef } from 'react'

const FrontFooter = () => {


  return (
    <>
      <footer id="footer" className="footer dark-background">

        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="index.html" className="logo d-flex align-items-center">
                <span className="sitename">Sailor</span>
              </a>
              <div className="footer-contact pt-3">
                <p>A108 Adam Street</p>
                <p>New York, NY 535022</p>
                <p className="mt-3"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
                <p><strong>Email:</strong> <span>info@example.com</span></p>
              </div>
              <div className="social-links d-flex mt-4">
                <a href=""><i className="bi bi-twitter-x"></i></a>
                <a href=""><i className="bi bi-facebook"></i></a>
                <a href=""><i className="bi bi-instagram"></i></a>
                <a href=""><i className="bi bi-linkedin"></i></a>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Terms of service</a></li>
                <li><a href="#">Privacy policy</a></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><a href="#">Web Design</a></li>
                <li><a href="#">Web Development</a></li>
                <li><a href="#">Product Management</a></li>
                <li><a href="#">Marketing</a></li>
                <li><a href="#">Graphic Design</a></li>
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
