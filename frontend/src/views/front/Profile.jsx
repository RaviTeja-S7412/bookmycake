import React, { use, useEffect, useMemo, useState } from "react";
import { CIcon } from '@coreui/icons-react';
import { cilEnvelopeLetter, cilPhone, cilUser, cilPencil } from '@coreui/icons';
import { CTable, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import axiosIntance from "../../components/axios";
import ReactDatatable from "../../components/datatables/ReactDatatable";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {

    const [ loading, setLoading ] = useState(false);
    const [ orders, setOrders ] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ shippingAddress, setShippingaddress ] = useState({});
    const [ billingAddress, setBillingaddress ] = useState({});
    const navigate = useNavigate();
    const user_data = localStorage.getItem("user_data") ? JSON.parse(localStorage.getItem("user_data")) : {};

    const get_orders = async () => {
        setLoading(true);
        setOrders([]);

        const params = {
            user_id: localStorage.getItem('user_id')
        };
        
        try {
        const res = await axiosIntance.post(`/front/orders/get_userorders`, params);

        if (res.status === 200) {
            setOrders(res.data.orders)
        } else {
        }
        } catch (error) {
        // console.error('Error fetching product:', error);
        // Handle API error
        } finally {
        setLoading(false);
        }
    };

    const getOrderdetails = async (order_id) => {
        setLoading(true);
        setProducts([]);
        setShippingaddress({});
        setBillingaddress({});
        const params = {};
        params.order_id = order_id;
        try {
            const res = await axiosIntance.post(`/admin/orders/get_order_details`, params);
            if (res.status === 200) {
                const odata = orders?.find((item) => item.order_id == order_id);
                setShippingaddress({
                    full_name: odata?.full_name,
                    house_no: odata?.house_no,
                    area: odata?.area,
                    city: odata?.city,
                    state: odata?.state,
                    country: odata?.country,
                    pincode: odata?.pincode,
                    mobile_number: odata?.mobile_number
                });
                setBillingaddress(odata?.billing_address && JSON.parse(odata?.billing_address));
                setProducts(res?.data?.products);
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
        get_orders();
    }, [])

    useEffect(() => {
        if(!localStorage.getItem('user_id')){
            navigate('/login');
        }
    }, []);

    const [activeSection, setActiveSection] = React.useState("My Profile");
    const [visible, setVisible] = useState(false);

    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: (row, key) => `${++key}`,
                sortable: true,
            },
            {
                name: 'Order ID',
                selector: (row) => {
                    return (
                        <>
                            <span title="View Order Details" style={{cursor: 'pointer', color: 'blue'}} onClick={() => {
                                getOrderdetails(row?.order_id);
                                setVisible(!visible);
                            }} className='mr-2'>
                                {row?.order_id}
                            </span>
                        </>
                    )
                },
                sortable: true,
            },
            {
                name: 'Customer Name',
                cell: (row) => `${row.first_name} ${row.last_name}`,
                sortable: true,
            },
            {
                name: 'Total Amount',
                selector: (row) => `₹ ${row.total_amount}`,
                sortable: true,
            },
            {
                name: 'Order Status',
                selector: (row) => {
                    if(row.order_status === "Pending"){
                        return <span className='badge bg-yellow-500'>Pending</span>
                    }else if(row.order_status === "cancelled"){
                        return <span className='badge  bg-red-500'>Cancelled</span>
                    }else if(row.order_status === "success"){
                        return <span className='badge bg-green-500'>Success</span>
                    }
                },
                sortable: true,
            },
            {
                name: 'Payment Status',
                selector: (row) => {
                    if(row.payment_status === "Pending"){
                        return <span className='badge bg-yellow-500'>Pending</span>
                    }else if(row.payment_status === "failed"){
                        return <span className='badge  bg-red-500'>Failed</span>
                    }else if(row.payment_status === "success"){
                        return <span className='badge bg-green-500'>Success</span>
                    }
                },
                sortable: true,
            },
            {
                name: 'Delivery Status',
                selector: (row) => {
                    if(row.delivery_status === "Pending"){
                        return <span className='badge bg-yellow-500'>Pending</span>
                    }else if(row.delivery_status === "failed"){
                        return <span className='badge  bg-red-500'>Failed</span>
                    }else if(row.delivery_status === "Delivered"){
                        return <span className='badge bg-green-500'>Delivered</span>
                    }else if(row.delivery_status === "out"){
                        return <span className='badge' style={{ backgroundColor: '#3b82f6', color: '#fff' }}>Out For Delivery</span>
                    }
                },
                sortable: true,
            },
            {
                name: 'Order Date',
                selector: (row) => {
                    const date = new Date(row.date_of_order);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    return `${day}-${month}-${year}`;
                },
                sortable: true,
            },
            {
                name: 'Payment Date',
                selector: (row) => {
                    if(row.date_of_payment !== "0000-00-00 00:00:00"){
                        const date = new Date(row.date_of_payment);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        return `${day}-${month}-${year}`;
                    }else{
                        return '-';
                    }
                },
                sortable: true,
            },
            {
                name: 'Payment Type',
                grow: 2,
                selector: (row) => {
                    if(row.payment_type == "cod"){
                        return 'Cash On Delivery'
                    }else{
                        return 'Online';
                    }
                },
                sortable: true,
            },
            /* {
                name: "Action",
                cell: (row) => (
                    <>
                        <span title="View Order" style={{cursor: 'pointer'}} onClick={() => {
                            setDeliverystatus(row.delivery_status);
                            setVisible(!visible);
                            setOrderID(row.order_id);
                        }} className='mr-2'>
                            <i className='fa fa-eye'></i>
                        </span>
                    </>
                ),
            }, */
        ],
        [],
    )

    const renderSection = () => {
        switch (activeSection) {
            case "Address Book":
                return (
                    <section className="flex-1 bg-white shadow rounded p-6">
                        <h2 className="text-lg font-semibold mb-4">Address Book</h2>
                        <p>No addresses saved.</p>
                    </section>
                );
            case "My Orders":
                return (
                    <section className="flex-1 bg-white shadow rounded p-6 overflow-x-auto">
                        <h2 className="text-lg font-semibold mb-4">My Orders</h2>
                        {orders.length > 0 && <ReactDatatable columns={columns} data={orders} actions={false} loading={loading} />}
                    </section>
                );
            case "My Reviews":
                return (
                    <section className="flex-1 bg-white shadow rounded p-6">
                        <h2 className="text-lg font-semibold mb-4">My Reviews</h2>
                        <p>No reviews yet.</p>
                    </section>
                );
            case "My Profile":
            default:
                return (
                    <section className="flex-1 bg-white shadow rounded p-6">
                        <h2 className="text-lg font-semibold mb-4">Profile Details</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input className="w-full border rounded p-2" value={user_data?.first_name+' '+user_data?.last_name} readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Mobile</label>
                                <input
                                    className="w-full border rounded p-2"
                                    value={user_data?.mobile_number}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                    className="w-full border rounded p-2"
                                    value={user_data?.email}
                                    readOnly
                                />
                            </div>
                            <button className="bg-red-500 text-white px-4 py-2 rounded mt-2">
                                Edit Profile
                            </button>
                        </form>
                    </section>
                );
        }
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center font-['poppins']">
            <header className="w-full bg-white shadow p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <CIcon icon={cilUser} size="xl" />
                    <span className="text-lg font-bold">{user_data?.first_name} {user_data?.last_name}</span>
                </div>
                <div className="text-sm text-gray-600 flex items-center">
                    <CIcon icon={cilEnvelopeLetter} size="l" className="w-5 h-5 mr-1" />
                    <span className="mr-4">{user_data?.email}</span>
                    <CIcon icon={cilPhone} size="l" className="w-5 h-5 mr-1" />
                    <span> {user_data?.mobile_number}</span>
                </div>
            </header>
            <main className="sm:min-h-[535px] default-width sm:flex !mt-10 gap-4">
                <aside className="w-full sm:w-64 bg-white shadow rounded p-4 space-y-4">
                    {[
                        "My Profile",
                        "My Orders",
                        "Address Book",
                        // "My Reviews",
                    ].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveSection(item)}
                            className={`w-full text-left p-2 rounded hover:bg-gray-100 ${activeSection === item ? "bg-gray-100 font-semibold" : ""
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </aside>
                {renderSection()}
            </main>
            <CModal
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
                className="font-['poppins']"
                size="lg"
            >
                <CModalHeader>
                    <CModalTitle id="LiveDemoExampleLabel">Product Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <>
                        <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="mb-10">
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {products.length > 0 ? products.map((item, idx) => (
                                <tr key={'table-'+idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td>
                                        <div className="flex mb-2">
                                            <img src={item?.type === 'prop' ? import.meta.env.VITE_APIBASE_URL+item?.prop_image : import.meta.env.VITE_APIBASE_URL+item?.product_image} className="w-20" />
                                            <div className="ml-4">
                                                <h5 className="font-bold !mb-1">{item?.type === 'prop' ? item?.prop_name : item?.product_name}<br />
                                                
                                                    {item?.type === 'product' && 
                                                    <span className='text-sm'>
                                                        Delivery Time: {item?.delivery_time}<br />
                                                        Weight: {item?.weight/1000} KG<br />
                                                        Flavor: {item?.flavor}<br />
                                                        Message: {item?.message}
                                                    </span>
                                                }</h5>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center font-bold text-md">₹ {item?.product_price} ({item?.qty})</td>
                                
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="text-center text-gray-500">No products found</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mt-4">
                                <h5 className="font-bold">Shipping Address</h5>
                                <p className="text-sm">
                                    <span className='font-bold'>{shippingAddress?.full_name}</span><br />
                                    {shippingAddress?.house_no}, {shippingAddress?.area},<br />
                                    {shippingAddress?.city}, {shippingAddress?.state},<br />
                                    {shippingAddress?.country} - {shippingAddress?.pincode}<br />
                                    Mobile: {shippingAddress?.mobile_number}
                                </p>
                            </div>
                            <div className="mt-4">
                                <h5 className="font-bold">Billing Address</h5>
                                <p className="text-sm">
                                    <span className='font-bold'>{billingAddress?.full_name}</span><br />
                                    {billingAddress?.house_no}, {billingAddress?.area},<br />
                                    {billingAddress?.city}, {billingAddress?.state},<br />
                                    {billingAddress?.country} - {billingAddress?.pincode}<br />
                                    Mobile: {billingAddress?.mobile_number}
                                </p>
                            </div>
                        </div>
                    </>
                </CModalBody>
            </CModal>
        </div>
    );
}