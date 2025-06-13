import React, { useEffect, useMemo, useState } from "react";
import { CIcon } from '@coreui/icons-react';
import { cilEnvelopeLetter, cilPhone, cilUser, cilPencil } from '@coreui/icons';
import { CTable, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import axiosIntance from "../../components/axios";
import ReactDatatable from "../../components/datatables/ReactDatatable";

export default function UserProfile() {

    const [ loading, setLoading ] = useState(false);
    const [ orders, setOrders ] = useState([]);
    const user_data = localStorage.getItem("user_data") ? JSON.parse(localStorage.getItem("user_data")) : {};

    const get_orders = async () => {
        setLoading(true);
        setOrders([]);

        const params = {
            user_id: localStorage.getItem('user_id')
        };

        try {
        const res = await axiosIntance.post(`/front/orders/get_userorders`, { params });

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

    useEffect(() => {
        get_orders();
    }, [])

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
                selector: (row) => `${row.order_id}`,
                sortable: true,
            },
            {
                name: 'Customer Name',
                cell: (row) => `${row.first_name} ${row.last_name}`,
                sortable: true,
            },
            {
                name: 'Area',
                selector: (row) => `${row.area_name}`,
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
            case "My Orders":
                return (
                    <section className="flex-1 bg-white shadow rounded p-6 overflow-x-auto">
                        <h2 className="text-lg font-semibold mb-4">My Orders</h2>
                        {orders.length > 0 && <ReactDatatable columns={columns} data={orders} actions={false} loading={loading} />}
                    </section>
                );
            case "Address Book":
                return (
                    <section className="flex-1 bg-white shadow rounded p-6">
                        <h2 className="text-lg font-semibold mb-4">Address Book</h2>
                        <p>No addresses saved.</p>
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
                        "My Orders",
                        // "Address Book",
                        "My Profile",
                        "My Reviews",
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
                    <table class="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="mb-10">
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="flex">
                                        <img src="/assets/images/products/featured/almond.jpg" className="w-20" />
                                        <div className="ml-4">
                                            <h5 className="font-bold !mb-1">Almonds Cake</h5>
                                            <p className="font-semibold !mb-1">Almond Truffle</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center font-bold text-md">500/-</td>
                                <td>
                                    <div className="flex items-center justify-center gap-2 text-sm">
                                        <span className="w-2 h-2 rounded-full bg-green-700"></span>
                                        Delivered on 22-05-2025
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CModalBody>
            </CModal>
        </div>
    );
}