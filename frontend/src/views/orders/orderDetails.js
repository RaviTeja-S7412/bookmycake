import React, { useEffect, useState } from 'react'
import {
    CCol,
    CRow,
    CCard,
    CCardHeader,
    CCardBody
} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom';
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
        if (queryParams.get('order_id')) {
            getOrderdetails();
        }
    }, []);

    console.log(order_data);

    const billingAddress = order_data?.order_details?.billing_address ? JSON.parse(order_data?.order_details?.billing_address) : {};

    return (
        <div className='w-full lg:w-full xl:w-5/6 mx-auto p-0 lg:p-4 rounded-sm shadow-sm font-[poppins]'>
            <h5>Order Id: <span>{order_data?.order_details?.order_id}</span></h5>
            <div className='grid grid-cols-1 mt-4 md:grid-cols-1 lg:grid-cols-2 gap-2'>
                <div className='border-1 border-gray-200 p-2 shadow-sm'>
                    <p className='mb-0 font-semibold'>Customer Details</p>
                    <table className='w-full mt-2 table-auto'>
                        <tbody>
                            <tr>
                                <td className='font-medium pb-2'>Name:</td>
                                <td className='pb-2'>{order_data?.order_details?.first_name + ' ' + order_data?.order_details?.last_name}</td>
                            </tr>
                            <tr>
                                <td className='font-medium pb-2'>Email:</td>
                                <td className='pb-2'>{order_data?.order_details?.email}</td>
                            </tr>
                            <tr>
                                <td className='font-medium pb-2'>Phone:</td>
                                <td className='pb-2'>{order_data?.order_details?.mobile_number}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='border-1 border-gray-200 p-2 shadow-sm'>
                    <p className='mb-0 font-semibold'>Payment Details</p>
                    <table className='w-full mt-2'>
                        <tbody>
                            <tr>
                                <td className='font-medium pb-2'>Method:</td>
                                <td className='pb-2 uppercase'>{order_data?.order_details?.payment_type}</td>
                            </tr>
                            <tr>
                                <td className='font-medium pb-2'>Payment Status:</td>
                                <td className='pb-2'><span className='px-1 border-1 border-green-400 bg-green-300 rounded text-sm'>{order_data?.order_details?.payment_status}</span></td>
                            </tr>
                            <tr>
                                <td className='font-medium pb-2'>Payment Date:</td>
                                <td className='pb-2'>{order_data?.order_details?.date_of_order
                                    ? new Date(order_data.order_details.date_of_payment).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    }).replace(/\//g, '-')
                                    : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='border-1 border-gray-200 mt-2 shadow-sm'>
                <div className="overflow-x-auto rounded-xl bg-white">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="hidden md:table-header-group border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left font-semibold">Item Details</th>
                                <th className="px-6 py-4 text-left font-semibold">Quantity</th>
                                <th className="px-6 py-4 text-left font-semibold">Price</th>
                                <th className="px-6 py-4 text-left font-semibold">Sub Total</th>
                            </tr>
                        </thead>

                        {/* Row 1 */}
                        <tbody className="divide-y divide-gray-200">
                            {order_data?.products?.map((item, idx) => (
                                <tr className="block md:table-row">
                                    <td className="block md:table-cell px-6 py-4">
                                        <div className="flex gap-4 items-start">
                                            <img src={item?.type === 'prop' ? import.meta.env.VITE_APIBASE_URL + item?.prop_image : import.meta.env.VITE_APIBASE_URL + item?.product_image}
                                                alt={item?.type === 'prop' ? item?.prop_name : item?.product_name} className="w-12 h-12 rounded-md" />
                                            <div>
                                                <div className="font-medium text-base">{item?.type === 'prop' ? item?.prop_name : item?.product_name}</div>
                                                {item?.type === 'product' && <div className="text-xs text-gray-500 mb-1">Delivery Time: {item?.delivery_time}</div>}
                                                {item?.type === 'product' && <span className="text-xs text-gray-600 bg-gray-100 py-0.5 rounded-full">Weight: {item?.weight / 1000} KG</span>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="block md:table-cell px-6 py-4">{item.qty}x</td>
                                    <td className="block md:table-cell px-6 py-4">₹ {item.product_price}</td>
                                    <td className="block md:table-cell px-6 py-4 font-bold">₹ {item.qty * item.product_price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='grid grid-cols-1 mt-2 md:grid-cols-1 lg:grid-cols-3 gap-2'>
                <div className='border-1 border-gray-200 p-2 shadow-sm'>
                    <p className='mb-0 font-semibold'>Shipping Details</p>
                    <ul>
                        <li>{order_data?.order_details?.full_name}</li>
                        <li>{order_data?.order_details?.house_no}, {order_data?.order_details?.area},</li>
                        <li>{order_data?.order_details?.city}, {order_data?.order_details?.state},</li>
                        <li>{order_data?.order_details?.country} - {order_data?.order_details?.pincode}</li>
                        <li>Mobile: {order_data?.order_details?.mobile_number}</li>
                    </ul>
                </div>
                <div className='border-1 border-gray-200 p-2 shadow-sm'>
                    <p className='mb-0 font-semibold'>Billing Details</p>
                    <ul>
                        <li>{billingAddress?.full_name}</li>
                        <li>{billingAddress?.house_no}, {billingAddress?.area},</li>
                        <li>{billingAddress?.city}, {billingAddress?.state},</li>
                        <li>{billingAddress?.country} - {billingAddress?.pincode}</li>
                        <li>Mobile: {billingAddress?.mobile_number}</li>
                    </ul>
                </div>
                <div className='border-1 border-gray-200 p-2 shadow-sm'>
                    <p className='mb-0 font-semibold'>Order Details</p>
                    <table className='w-full mt-2'>
                        <tbody>
                            <tr>
                                <td className='font-medium pb-2'>Order Date:</td>
                                <td className='pb-2 uppercase'>{
                                    order_data?.order_details?.date_of_order
                                        ? new Date(order_data.order_details.date_of_order).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        }).replace(/\//g, '-')
                                        : ''
                                }</td>
                            </tr>
                            <tr>
                                <td className='font-medium pb-2'>Order Status:</td>
                                <td className='pb-2'>
                                    {
                                        order_data?.order_details?.order_status === "Pending" ?
                                            <span className='px-1 border-1 border-yellow-400 bg-green-300 rounded text-sm'>Pending</span> :
                                            order_data?.order_details?.order_status === "cancelled" ?
                                                <span className='px-1 border-1 border-green-400 bg-red-300 rounded text-sm'>Cancelled</span> :
                                                order_data?.order_details?.order_status === "success" ?
                                                    <span className='px-1 border-1 border-green-400 bg-green-300 rounded text-sm'>Success</span>
                                                    : ''
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className='font-medium pb-2'>Delivery Status:</td>
                                <td className='pb-2'>
                                    {
                                        order_data?.order_details?.order_status === "Pending" ?
                                            <span className='px-1 border-1 border-yellow-400 bg-green-300 rounded text-sm'>Pending</span> :
                                            order_data?.order_details?.order_status === "cancelled" ?
                                                <span className='px-1 border-1 border-green-400 bg-red-300 rounded text-sm'>Cancelled</span> :
                                                order_data?.order_details?.order_status === "success" ?
                                                    <span className='px-1 border-1 border-green-400 bg-green-300 rounded text-sm'>Success</span>
                                                    : ''
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className='font-medium pb-2'>Total Amount:</td>
                                <td className='pb-2 font-semibold'>₹ {order_data?.order_details?.total_amount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}
export default Orderdetails
