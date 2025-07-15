import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosIntance from "../../components/axios";
import Swal from "sweetalert2";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState('');

    const forgotsubmit = async (e) => {
        e.preventDefault();
        const params = {
            email: email
        };
        
        try {
        const res = await axiosIntance.post(`/front/forgotPassword`, params);
        console.log('res: ', res);

        if (res.status === 200) {
            /* Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.data.message,
            }) */
        } else {
            /* Swal.fire({
                icon: 'danger',
                title: 'Error',
                text: res.data.message,
            }) */
        }
        } catch (error) {
        // console.error('Error fetching product:', error);
        // Handle API error
        } finally {
            setLoading(false);
        }
    };
 
    return (
        <div className="flex items-center justify-center min-h-24 mt-5 mb-5 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                <form onSubmit={(e) => forgotsubmit(e)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input
                            required
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                         className="w-full bg-[#910f3f] text-white py-2 rounded-lg transition-transform duration-200 transform hover:scale-105 hover:bg-[#910f3f]">
                        Submit
                    </button>
                </form>
                <div className="mb-4 text-center mt-4">
                    <a href="#" className="text-sm text-blue-600 hover:underline" onClick={() => navigate('/login')}>
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
}