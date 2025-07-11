import React, { useEffect, useState } from 'react'
import {
    CCol,
    CRow,
    CCard,
    CCardHeader,
    CCardBody
  } from '@coreui/react'
import { json, useLocation, useNavigate } from 'react-router-dom';
import axiosIntance from '../../components/axios';

const Orderdetails = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [order_data, setOrderdata] = useState({});
    const queryParams = new URLSearchParams(location.search);
      
    const getOrderdetails = async () => {
        setLoading(true);
        setOrderdata({});
        const params = {};
        params.order_id = queryParams.get('order_id');
        try {
            const res = await axiosIntance.post(`/admin/orders/get_order_details`, params);
            if (res.status === 200) {
                setOrderdata(res?.data);
            } else {
            }
        } catch (error) {
        // console.error('Error fetching product:', error);
        // Handle API error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(queryParams.get('order_id')){
            getOrderdetails();        
        }
    }, []);

    const billingAddress = order_data?.order_details?.billing_address ? JSON.parse(order_data?.order_details?.billing_address) : {};
    return (
        <CRow>
            {/* Customer Details */}
            <CCol md={4}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Customer Details</strong>
                    </CCardHeader>
                    <CCardBody>
                        <div><b>Name:</b> {order_data?.order_details?.first_name+' '+order_data?.order_details?.last_name}</div>
                        <div><b>Email:</b> {order_data?.order_details?.email}</div>
                        <div><b>Phone:</b> {order_data?.order_details?.mobile_number}</div>
                        <div><b>Shipping Address:</b> <span className='font-bold'>{order_data?.order_details?.full_name}</span><br />
                            {order_data?.order_details?.house_no}, {order_data?.order_details?.area},<br />
                            {order_data?.order_details?.city}, {order_data?.order_details?.state},<br />
                            {order_data?.order_details?.country} - {order_data?.order_details?.pincode}<br />
                            Mobile: {order_data?.order_details?.mobile_number}</div>
                        <div><b>Billing Address:</b> <span className='font-bold'>{billingAddress?.full_name}</span><br />
                            {billingAddress?.house_no}, {billingAddress?.area},<br />
                            {billingAddress?.city}, {billingAddress?.state},<br />
                            {billingAddress?.country} - {billingAddress?.pincode}<br />
                            Mobile: {billingAddress?.mobile_number}</div>
                    </CCardBody>
                </CCard>
            </CCol>


            {/* Payment Details */}
            <CCol md={4}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Payment Details</strong>
                    </CCardHeader>
                    <CCardBody>
                        <div><b>Method:</b> <span className='uppercase'>{order_data?.order_details?.payment_type}</span></div>
                        <div><b>Payment Status:</b> {order_data?.order_details?.payment_status}</div>
                        <div><b>Payment Date:</b> {order_data?.order_details?.date_of_order
                                ? new Date(order_data.order_details.date_of_payment).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                }).replace(/\//g, '-')
                                : ''}</div>
                    </CCardBody>
                </CCard>
            </CCol>

            {/* Order Details */}
            <CCol md={8}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Order Details</strong>
                    </CCardHeader>
                    <CCardBody>
                        <div className="mb-2"><b>Order ID:</b> {order_data?.order_details?.order_id}</div>
                        <div className="mb-2"><b>Order Date:</b> {
                            order_data?.order_details?.date_of_order
                                ? new Date(order_data.order_details.date_of_order).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                }).replace(/\//g, '-')
                                : ''
                        }</div>
                        <div className="mb-2"><b>Order Status:</b> {
                            order_data?.order_details?.order_status === "Pending" ?
                                <span className='badge bg-yellow-500'>Pending</span> :
                            order_data?.order_details?.order_status === "cancelled" ? 
                                <span className='badge  bg-red-500'>Cancelled</span> :
                            order_data?.order_details?.order_status === "success" ?
                                <span className='badge bg-green-500'>Success</span>
                            : ''
                        }</div>
                        <div className="mb-2"><b>Delivery Status:</b> {
                            order_data?.order_details?.delivery_status === "Pending" ?
                                <span className='badge bg-yellow-500'>Pending</span> :
                            order_data?.order_details?.delivery_status === "failed" ? 
                                <span className='badge  bg-red-500'>Failed</span> :
                            order_data?.order_details?.delivery_status === "Delivered" ?
                                <span className='badge bg-green-500'>Delivered</span> :
                            order_data?.order_details?.delivery_status === "out" ?
                                <span className='badge' style={{ backgroundColor: '#3b82f6', color: '#fff' }}>Out For Delivery</span>
                            : ''
                        }</div>
                        <div className="mb-2"><b>Payment Status:</b> {
                            order_data?.order_details?.payment_status === "Pending" ?
                                <span className='badge bg-yellow-500'>Pending</span> :
                            order_data?.order_details?.payment_status === "failed" ? 
                                <span className='badge  bg-red-500'>Failed</span> :
                            order_data?.order_details?.payment_status === "success" ?
                                <span className='badge bg-green-500'>Success</span>
                            : ''
                        }</div>
                        <div><b>Items:</b></div>
                        <table className="table table-bordered mt-2">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order_data?.products?.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <img
                                                src={item?.type === 'prop' ? import.meta.env.VITE_APIBASE_URL+item?.prop_image : import.meta.env.VITE_APIBASE_URL+item?.product_image}
                                                alt={item?.type === 'prop' ? item?.prop_name : item?.product_name}
                                                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
                                            />
                                        </td>
                                        <td>
                                            {item?.type === 'prop' ? item?.prop_name : item?.product_name}<br />
                                            
                                                {item?.type === 'product' && 
                                                <span className='text-sm'>
                                                    Delivery Time: {item?.delivery_time}<br />
                                                    Weight: {item?.weight/1000} KG<br />
                                                    Flavor: {item?.flavor}<br />
                                                    Message: {item?.message}
                                                </span>
                                            }
                                            
                                        </td>
                                        <td>{item.qty}</td>
                                        <td>₹ {item.product_price}</td>
                                        <td>₹ {item.qty * item.product_price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="text-end mt-3">
                            <b>Total:</b> ₹ {order_data?.order_details?.total_amount}
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>

        </CRow>
    )
}
export default Orderdetails
