import { bottom } from '@popperjs/core';
import React from 'react';
import { Card,Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const CakeCard2 = ({ product_image_url, product_name,product_collection }) => {
    let navigate = useNavigate()  
  return (
 <Col>
     <Card className='border-0'>
      <Card.Img src={product_image_url} alt={product_name} style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease"}} onMouseEnter={(e) => {
       e.currentTarget.style.transform = "scale(1.05)";
       e.currentTarget.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.2)";
     }}
     onMouseLeave={(e) => {
       e.currentTarget.style.transform = "scale(1)";
       e.currentTarget.style.boxShadow = "none";
     }} />
      <Card.Footer style={{color:"black",cursor:"pointer"}}>
        <Card.Link onClick={()=>{navigate(`${product_collection}`)}} style={{textDecoration:"none",color:"black"}}>{product_name} <span className="mx-2" style={{fontSize:"25px"}}>&rarr;</span></Card.Link>
      </Card.Footer>
     </Card>
 </Col>
    );
};

export default CakeCard2;