import React from 'react';
import { Row ,Card,Col} from 'react-bootstrap';

const Cake = ({props}) => {
    return (
        <Row xs={1} md={4} className='g-4'>
        {
         props.map((item,index)=>(
            <Col key={index}>
            <Card style={{border:"none"}}>
                <Card.Img src={item.product_image_url} style={{minHeight:"250px", transition: "transform 0.3s ease, box-shadow 0.3s ease",}} onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.2)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "none";
    }}/>
                <Card.Footer>
                    <Card.Title>{item.product_name}</Card.Title>
                    <Card.Link href=''style={{textDecoration:"none",color:"black"}}>From Rs. {item.pricing_starts}</Card.Link>
                </Card.Footer>
            </Card>
            </Col>
         ))
        } 
     </Row>
    );
};

export default Cake;