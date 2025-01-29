import React from "react";
import { Card } from "react-bootstrap";
const CakeCard3 = ({ product_image, product_description, product_link, product_name }) => {
    return (
        <Card className="text-center">
      <Card.Body>
        <Card.Img src={product_image} style={{maxHeight:"200px",maxWidth:"200px"}}></Card.Img>
        <Card.Title>{product_name}</Card.Title>
        <Card.Text>
        {product_description}
        </Card.Text>
       <Card.Link href={`${product_link}`} style={{textDecoration:"none"}}>{product_name} <span className="mx-2" style={{fontSize:"25px"}}>&rarr;</span></Card.Link>
      </Card.Body>
      
    </Card>
    );
}

export default CakeCard3;