import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosIntance from "../../components/axios";
import Swal from "sweetalert2";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [pass, setPass] = useState('');
    const [cpass, setCPass] = useState('');
    const [loading, setLoading] = useState('');

    const forgotsubmit = async (e) => {
        e.preventDefault();
        const params = {
            user_id: searchParams.get('user_id'),
            password: pass,
            cpassword: cpass
        };
        
        try {
        const res = await axiosIntance.post(`/front/resetPassword`, params);

        if (res.status === 200) {
            navigate('/login')
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
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
                <form onSubmit={(e) => forgotsubmit(e)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Password</label>
                        <input
                            required
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Confirm Password</label>
                        <input
                            required
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            onChange={(e) => setCPass(e.target.value)}
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