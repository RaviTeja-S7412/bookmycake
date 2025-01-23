import React from 'react';
import { Link } from 'react-router-dom';

const CakeCard2 = ({ product_image_url, product_name, pricing_starts }) => {
    return (
        <div className="position-relative">
        
            <div className="card shadow-sm" style={{
    borderBottom: "5px solid rgba(61, 8, 27, 0.75)", // Thick bottom border
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  }}>
                <img src={product_image_url} alt={product_name} className="card-img-top" style={{
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.2)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "none";
    }} />
            </div>
    
            <div className="card-body mt-2 d-flex align-items-center">
               <Link><p className="card-text d-flex align-items-center ">{product_name} <span className="mx-2" style={{fontSize:"25px"}}>&rarr;</span></p> </Link> 
            </div>
        </div>
    );
};

export default CakeCard2;