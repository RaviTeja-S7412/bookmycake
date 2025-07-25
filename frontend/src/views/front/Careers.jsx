import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../components/axios";
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'

export default function Careers() {

    const [visible, setVisible] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        comment: ""
    });

    const [message, setMessage] = useState("");

    const openModal = () => {
        setVisible(true);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/front/enquiry", formData);
            setMessage(response.data.message);
            setFormData({ name: "", email: "", mobile: "", comment: "" });
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };


    return (
        <div className="default-width font-[Poppins] mx-auto sm:px-5 mb-5">
            <h2 className="text-2xl poppins-bold tracking-tight pt-5 text-gray-900 mb-3">Careers</h2>
            <div className="shadow-md p-3 rounded bg-white">
                {/* Job Title and Apply Button */}
                <div className="2xl:grid 2xl:grid-cols-2 xl:grid xl:grid-cols-2 lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="!font-semibold">The Bakery & Confectionary Chef</h4>
                    </div>
                    <div className="ml-auto">
                        <button className="px-5 py-2 border rounded-full !bg-[#ed1016] text-white border-2 border-white" onClick={openModal}>Apply</button>
                    </div>
                </div>
                {/* Job Entities */}
                <div class="2xl:grid 2xl:grid-cols-4 xl:grid xl:grid-cols-4 lg:grid lg:grid-cols-4 md:grid md:grid-cols-4 gap-4 mt-4 bg-gray-200 py-2 px-3 rounded-lg">
                    <div>
                        <p className="font-semibold mb-0">Location</p>
                        <p className="text-sm">Gurgaon</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-0">Relevant Experience</p>
                        <p className="text-sm">2 to 4 years</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-0"> Gender</p>
                        <p className="text-sm">Male</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-0">Education</p>
                        <p className="text-sm">Graduation & relevant education <br />will be an added advantage</p>
                    </div>
                </div>
                {/* Job Description */}
                <div className="job-description xs:p-2 sm:mt-5">
                    <p className="font-semibold mb-2">Job Description</p>
                    <ul className="text-gray-700 text-sm leading-[2] list-[circle] ml-5">
                        <li>The Bakery & Confectionary Chef will be responsible for producing a wide range of baked goods and confectioneries like Cakes and Pastries, cookies and others.</li>
                        <li>This role requires creativity, precision, and an eye for detail to ensure that all products not only taste delightful but also look visually appealing.</li>
                        <li>The Bakery & Confectionary Chef will be responsible to make customised cakes and pastries for corporate orders and party orders. </li>
                        <li>The Bakery & Confectionary Chef will be responsible to ensure cleanliness and hygiene factors as required by FSSAI and other GOI departments.</li>
                        <li>The Bakery & Confectionary Chef will be responsible to understand the online order process systems via online platforms like Swiggy, Zomato and other platforms. </li>
                    </ul>
                </div>
            </div>
            <CModal
                // visible={feedbackModal}
                // onClose={() => setFeedbackModal(false)}
                className="font-['poppins']"
                size="lg"
            >
                <CModalHeader>
                    <CModalTitle>Apply Job</CModalTitle>
                </CModalHeader>
                <CModalBody>

                </CModalBody>
            </CModal>
        </div>
    );
}