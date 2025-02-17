import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBarItems from '../../Data/NavMenu';
const FrontHeader = () => {
  return (
    <>
      <div>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Book My Cake</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />

        <link href="/src/assets/front/css/main.css" rel="stylesheet" />
        <link href="/src/assets/front/img/favicon.png" rel="icon" />
        <link href="/src/assets/front/img/apple-touch-icon.png" rel="apple-touch-icon" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />

        <link href="/src/assets/front/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/src/assets/front/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
        <link href="/src/assets/front/vendor/aos/aos.css" rel="stylesheet" />
        <link href="/src/assets/front/vendor/glightbox/css/glightbox.min.css" rel="stylesheet" />
        <link href="/src/assets/front/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" />

        
      </div>
      
      <header id="header" className="header d-flex align-items-center sticky-top">
        <div key="maindiv" className="container-fluid position-relative row align-items-center">
          <div key="logosection" className='col-sm'>
            <NavLink to={'/'}>
              <span className="d-flex align-items-center me-auto cursor-pointer">
                <img src='/assets/logo.jpg' alt="Logo" />
              </span>
            </NavLink>
          </div>

          <div key="navbar" className='col-lg'>
            <nav id="navmenu" className="navmenu">
              <ul key='mainmenu'> {
                NavBarItems.map(item => (
                  <li key={item.id} className='dropdown cursor-pointer'>
                    {item.subItems ? (
                      <>
                        <NavLink to={item.path}>{item.label}<i className="bi bi-chevron-down toggle-dropdown"></i></NavLink>
                        <ul key='submenu'>
                          {item.subItems.map(subnav => (
                            <li key={subnav.id} className={subnav.childItems ? "dropdown" : ""}>
                              {subnav.childItems ? (
                                <>
                                  <NavLink>{subnav.label}<i className="bi bi-chevron-down toggle-dropdown"></i></NavLink>
                                  <ul>
                                    {subnav.childItems.map(childItem => (
                                      <li key={childItem.id}>
                                        <NavLink to={childItem.path}>{childItem.label}</NavLink>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              ) : (<NavLink to={subnav.path}>{subnav.label}</NavLink>)}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (<NavLink to={item.path}>{item.label}</NavLink>)}
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
  );
};

export default FrontHeader;