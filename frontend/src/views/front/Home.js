import React, { useEffect, useMemo, useState } from 'react'

const Home = () => {

    return (
        <div className="index-page">

            <main className="main">
            <section id="hero" className="hero section dark-background">

                <div id="hero-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">

                <div className="carousel-item active">
                    <img src="/src/assets/front/img/hero-carousel/hero-carousel-1.jpg" alt="" />
                    <div className="carousel-container">
                    <h2>Welcome to Sailor<br /></h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a href="#featured-services" className="btn-get-started">Get Started</a>
                    </div>
                </div>

                <div className="carousel-item">
                    <img src="/src/assets/front/img/hero-carousel/hero-carousel-2.jpg" alt="" />
                    <div className="carousel-container">
                    <h2>At vero eos et accusamus</h2>
                    <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut.</p>
                    <a href="#featured-services" className="btn-get-started">Get Started</a>
                    </div>
                </div>

                <div className="carousel-item">
                    <img src="/src/assets/front/img/hero-carousel/hero-carousel-3.jpg" alt="" />
                    <div className="carousel-container">
                    <h2>Temporibus autem quibusdam</h2>
                    <p>Beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt omnis iste natus error sit voluptatem accusantium.</p>
                    <a href="#featured-services" className="btn-get-started">Get Started</a>
                    </div>
                </div>

                <a className="carousel-control-prev" href="#hero-carousel" role="button" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
                </a>

                <a className="carousel-control-next" href="#hero-carousel" role="button" data-bs-slide="next">
                    <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
                </a>

                <ol className="carousel-indicators"></ol>

                </div>

            </section>

            <section id="about" className="about section">

                <div className="container section-title" data-aos="fade-up">
                <h2>About</h2>
                <p>About Us<br /></p>
                </div>

                <div className="container">

                <div className="row gy-4">

                    <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="100">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </p>
                    <ul>
                        <li><i className="bi bi-check2-circle"></i> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></li>
                        <li><i className="bi bi-check2-circle"></i> <span>Duis aute irure dolor in reprehenderit in voluptate velit.</span></li>
                        <li><i className="bi bi-check2-circle"></i> <span>Ullamco laboris nisi ut aliquip ex ea commodo</span></li>
                    </ul>
                    </div>

                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                    <p>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
                    <a href="about.html" className="read-more"><span>Read More</span><i className="bi bi-arrow-right"></i></a>
                    </div>

                </div>

                </div>

            </section>

            </main>


        </div>
    )
    
}

export default Home
