import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const FrontFooter = () => {
  return (
    <footer className="footer dark-background" style={{ background: "#910f3f", color: "#f2efdd" }}>
      <Container className="footer-top container d-grid">
        <Row className="mt-5 justify-content-center ">
          <Col lg={4} md={6} className="footer-about mt-4">
            <h4>BookMyCake</h4>
            <div className="footer-contact pt-3">
              <p>Bookmycake Private Limited Gehlot farms,</p>
              <p>(Opp 521) Sector 47 Gurgaon Haryana-122001</p>
              <p className="mt-3"><strong>Phone:</strong> <span>+91 99900-26799</span></p>
              <p><strong>Email:</strong> <span>Hello@bookmycake.co</span></p>
            </div>
            <NavLink to={'/'}>
              <span className="d-flex align-items-center me-auto cursor-pointer">
                <img src='/assets/logo.jpg' alt="Logo" />
              </span>
            </NavLink>
          </Col>

          <Col  md={3} className="footer-about mt-4">
          
          <h4>Useful Links</h4>
          <div className="footer-contact pt-3">
            <ul style={{ listStyle: 'none', color: "#f2efdd", textDecoration: "none" }}>
              <li><a style={{ listStyle: 'none', color: "#f2efdd", textDecoration: "none" }} href="#">Search</a></li>
              <li><a style={{ listStyle: 'none', color: "#f2efdd", textDecoration: "none" }} href="#">Contact Us</a></li>
              <li><a style={{ listStyle: 'none', color: "#f2efdd", textDecoration: "none" }} href="#">Locate Us</a></li>
              <li><a style={{ listStyle: 'none', color: "#f2efdd", textDecoration: "none" }} href="#">Terms and Conditions</a></li>
              <li><a style={{ listStyle: 'none', color: "#f2efdd", textDecoration: "none" }} href="#">Cancellation and Refunds</a></li>
              <li><a style={{ listStyle: 'none', color: "#f2efdd", textDecoration: "none" }} href="#">Track Order</a></li>
            </ul>
          </div>
            
          </Col>

          <Col  md={3} className="footer-about mt-4">
       
          <h4>Heading</h4>
          <div className="footer-contact pt-3">
            <ul style={{ listStyle: 'none' }}>
              <li><p>Call / Whatsapp us on 99900-26799 for any queries or to get quote for designer cakes</p></li>
              <li><p>Whatsapp us the image<br /> Email : Hello@bookmycake.co</p></li>
            </ul>
          </div>
          </Col>
        </Row>
      </Container>

      <Container className="text-center mt-4">
        <p>© <span>Copyright</span> <strong className="px-1 sitename">BookMyCake</strong> <span>All Rights Reserved</span></p>
      </Container>

      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </footer>
  );
};

export default FrontFooter;