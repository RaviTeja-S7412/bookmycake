import React, { useState } from "react";
import { CIcon } from '@coreui/icons-react';
import { cilEnvelopeLetter, cilPhone, cilUser, cilPencil } from '@coreui/icons';
import { CTable, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

export default function UserProfile() {

    const columns = [
        {
            key: 'OrderID',
            _props: { scope: 'col' },
        },
        {
            key: 'area',
            label: 'Area',
            _props: { scope: 'col' },
        },
        {
            key: 'total_amount',
            label: 'Total Amount',
            _props: { scope: 'col' },
        },
        {
            key: 'order_status',
            label: 'Order Status',
            _props: { scope: 'col' },
        },
        {
            key: 'payment_status',
            label: 'Payment Status',
            _props: { scope: 'col' },
        },
        {
            key: 'delivery_status',
            label: 'Delivery Status',
            _props: { scope: 'col' },
        },
        {
            key: 'delivery_time',
            label: 'Delivery Time',
            _props: { scope: 'col' },
        },
        {
            key: 'order_date',
            label: 'Order Date',
            _props: { scope: 'col' },
        },
        {
            key: 'payment_date',
            label: 'Payment Date',
            _props: { scope: 'col' },
        },
        {
            key: 'action',
            label: 'Action',
            _props: { scope: 'col' },
        },
    ]
    const items = [
        {
            OrderID: 'Mark',
            area: 'Otto',
            total_amount: '@mdo',
            order_status: 'Success',
            payment_status: 'Success',
            delivery_status: 'Pending',
            delivery_time: '7.30 PM',
            order_date: '01-02-2025',
            payment_date: '01-02-2025',
            action: (
                <div>
                    <button className="flex rounded mx-auto text-center" onClick={() => setVisible(!visible)}>
                        <img src="/assets/open-eye.png" className="w-5 h-5" />
                    </button>
                </div>
            ),
            _cellProps: { id: { scope: 'row' } },
        },
        {
            OrderID: 'Jacob',
            area: 'Thornton',
            total_amount: '@fat',
            order_status: 'Success',
            payment_status: 'Success',
            delivery_status: 'Pending',
            delivery_time: '8.30 PM',
            order_date: '01-02-2025',
            payment_date: '01-02-2025',
            action: (
                <div>
                    <button className="flex rounded mx-auto text-center" onClick={() => setVisible(!visible)}>
                        <img src="/assets/open-eye.png" className="w-5 h-5" />
                    </button>
                </div>
            ),
            _cellProps: { id: { scope: 'row' } },
        },
    ]


    const [activeSection, setActiveSection] = React.useState("My Profile");
    const [visible, setVisible] = useState(false)

    const renderSection = () => {
        switch (activeSection) {
            case "My Orders":
                return (
                    <section className="flex-1 bg-white shadow rounded p-6 overflow-x-auto">
                        <h2 className="text-lg font-semibold mb-4">My Orders</h2>
                        <CTable columns={columns} items={items} className="border" />
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
                                <input className="w-full border rounded p-2" value="sai" readOnly />
                            </div>
                            <div className="flex gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Birthday</label>
                                    <select className="border rounded p-2 mr-2">
                                        <option>Date</option>
                                    </select>
                                    <select className="border rounded p-2">
                                        <option>Month</option>
                                    </select>
                                    <select className="border rounded p-2">
                                        <option>Year</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Gender</label>
                                <div className="flex gap-4 mt-1">
                                    {["Male", "Female", "Others"].map((g) => (
                                        <label key={g} className="flex items-center gap-1">
                                            <input type="radio" name="gender" />
                                            {g}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Mobile</label>
                                <input
                                    className="w-full border rounded p-2"
                                    value="8019291105"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                    className="w-full border rounded p-2"
                                    value="pscsherry5@gmail.com"
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
                    <span className="text-lg font-bold">John Doe</span>
                </div>
                <div className="text-sm text-gray-600 flex items-center">
                    <CIcon icon={cilEnvelopeLetter} size="l" className="w-5 h-5 mr-1" />
                    <span className="mr-4">johndoe@gmail.com</span>
                    <CIcon icon={cilPhone} size="l" className="w-5 h-5 mr-1" />
                    <span> 9632587410</span>
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