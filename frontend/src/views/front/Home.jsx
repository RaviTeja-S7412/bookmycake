import React, { useEffect, useMemo, useState } from 'react'
import Products from '../../Data/Products'
import Cake from '../../components/front/UserPageComponents/CakeCard'
import Carousel from '../../components/front/Carousal/Carousal'
const Home = () => {

    return (
        <div className="index-page">
            <main className="container-fluid">
                <Carousel />
                <div className="container my-4">
                    <h4>Featured Collection</h4>
                    <div className="row">
                        {Products.map((product) => (
                            <div className="col-6 col-sm-4 col-md-3 mb-4" key={product.product_name}>
                                <Cake
                                    product_image_url={product.product_image_url}
                                    product_name={product.product_name}
                                    pricing_starts={product.pricing_starts}
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </main>


        </div>
    )

}

export default Home
