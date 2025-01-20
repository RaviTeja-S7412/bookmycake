import React from 'react';

const Cake = ({ product_image_url, product_name, pricing_starts }) => {
    return (
        <div className="card shadow-sm">
            <img src={product_image_url} alt={product_name} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{product_name}</h5>
                <p className="card-text">Starts at: {pricing_starts}</p>
            </div>
        </div>
    );
};

export default Cake;
