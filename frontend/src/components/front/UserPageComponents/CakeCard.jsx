import React from 'react';
import { Link } from 'react-router-dom';

const Cake = ({ product_image_url, product_name, pricing_starts }) => {
    return (
        <div
            className="d-flex flex-wrap justify-content-start"
            style={{ gap: "20px", maxWidth: "18rem", minHeight: "20rem" }}
        >
            <div
                className="card shadow-sm"
                style={{


                }}

            ><Link to={"/products"}>
           
                <img
                    src={product_image_url}
                    alt={product_name}
                    className="card-img-top"
                    style={{
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",



                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.2   )";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                    }}

                />
                <div className="card-body">
                    <h5 className="card-title">{product_name}</h5>
                    <p className="card-text">Starts at: {pricing_starts}</p>
                </div>
                </Link>
            </div>
            
        </div>
    );
};

export default Cake;
