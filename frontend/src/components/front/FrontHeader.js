import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const FrontHeader = () => {

  const navigate = useNavigate();

  return (
    <>
      <div>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Book My Cake</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />

        <link href="/src/assets/front/img/favicon.png" rel="icon" />
        <link href="/src/assets/front/img/apple-touch-icon.png" rel="apple-touch-icon" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />

        <link href="/src/assets/front/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/src/assets/front/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        <link href="/src/assets/front/vendor/aos/aos.css" rel="stylesheet" />
        <link href="/src/assets/front/vendor/glightbox/css/glightbox.min.css" rel="stylesheet" />
        <link href="/src/assets/front/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />

        <link href="/src/assets/front/css/main.css" rel="stylesheet" />

      </div>
      <header id="header" className="header d-flex align-items-center sticky-top">
        <div className="container-fluid position-relative d-flex align-items-center">

          <a onClick={() => navigate('/')} className="logo d-flex align-items-center me-auto cursor-pointer">
            <h1 className="sitename">Sailor</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li><a onClick={() => navigate('/')} className="active">Christmas Specials</a></li>
              <li><a onClick={() => navigate('/')} className="active">Indian Fusion Cakes</a></li>
              <li className="dropdown"><a href="about.html"><span>Photo Cakes</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                <ul>
                  <li><a onClick={() => navigate('/')}>All Photo Cakes</a></li>
                  <li><a onClick={() => navigate('/')}>Custom Photo Cakes</a></li>
                  <li><a onClick={() => navigate('/')}>Kids Photo Cakes</a></li>
                  {/* <li className="dropdown"><a href="#"><span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                    <ul>
                      <li><a href="#">Deep Dropdown 1</a></li>
                      <li><a href="#">Deep Dropdown 2</a></li>
                      <li><a href="#">Deep Dropdown 3</a></li>
                      <li><a href="#">Deep Dropdown 4</a></li>
                      <li><a href="#">Deep Dropdown 5</a></li>
                    </ul>
                  </li> */}
                </ul>
              </li>
              <li><a onClick={() => navigate('/')}>Flavor</a></li>
              <li><a onClick={() => navigate('/')}>Desserts</a></li>
              <li><a onClick={() => navigate('/')}>Pricing</a></li>
              <li><a onClick={() => navigate('/')}>Designer Cakes</a></li>
              <li><a onClick={() => navigate('/')}>Birthday</a></li>
              <li><a onClick={() => navigate('/')}>Props</a></li>
              <li><a onClick={() => navigate('/')}>Corporate Cakes</a></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a className="btn-getstarted" href="about.html">Get Started</a>

        </div>
      </header>
    </>
  )
}

export default FrontHeader
