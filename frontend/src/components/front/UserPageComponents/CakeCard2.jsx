import React from 'react';
import { Card,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CakeCard2 = ({ product_image_url, product_name }) => {
    return (
 <Col>
     <Card style={{border:"none"}}>
      <Card.Img src={product_image_url} style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease"}} onMouseEnter={(e) => {
       e.currentTarget.style.transform = "scale(1.05)";
       e.currentTarget.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.2)";
     }}
     onMouseLeave={(e) => {
       e.currentTarget.style.transform = "scale(1)";
       e.currentTarget.style.boxShadow = "none";
     }} />
      <Card.Footer style={{color:"black"}}>
        <Card.Link href='#' style={{textDecoration:"none",color:"black"}}>{product_name} <span className="mx-2" style={{fontSize:"25px"}}>&rarr;</span></Card.Link>
      </Card.Footer>
     </Card>
 </Col>
    );
};

export default CakeCard2;