import Carousel from 'react-bootstrap/Carousel';
const CCarousel = ({slides}) => {
    return (
      <Carousel>
        {slides.map((slide, index) => (
            <Carousel.Item key={index}>
                <img
                    className="d-block w-100"
                    src={slide.image}
                    alt={slide.title}
                    style={{height:"300px",objectFit:'cover'}}
                />
                <Carousel.Caption>
                    <h5>{slide.title}</h5>
                    <p>{slide.description}</p>
                </Carousel.Caption>
            </Carousel.Item>
        ))}
    </Carousel>
      );
};

export default CCarousel;





   


// export default Carousel;
