import React, { useState } from "react";
import axiosIntance from "../../components/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    
    const [user_type, setUserType] = useState("retail");
    const [first_name, setFirstname] = useState("");
    const [last_name, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile_number, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            user_type,
            first_name,
            last_name,
            email,
            mobile_number,
            password,
            role: 2
        };
        try {
            const res = await axiosIntance.post('/user/signup', formData);
            console.log(res);
            
            if (res.status === 200) {
                setTimeout(() => {
                    navigate('/login');  
                }, 2000);
            }
        } catch (error) {
            console.error('Error occured:', error);
        }

    }

    return (
        <div className="flex items-center justify-center min-h-24 mt-5 mb-5 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
                <form method="POST" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="name">User Type</label>
                        <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setUserType(e.target.value)} value={user_type}>
                            <option value="retail">Retail</option>
                            <option value="corporate">Corporate</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="name">First Name</label>
                        <input
                            type="text"
                            id="name"
                            onChange={(e) => setFirstname(e.target.value)}
                            value={first_name}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your First name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="name">Last Name</label>
                        <input
                            type="text"
                            id="name"
                            onChange={(e) => setLastname(e.target.value)}
                            value={last_name}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your Last name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Mobile Number</label>
                        <input
                            type="number"
                            onChange={(e) => setMobile(e.target.value)}
                            value={mobile_number}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your mobile number"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#910f3f] text-white py-2 rounded-lg transition-transform duration-200 transform hover:scale-105 hover:bg-[#910f3f]">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}