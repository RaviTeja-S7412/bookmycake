import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../components/axios";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

export default function Careers() {

    const [visible, setVisible] = useState(false);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        contact_number: "",
        current_location: "",
        zip_code: "",
        relevant_experience: "",
        total_experience: "",
        file: null,
    });

    const handleChange = (e) => {
        if (e.target.name === "file") {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        try {
            const response = await axiosInstance.post("/user/apply_job", formDataToSend);
            if (response?.status === 200) {
                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    contact_number: "",
                    current_location: "",
                    zip_code: "",
                    relevant_experience: "",
                    total_experience: "",
                    file: null,
                });
                setVisible(false);
            }
        } catch (error) {

        }
    };


    return (
        <div className="default-width font-[Poppins] mx-auto sm:px-5 mb-5">

            <h2 className="text-2xl poppins-bold tracking-tight pt-0 text-gray-900 my-3">Current Opportunities with BMC</h2>

            <div class="2xl:grid 2xl:grid-cols-2 xl:grid xl:grid-cols-2 lg:grid lg:grid-cols-2 gap-3">
                <div className="w-full rounded-sm p-3 shadow-sm mx-auto mt-1 bg-white">
                    <p className="!font-semibold mb-2">Job Title: <span className="!font-medium">The Bakery & Confectionary Chef</span></p>

                    {/* Eminities */}

                    <div>
                        <div className="flex gap-4">
                            <div>
                                <label className="text-sm font-semibold">Relevant Experiance</label>
                                <p className="text-sm mb-3 mt-2"><i class="fa-solid fa-suitcase mr-2"></i> 2-5 Years</p>
                            </div>
                            <div>
                                <label className="text-sm font-semibold">Location</label>
                                <p className="text-sm mb-3 mt-2"><i class="fa-solid fa-location-dot mr-2"></i> Gurgaon</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div>
                                <label className="text-sm font-semibold">Industry</label>
                                <p className="text-sm mb-3"><i class="fa-solid fa-cake-candles mr-2"></i> Bakers</p>
                            </div>
                            <div>
                                <label className="text-sm font-semibold">Gender</label>
                                <p className="text-sm mb-3"><i class="fa-solid fa-person mr-2"></i> Male</p>
                            </div>
                        </div>
                    </div>

                    {/* Qualification */}

                    <div className="mt-1">
                        <p className="font-semibold mb-2">Education</p>
                        <ul className="text-gray-700 text-sm leading-[2] list-[circle] ml-5">
                            <li>Graduation & relevant education will be an added advantage</li>
                        </ul>
                    </div>

                    {/* Remuneration */}

                    <div className="mt-1">
                        <p className="font-semibold mb-2">Remuneration</p>
                        <ul className="text-gray-700 text-sm leading-[2] list-[circle] ml-5">
                            <li>Best in the industry for the right candidate</li>
                        </ul>
                    </div>

                    {/* Description */}

                    <div className="mt-3">
                        <p className="font-semibold mb-2">Job Description</p>
                        <ul className="text-gray-700 text-sm leading-[2] list-[circle] ml-5">
                            <li>The Bakery & Confectionary Chef will be responsible for producing a wide range of baked goods and confectioneries like Cakes and Pastries, cookies and others.</li>
                            <li>This role requires creativity, precision, and an eye for detail to ensure that all products not only taste delightful but also look visually appealing.</li>
                            <li>The Bakery & Confectionary Chef will be responsible to make customised cakes and pastries for corporate orders and party orders. </li>
                            <li>The Bakery & Confectionary Chef will be responsible to ensure cleanliness and hygiene factors as required by FSSAI and other GOI departments.</li>
                            <li>The Bakery & Confectionary Chef will be responsible to understand the online order process systems via online platforms like Swiggy, Zomato and other platforms. </li>
                        </ul>
                    </div>

                    {/* CTA */}

                    <div>
                        <button className="px-5 py-2 border rounded-full !bg-[#ed1016] text-white border-2 border-white" onClick={() => setVisible(!visible)}>Apply</button>
                    </div>

                </div>
                <div className="w-full rounded-sm p-3 shadow-sm mx-auto mt-1 bg-white">
                    <p className="!font-semibold mb-2">Job Title: <span className="!font-medium">Marketing Manager (Corporate)</span></p>

                    {/* Eminities */}

                    <div>
                        <div className="flex gap-4">
                            <div>
                                <label className="text-sm font-semibold">Relevant Experiance</label>
                                <p className="text-sm mb-3 mt-2"><i class="fa-solid fa-suitcase mr-2"></i> 4-6 Years</p>
                            </div>
                            <div>
                                <label className="text-sm font-semibold">Location</label>
                                <p className="text-sm mb-3 mt-2"><i class="fa-solid fa-location-dot mr-2"></i> Gurgaon</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div>
                                <label className="text-sm font-semibold">Industry</label>
                                <p className="text-sm mb-3"><i class="fa-solid fa-bullhorn mr-2"></i> Job Portal, Media/PR/Corp Gifting </p>
                            </div>
                            <div>
                                <label className="text-sm font-semibold">Gender</label>
                                <p className="text-sm mb-3"><i class="fa-solid fa-person"></i>/<i class="fa-solid fa-person-dress mr-2"></i> Male/Female </p>
                            </div>
                        </div>
                    </div>

                    {/* Qualification */}

                    <div className="mt-1">
                        <p className="font-semibold mb-2">Education</p>
                        <ul className="text-gray-700 text-sm leading-[2] list-[circle] ml-5">
                            <li>Post Graduation & relevant education will be an added advantage</li>
                        </ul>
                    </div>

                    {/* Remuneration */}

                    <div className="mt-1">
                        <p className="font-semibold mb-2">Remuneration</p>
                        <ul className="text-gray-700 text-sm leading-[2] list-[circle] ml-5">
                            <li>Best in the industry for the right candidate</li>
                        </ul>
                    </div>

                    {/* Description */}

                    <div className="mt-3">
                        <p className="font-semibold mb-2">Job Description</p>
                        <ul className="text-gray-700 text-sm leading-[2] list-[circle] ml-5">
                            <li>Marketing and business development for Book My Cake
                                Market mapping and finding the right audience for Book My Cake
                                Ensure regular follow of revenue/business to Book My Cake
                                Competition taking, marketing research and own PR </li>
                        </ul>
                    </div>

                    {/* CTA */}

                    <div>
                        <button className="px-5 py-2 border rounded-full !bg-[#ed1016] text-white border-2 border-white" onClick={() => setVisible(!visible)}>Apply</button>
                    </div>

                </div>
            </div>

            <CModal
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
                className="border-0 font-[poppins] !rounded-none "
                size="xl"
            >
                <CModalHeader className="bg-[#ed1016] !text-white cross py-2">
                    <CModalTitle id="LiveDemoExampleLabel">Apply Job</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="2xl:grid g2xl:rid-cols-3 xl:grid xl:grid-cols-3 lg:grid lg:grid-cols-3 gap-3">
                            <div className="block">
                                <label>First Name</label>
                                <br />
                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="First Name"
                                    required
                                    onChange={handleChange}
                                    className="p-1 border-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#5b0026] w-full mt-1"
                                />
                            </div>
                            <div className="block">
                                <label>Last Name</label>
                                <br />
                                <input
                                    type="text"
                                    name="last_name"
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="p-1 border-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#5b0026] w-full mt-1"
                                />
                            </div>
                            <div className="block">
                                <label>Email</label>
                                <br />
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    placeholder="Email"
                                    className="p-1 border-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#5b0026] w-full mt-1"
                                />
                            </div>
                            <div className="block">
                                <label>Contact Number</label>
                                <br />
                                <input
                                    type="number"
                                    name="contact_number"
                                    onChange={handleChange}
                                    required
                                    placeholder="Contact Number"
                                    className="p-1 border-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#5b0026] w-full mt-1"
                                />
                            </div>
                            <div className="block">
                                <label>Current Location</label>
                                <br />
                                <input
                                    type="text"
                                    required
                                    name="current_location"
                                    onChange={handleChange}
                                    placeholder="Current Location"
                                    className="p-1 border-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#5b0026] w-full mt-1"
                                />
                            </div>
                            <div className="block">
                                <label>Zip Code</label>
                                <br />
                                <input
                                    type="number"
                                    name="zipcode"
                                    onChange={handleChange}
                                    placeholder="Zip Code"
                                    className="p-1 border-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#5b0026] w-full mt-1"
                                />
                            </div>
                            <div className="block">
                                <label>Relevant Experiance</label>
                                <br />
                                <input
                                    type="number"
                                    onChange={handleChange}
                                    name="relevant_experience"
                                    placeholder="Relevant Experiance"
                                    className="p-1 border-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#5b0026] w-full mt-1"
                                />
                            </div>
                            <div className="block">
                                <label>Total Experiance</label>
                                <br />
                                <input
                                    type="number"
                                    name="total_experience"
                                    onChange={handleChange}
                                    placeholder="Total Experiance"
                                    className="p-1 border-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#5b0026] w-full mt-1"
                                />
                            </div>
                            <div className="block">
                                <label>Upload Resume</label>
                                <br />
                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleChange}
                                    placeholder="Upload Resume"
                                    className="p-1 border-1 rounded-sm  w-full mt-1"
                                />
                            </div>
                        </div>
                        <button className="px-5 py-2 border rounded-full !bg-black text-white border-2 border-white mt-3" type="submit">Submit</button>
                        <button type="button" className="px-5 py-2 border rounded-full !bg-[#ed1016] text-white border-2 border-white mt-3" onClick={() => setVisible(false)}>Close</button>
                    </form>
                </CModalBody>
            </CModal>
        </div>
    );
}