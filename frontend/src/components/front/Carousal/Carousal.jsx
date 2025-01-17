import React, { useState,useEffect } from 'react';

const Carousel = () => {
    
    const slides = [
        {
            image: '/src/assets/front/img/hero-carousel/hero-carousel-1.jpg',
            title: 'Welcome to BookMyCakes',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
            image: '/src/assets/front/img/hero-carousel/hero-carousel-2.jpg',
            title: 'At vero eos et accusamus',
            description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut.',
        },
        {
            image: '/src/assets/front/img/hero-carousel/hero-carousel-3.jpg',
            title: 'Temporibus autem quibusdam',
            description: 'Beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt omnis iste natus error sit voluptatem accusantium.',
        },
        {
          
            title:"K-pop BTS Square Cake",
            description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut.',
            image:"src/assets/products/KPOP-BTS-PHOTO-CAKE.webp"
        },
        {
          
            title:"Elsa Frozen Cake",
            description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut.',
            image:"src/assets/products/ELSAPHOTOBMCCO.avif"
        },
        {
           
            title:"Photo Cake Square - Yellow",
            description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut.',
            image:"src/assets/products/Square-Photo-Cake-Yellow.webp"
        },
        {
            
            title:"Avengers Cake - Square",
            description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut.',
            image:"src/assets/products/Avenger-Square-Cake1.webp"
        },
    ];
    const [currentIdx, setCurrentIdx] = useState(0);
    const nextSlide = () => {
        setCurrentIdx((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIdx((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };
    useEffect(() => {
        const intervalId = setInterval(nextSlide, 5000); 
        return () => clearInterval(intervalId); 
    }, []);

    return (
        <div id="hero-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000" style={{ position: 'relative' }}>
            <div className="carousel-inner">
                {slides.map((slide, index) => (
                    <div className={`carousel-item ${index === currentIdx ? 'active' : ''}`} key={index}>
                        <img src={slide.image} alt={slide.title} style={{ height: '400px', objectFit: 'fill', width: '100%' }} />
                        <div className="carousel-container" style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)', color: '#fff', textAlign: 'center' }}>
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                            <a href="" className="btn-get-started" style={{ backgroundColor: '#ff0000', color: '#fff', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>Buy</a>
                        </div>
                    </div>
                ))}
            </div>

            <button className="carousel-control-prev" type="button" onClick={prevSlide} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" onClick={nextSlide} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;





   


// export default Carousel;
