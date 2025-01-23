import React, { useEffect, useMemo, useState } from 'react'
import Products from '../../Data/Products'
import Cake from '../../components/front/UserPageComponents/CakeCard'
import Carousel from '../../components/front/Carousal/Carousal'
import CakeCard2 from '../../components/front/UserPageComponents/CakeCard2'
import CakeCard3 from '../../components/front/UserPageComponents/CakeCard3'
const Home = () => {

    return (
        <div className="index-page">
            <main className="container-fluid">
                <Carousel />
                <div className="container my-5">
                    <span className='fs-3 fw-medium'>Featured Collection</span>
                    <div className="row mt-5">
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
                <div className='container my-5'>
                    <span className='fs-3 fw-medium'>Designer Cakes</span>
                    <div className='row g-4 align-items-stretch mt-3'>
                        <div className='col-md-4 d-flex flex-column gap-4'>
                            <div className='flex-fill'>
                                <CakeCard2
                                    product_image_url={Products[0].product_image_url}
                                    product_name={Products[0].product_name}
                                    pricing_starts={Products[0].pricing_starts}
                                />
                            </div>
                            <div className='flex-fill'>
                                <CakeCard2
                                    product_image_url={Products[1].product_image_url}
                                    product_name={Products[1].product_name}
                                    pricing_starts={Products[1].pricing_starts}
                                />
                            </div>
                        </div>


                        <div className='col-md-8 d-flex align-items-stretch'>
                            <div className='flex-fill'>
                                <CakeCard2
                                    product_image_url={Products[2].product_image_url}
                                    product_name={Products[2].product_name}
                                    pricing_starts={Products[2].pricing_starts}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* /** remaining section to be added with apis */}

                <div className='container my-5'>
                    <div className=" row mt-5">
                        <div className="col-md-4" >
                            <CakeCard3
                                product_image={Products[0].product_image_url}
                                product_name={"Photo Cakes"}
                               product_description={"Get your or your favorite photo on the cake with edible print and photo you can eat"}
                               prodcut_link={"/"}
                            />
                        </div>
                        <div className="col-md-4" >
                            <CakeCard3
                                product_image={Products[0].product_image_url}
                                product_name={"Photo Cakes"}
                               product_description={"Get your or your favorite photo on the cake with edible print and photo you can eat"}
                               prodcut_link={"/"}
                            />
                        </div>
                        <div className="col-md-4" >
                            <CakeCard3
                                product_image={Products[0].product_image_url}
                                product_name={"Photo Cakes"}
                               product_description={"Get your or your favorite photo on the cake with edible print and photo you can eat"}
                               prodcut_link={"/"}
                            />
                        </div>
                    </div>

                </div>
            </main >
        </div >





    )

}

export default Home
