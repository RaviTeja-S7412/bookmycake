import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosIntance from "../../components/axios";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = localStorage.getItem('guest_user_id');
        const formData = {
            user_id,
            email,
            password
        };
        try {
            const res = await axiosIntance.post('/user/signin', formData);
            console.log(res);
            
            if (res.status === 200) {

                localStorage.setItem('user_id', res.data?.user?.id);
                localStorage.setItem('user_type', res.data?.user?.user_type);
                localStorage.setItem('user_data', JSON.stringify(res.data.user));
                localStorage.setItem('token', res.data.token);

                setTimeout(() => {
                    navigate('/');  
                }, 2000);
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }
 
    return (
        <div className="flex items-center justify-center min-h-24 mt-5 mb-5 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form method="POST" onSubmit={handleSubmit}>
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
                    <div className="mb-4 text-right">
                        <a href="#" className="text-sm text-blue-600 hover:underline" onClick={() => navigate('/forgot-password')}>
                            Forgot password?
                        </a>
                    </div>
                    <button
                        type="submit"
                         className="w-full bg-[#910f3f] text-white py-2 rounded-lg transition-transform duration-200 transform hover:scale-105 hover:bg-[#910f3f]">
                        Login
                    </button>
                </form>
                <div className="mb-4 text-center mt-4">
                    <span className="text-sm text-gray-600">Don't have an account? </span>
                    <a href="#" className="text-sm text-blue-600 hover:underline" onClick={() => navigate('/sign-up')}>
                        Create account?
                    </a>
                </div>
            </div>
        </div>
    );
}