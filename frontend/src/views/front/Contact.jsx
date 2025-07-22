import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../components/axios";

export default function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        comment: ""
    }); 

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axiosInstance.post("/front/enquiry", formData);
        setMessage(response.data.message);
        setFormData({ name: "", email: "", mobile: "", comment: ""});
    } catch (error){
        setMessage(error.response?.data?.message || "Something went wrong");
    }
  };


    return (
        <div className="sm:w-5xl font-[Poppins] mx-auto px-5">
            <form className="space-y-4 max-w-3xl w-full mx-auto" onSubmit={handleSubmit}>
                <h2 className="text-2xl poppins-bold tracking-tight pt-5 text-gray-900 mb-3">Contact</h2>
               
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        name= "name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="flex-1 p-3 border-2 border-[#5b0026] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b0026]"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email *"
                        className="flex-1 p-3 border-2 border-[#5b0026] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b0026]"
                    />
                </div>

                <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full p-3 border-2 border-[#5b0026] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b0026]"
                />

                <textarea
                    rows="4"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Comment"
                    className="w-full p-3 border-2 border-[#5b0026] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b0026] mt-3"
                ></textarea>

                <button
                    type="submit"
                    className="px-6 py-2 mt-2 bg-[#5b0026] text-white rounded-full hover:bg-[#43001c] transition"
                >
                    Send
                </button>
            </form>
        </div>
    );
}