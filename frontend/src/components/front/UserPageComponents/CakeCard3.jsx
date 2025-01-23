import React from "react";

const CakeCard3 = ({ product_image, product_description, product_link, product_name }) => {
    return (
        <div className="d-flex  ">
            <div className="card align-items-center" style={{ width: '21rem' }}>
                <img src={product_image} className="" alt="..." style={{ width: '150px', height: '100px', objectFit: 'cover',padding:"10px" }} />
                <div className="card-body justify-content-center text-center">
                    <h5 className="card-title">{product_name}</h5>
                    <p className="card-text">{product_description} Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href={product_link} className=" ">{product_name}<span className="mx-2" style={{fontSize:"25px"}}>&rarr;</span></a>
                </div>
            </div>
        </div>
    );
}

export default CakeCard3;