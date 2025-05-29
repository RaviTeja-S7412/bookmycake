import React from "react";
import { CIcon } from '@coreui/icons-react';
import { cilEnvelopeLetter, cilPhone, cilUser } from '@coreui/icons';

export default function UserProfile() {
    const [activeSection, setActiveSection] = React.useState("My Profile");

    const renderSection = () => {
        switch (activeSection) {
            case "My Orders":
                return (
                    <section className="flex-1 bg-white shadow rounded p-6">
                        <h2 className="text-lg font-semibold mb-4">My Orders</h2>
                        <p>No orders found.</p>
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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <header className="w-full bg-white shadow p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <CIcon icon={cilUser} size="xl"/>
                    <span className="text-lg font-bold">John Doe</span>
                </div>
                <div className="text-sm text-gray-600 flex items-center">
                    <CIcon icon={cilEnvelopeLetter} size="l" className="w-5 h-5 mr-1"/>
                    <span className="mr-4">johndoe@gmail.com</span>
                    <CIcon icon={cilPhone} size="l" className="w-5 h-5 mr-1"/>
                    <span> 9632587410</span>
                </div>
            </header>
            <main className="flex w-full max-w-6xl mt-6 gap-4">
                <aside className="w-64 bg-white shadow rounded p-4 space-y-4">
                    {[
                        "My Orders",
                        "Address Book",
                        "My Profile",
                        "My Reviews",
                    ].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveSection(item)}
                            className={`w-full text-left p-2 rounded hover:bg-gray-100 ${
                                activeSection === item ? "bg-gray-100 font-semibold" : ""
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </aside>
                {renderSection()}
            </main>
        </div>
    );
}