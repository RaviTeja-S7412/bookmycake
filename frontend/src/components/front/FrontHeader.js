import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBarItems  from "../../Data/NavMenu"

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
        <div className="container-fluid position-relative row align-items-center">
          <div className='col-sm'>
            <a onClick={() => navigate('/')} className=" d-flex align-items-center me-auto cursor-pointer">
              {/* <h1 className="sitename">Sailor</h1> */}
              <img src='/assets/logo.jpg'/>
            </a>

          </div>

          <div className='col-lg'>
            <nav id="navmenu" className="navmenu">
             <ul> {
                 NavBarItems.map(item=>(
                  <li key={item.id} className='dropdown cursor-pointer'>
                    {item.subItems?(<>
                    <a>{item.label}</a>
                    <ul>
                      {item.subItems.map((subnav)=>(<>
                      <li key={subnav.id}>
                        <a href={`${subnav.path}`}>{subnav.label}</a>
                      </li>
                      </>))}
                    </ul>
                    </>):
                    (<a href={item.path}>{item.label}</a>)}
                  </li>
                 ))
              }
              </ul>
            </nav>
          </div>
          <div className='col-sm align-items-center px-auto'>
            <a className="btn-getstarted" href="about.html">Get Started</a>
          </div>
        </div>
      </header>
    </>
  )
}

export default FrontHeader
