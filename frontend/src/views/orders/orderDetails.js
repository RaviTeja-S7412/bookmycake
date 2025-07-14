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


    return (
        <div className='w-2/3 mx-auto mt-10 p-4 rounded-sm shadow-sm font-[poppins]'>
            <h5>Order Id: <span>{order_data?.order_details?.order_id}</span></h5>
            <div className='grid grid-cols-2 gap-3 mt-4'>
                <div className='border-1 border-gray-200 p-2 shadow-md'>
                    <p className='mb-0 font-semibold'>Customer Details</p>
                    <table className='w-full mt-2'>
                        <tbody>
                            <tr>
                                <td className='font-medium pb-2'>Name:</td>
                                <td className='pb-2'>{order_data?.order_details?.first_name+' '+order_data?.order_details?.last_name}</td>
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
                <div className='border-1 border-gray-200 p-2'>
                    <p className='mb-0 font-semibold'>Payment Details</p>
                </div>
            </div>
        </div>
    )
}
export default Orderdetails
