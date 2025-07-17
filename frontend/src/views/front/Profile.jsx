import React, { use, useEffect, useMemo, useState } from "react";
import { CIcon } from '@coreui/icons-react';
import { cilEnvelopeLetter, cilPhone, cilUser, cilPencil } from '@coreui/icons';
import { CTable, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import axiosIntance from "../../components/axios";
import ReactDatatable from "../../components/datatables/ReactDatatable";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/front/Spinner";
import Modal from "../../components/Modal";

export default function UserProfile() {

    const [loading, setLoading] = useState(false);
    const [ploading, setPLoading] = useState(false);
    const [addresses, setAddresses] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [shippingAddress, setShippingaddress] = useState({});
    const [billingAddress, setBillingaddress] = useState({});
    const navigate = useNavigate();
    const user_data = localStorage.getItem("user_data") ? JSON.parse(localStorage.getItem("user_data")) : {};
    const [activeSection, setActiveSection] = React.useState("My Profile");
    const [visible, setVisible] = useState(false);
    const [addShippingModal, setAddshippingModal] = useState(false);
    const [addressId, setAddressID] = useState(false);
    const [addshippingAddress, setAddShippingaddress] = useState({
        full_name: '',
        house_no: '',
        area: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        mobile_number: ''
    });
    const [formData, setFormData] = useState({
        first_name: user_data?.first_name || '',
        last_name: user_data?.last_name || '',
        email: user_data?.email || '',
        mobile_number: user_data?.mobile_number || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const updateProfile = async () => {
        const user_id = localStorage.getItem('user_id');
        const params = {
            user_id: user_id,
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            mobile_number: formData.mobile_number
        }

        try {
            const res = await axiosIntance.post(`/front/updateuserProfile`, params);

            if (res.status === 200) {
                localStorage.setItem("user_data", JSON.stringify(res.data.user_data));
                location.reload();
            } else {
                Swal.fire({
                    title: res.data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        } catch (error) {
            // console.error('Error fetching product:', error);
            // Handle API error
        } finally {
            setLoading(false);
        }
    }

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

    const get_user_addresses = async () => {
        setLoading(true);
        setAddresses([]);

        const params = {
            user_id: localStorage.getItem('user_id')
        };

        try {
            const res = await axiosIntance.post(`/front/get_user_addresses`, params);

            if (res.status === 200) {
                setAddresses(res.data.user_addresses)
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
        setPLoading(true);
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
            setPLoading(false);
        }
    };

    useEffect(() => {
        get_orders();
        get_user_addresses();
    }, [])

    useEffect(() => {
        if (!localStorage.getItem('user_id')) {
            navigate('/login');
        }
    }, []);

    const editAddress = (address) => {
        if (address) {
            setAddShippingaddress(address);
            setAddressID(address.id);
        } else {
            setAddShippingaddress({
                full_name: '',
                house_no: '',
                area: '',
                city: '',
                state: '',
                country: '',
                pincode: '',
                mobile_number: ''
            })
        }
        setAddshippingModal(true);
    }

    const cancelAddress = (address) => {
        setAddShippingaddress({
            full_name: '',
            house_no: '',
            area: '',
            city: '',
            state: '',
            country: '',
            pincode: '',
            mobile_number: ''
        });
        setAddressID('');
        setAddshippingModal(false);
    }

    const saveAddress = async () => {
        const user_id = localStorage.getItem('user_id');
        const params = {
            user_id: user_id,
            full_name: addshippingAddress.full_name,
            mobile_number: addshippingAddress.mobile_number,
            country: addshippingAddress.country,
            state: addshippingAddress.state,
            house_no: addshippingAddress.house_no,
            area: addshippingAddress.area,
            city: addshippingAddress.city,
            pincode: addshippingAddress.pincode
        }
        if (addressId) {
            params.address_id = addressId;
        }

        try {
            const res = await axiosIntance.post(`/front/save_user_address`, params);

            if (res.status === 200) {
                get_user_addresses();
                cancelAddress();
            } else {
                Swal.fire({
                    title: res.data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        } catch (error) {
            // console.error('Error fetching product:', error);
            // Handle API error
        } finally {
            setLoading(false);
        }
    }

    const deleteAddress = async (id) => {
        setLoading(true);
        try {
            const res = await axiosIntance.post(`/front/deleteAddress`, { id });

            if (res.status === 200) {
                get_user_addresses();
            } else {
                Swal.fire({
                    title: res.data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        } catch (error) {
            // console.error('Error fetching product:', error);
            // Handle API error
        } finally {
            setLoading(false);
        }
    }

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
                            <span title="View Order Details" style={{ cursor: 'pointer', color: 'blue' }} onClick={() => {
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
                    if (row.order_status === "Pending") {
                        return <span className='badge bg-yellow-500'>Pending</span>
                    } else if (row.order_status === "cancelled") {
                        return <span className='badge  bg-red-500'>Cancelled</span>
                    } else if (row.order_status === "success") {
                        return <span className='badge bg-green-500'>Success</span>
                    }
                },
                sortable: true,
            },
            {
                name: 'Payment Status',
                selector: (row) => {
                    if (row.payment_status === "Pending") {
                        return <span className='badge bg-yellow-500'>Pending</span>
                    } else if (row.payment_status === "failed") {
                        return <span className='badge  bg-red-500'>Failed</span>
                    } else if (row.payment_status === "success") {
                        return <span className='badge bg-green-500'>Success</span>
                    }
                },
                sortable: true,
            },
            {
                name: 'Delivery Status',
                selector: (row) => {
                    if (row.delivery_status === "Pending") {
                        return <span className='badge bg-yellow-500'>Pending</span>
                    } else if (row.delivery_status === "failed") {
                        return <span className='badge  bg-red-500'>Failed</span>
                    } else if (row.delivery_status === "Delivered") {
                        return <span className='badge bg-green-500'>Delivered</span>
                    } else if (row.delivery_status === "out") {
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
                    if (row.date_of_payment !== "0000-00-00 00:00:00") {
                        const date = new Date(row.date_of_payment);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        return `${day}-${month}-${year}`;
                    } else {
                        return '-';
                    }
                },
                sortable: true,
            },
            {
                name: 'Payment Type',
                grow: 2,
                selector: (row) => {
                    if (row.payment_type == "cod") {
                        return 'Cash On Delivery'
                    } else {
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

    console.log(shippingAddress, billingAddress);


    const renderSection = () => {
        switch (activeSection) {
            case "Address Book":
                return (
                    <section className="flex-1 bg-white shadow rounded p-6">
                        <h2 className="text-lg font-semibold mb-4">Address Book</h2>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <>
                                <div className="grid grid-cols-3 gap-4">
                                    {addresses && addresses.length > 0 ? addresses.map((address, index) => (
                                        <div key={index} className="border p-4 rounded">
                                            <h5 className="font-bold">{address.full_name}</h5>
                                            <p>{address.house_no}, {address.area}, {address.city}, {address.state}, {address.country} - {address.pincode}</p>
                                            <p>Mobile: {address.mobile_number}</p>
                                            <button className="btn btn-primary btn-sm text-white-500 mt-2 !mr-2" onClick={() => {
                                                editAddress(address);
                                            }}>Edit</button>
                                            <button className="btn btn-danger btn-sm mt-2 text-white" onClick={async () => {
                                                if (window.confirm("Are you sure you want to delete this address?")) {
                                                    deleteAddress(address.id);
                                                }
                                            }}>Delete</button>
                                        </div>
                                    )) : (
                                        <p>No addresses found.</p>
                                    )}
                                </div>
                                <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded" onClick={() => {
                                    editAddress();
                                }}>Add New Address</button>
                            </>
                        )}
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
                        <div className="grid grid-cols-2 gap-3">
                            <div className="w-full p-2">
                                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); updateProfile(); }}>
                                    <div>
                                        <label className="block text-sm font-medium">First Name</label>
                                        <input className="w-full border rounded p-2" name="first_name" value={formData.first_name} onChange={handleChange} readOnly={!editMode} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Last Name</label>
                                        <input className="w-full border rounded p-2" name="last_name" value={formData.last_name} onChange={handleChange} readOnly={!editMode} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Email</label>
                                        <input className="w-full border rounded p-2" name="email" value={formData.email} onChange={handleChange} readOnly={!editMode} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Mobile</label>
                                        <input className="w-full border rounded p-2" name="mobile_number" value={formData.mobile_number} onChange={handleChange} readOnly={!editMode} />
                                    </div>
                                    {!editMode ? (
                                        <button type="button" onClick={() => setEditMode(true)} className="bg-red-500 text-white px-2 py-2 rounded mt-2">Edit Profile</button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button type="submit" className="bg-green-500 text-white px-2 py-2 rounded mt-2">Save Changes</button>
                                            <button type="button" onClick={() => {
                                                setEditMode(false);
                                                setFormData({
                                                    first_name: user_data.first_name,
                                                    last_name: user_data.last_name,
                                                    email: user_data.email,
                                                    mobile_number: user_data.mobile_number
                                                });
                                            }} className="bg-gray-400 text-white px-4 py-2 rounded mt-2">Cancel</button>
                                        </div>
                                    )}
                                </form>
                            </div>
                            <div className="w-full p-2">
                                <p className="font-semibold text-lg">Update Password</p>
                                <form className="space-y-4 mt-4" onSubmit={(e) => { e.preventDefault(); navigate('/update-password'); }}>
                                    <div>
                                        <label className="block text-sm font-medium">Current Password</label>
                                        <input type="password" className="w-full border rounded p-2" name="current_password" placeholder="Enter current password" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">New Password</label>
                                        <input type="password" className="w-full border rounded p-2" name="new_password" placeholder="Enter new password" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Confirm New Password</label>
                                        <input type="password" className="w-full border rounded p-2" name="confirm_new_password" placeholder="Confirm new password" />
                                    </div>
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Update Password</button>
                                </form>
                            </div>
                        </div>
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
                    <CIcon icon={cilEnvelopeLetter} size="lg" className="w-5 h-5 mr-1" />
                    <span className="mr-4">{user_data?.email}</span>
                    <CIcon icon={cilPhone} size="lg" className="w-5 h-5 mr-1" />
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
                    {ploading ?
                        <Spinner />
                        :
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
                                        <tr key={'table-' + idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td>
                                                <div className="flex mb-2">
                                                    <img src={item?.type === 'prop' ? import.meta.env.VITE_APIBASE_URL + item?.prop_image : import.meta.env.VITE_APIBASE_URL + item?.product_image} className="w-20" />
                                                    <div className="ml-4">
                                                        <h5 className="font-bold !mb-1">{item?.type === 'prop' ? item?.prop_name : item?.product_name}<br />

                                                            {item?.type === 'product' &&
                                                                <span className='text-sm'>
                                                                    Delivery Time: {item?.delivery_time}<br />
                                                                    Weight: {item?.weight / 1000} KG<br />
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
                                {shippingAddress?.full_name && (
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
                                )}
                                {billingAddress?.full_name && (
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
                                )}
                            </div>
                        </>
                    }
                </CModalBody>
            </CModal>

            <Modal isOpen={addShippingModal} onClose={() => {
                cancelAddress();
            }} className="modal-dialog modal-lg">
                <>
                    <p className="text-xl font-semibold mb-4">{addressId ? 'Edit' : 'Add'} Shipping Address</p>
                    <form onSubmit={e => {
                        e.preventDefault();
                        saveAddress()
                    }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                className={'border rounded px-3 py-2'}
                                placeholder="Full Name"
                                value={addshippingAddress.full_name || ""}
                                onChange={e => {
                                    setAddShippingaddress({ ...addshippingAddress, full_name: e.target.value })
                                }}
                                required
                            />
                            <input
                                type="text"
                                className={'border rounded px-3 py-2'}
                                placeholder="Mobile Number"
                                value={addshippingAddress.mobile_number || ""}
                                onChange={e => {
                                    setAddShippingaddress({ ...addshippingAddress, mobile_number: e.target.value });
                                }}
                                required
                                maxLength={10}
                            />
                            <select
                                className={'border rounded px-3 py-2'}
                                value={addshippingAddress.country || ""}
                                onChange={e => { setAddShippingaddress({ ...addshippingAddress, country: e.target.value }); }}
                                required
                            >
                                <option value="">Select Country</option>
                                <option value="India">India</option>
                                <option value="United States">United States</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Australia">Australia</option>
                                <option value="Canada">Canada</option>
                                <option value="Germany">Germany</option>
                                <option value="France">France</option>
                                <option value="Singapore">Singapore</option>
                                <option value="United Arab Emirates">United Arab Emirates</option>
                                <option value="Japan">Japan</option>
                                <option value="China">China</option>
                                <option value="Brazil">Brazil</option>
                                <option value="South Africa">South Africa</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Italy">Italy</option>
                                <option value="Spain">Spain</option>
                                <option value="Russia">Russia</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Switzerland">Switzerland</option>
                                {/* Add more countries as needed */}
                            </select>
                            <select
                                className={'border rounded px-3 py-2'}
                                value={addshippingAddress.state || ""}
                                onChange={e => { setAddShippingaddress({ ...addshippingAddress, state: e.target.value }); }}
                                required
                            >
                                <option value="">Select State</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option value="Ladakh">Ladakh</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Puducherry">Puducherry</option>
                            </select>
                            <input
                                type="text"
                                className={'border rounded px-3 py-2'}
                                placeholder="Flat, House no., Building, Company, Apartment"
                                value={addshippingAddress.house_no || ""}
                                onChange={e => { setAddShippingaddress({ ...addshippingAddress, house_no: e.target.value }); }}
                                required
                            />
                            <input
                                type="text"
                                className={'border rounded px-3 py-2'}
                                placeholder="Area, Street, Sector, Village"
                                value={addshippingAddress.area || ""}
                                onChange={e => { setAddShippingaddress({ ...addshippingAddress, area: e.target.value }); }}
                                required
                            />
                            <input
                                type="text"
                                className="border rounded px-3 py-2"
                                placeholder="Landmark"
                                value={addshippingAddress.landmark || ""}
                                onChange={e => setAddShippingaddress({ ...addshippingAddress, landmark: e.target.value })}
                            />
                            <input
                                type="text"
                                className={'border rounded px-3 py-2'}
                                placeholder="City"
                                value={addshippingAddress.city || ""}
                                onChange={e => { setAddShippingaddress({ ...addshippingAddress, city: e.target.value }); }}
                                required
                            />
                            <input
                                type="text"
                                className={'border rounded px-3 py-2'}
                                placeholder="Pincode"
                                value={addshippingAddress.pincode || ""}
                                onChange={e => { setAddShippingaddress({ ...addshippingAddress, pincode: e.target.value }); }}
                                required
                                maxLength={6}
                            />
                        </div>
                        <div className="flex items-center mt-4 gap-3">
                            <button
                                type="submit"
                                className="px-4 py-2 border rounded-full bg-[#bc4d5e] text-white mt-0"
                            >
                                Save Address
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 border rounded-full bg-black text-white mt-0"
                                onClick={() => cancelAddress()}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </>
            </Modal>
        </div>
    );
}