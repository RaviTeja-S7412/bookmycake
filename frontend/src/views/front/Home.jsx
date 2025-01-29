import React, { useEffect, useMemo, useState } from 'react'
import Products from '../../Data/Products'
import Cake from '../../components/front/UserPageComponents/CakeCard'
import CCarousel from '../../components/front/Carousal/Carousal'
import CakeCard2 from '../../components/front/UserPageComponents/CakeCard2'
import CakeCard3 from '../../components/front/UserPageComponents/CakeCard3'
import slides from '../../Data/Slides'
import { Row, Col } from 'react-bootstrap'
const Home = () => {
    return (
        <div className="index-page">
            <main className="container-fluid">
                <CCarousel slides={slides} />
                <div className="container my-5 py-4">
                    <span className='fs-3 fw-medium'>Featured Collection</span>
                    <div className='mt-5' >
                        <Cake props={Products}></Cake>
                    </div>
                </div>
                <div className='container my-5'>
                    <span className='fs-3 fw-medium'>Designer Cakes</span>
                    <Row className="g-4 align-items-stretch mt-3">
                        <Col md={4} className="d-flex flex-column gap-4">
                            <div className="flex-fill">
                                <CakeCard2
                                    product_image_url={Products[0].product_image_url}
                                    product_name={Products[0].product_name}
                                    pricing_starts={Products[0].pricing_starts}
                                />
                            </div>
                            <div className="flex-fill">
                                <CakeCard2
                                    product_image_url={Products[1].product_image_url}
                                    product_name={Products[1].product_name}
                                    pricing_starts={Products[1].pricing_starts}
                                />
                            </div>
                        </Col>
                        <Col md={8} className="d-flex flex-column ">
                            <div className="">
                                <CakeCard2
                                    product_image_url={Products[2].product_image_url}
                                    product_name={Products[2].product_name}
                                    pricing_starts={Products[2].pricing_starts}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row className="g-4 align-items-stretch mt-3">
                        <Col md={4} className="d-flex flex-column gap-4">
                            <div className="flex-fill">
                                <CakeCard2
                                    product_image_url={Products[0].product_image_url}
                                    product_name={Products[0].product_name}
                                    pricing_starts={Products[0].pricing_starts}
                                />
                            </div>
                            <div className="flex-fill">
                                <CakeCard2
                                    product_image_url={Products[1].product_image_url}
                                    product_name={Products[1].product_name}
                                    pricing_starts={Products[1].pricing_starts}
                                />
                            </div>
                        </Col>
                        <Col md={8} className="d-flex flex-column ">
                            <div className="">
                                <CakeCard2
                                    product_image_url={Products[2].product_image_url}
                                    product_name={Products[2].product_name}
                                    pricing_starts={Products[2].pricing_starts}
                                />
                            </div>
                        </Col>
                    </Row>
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
