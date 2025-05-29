import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
 
    return (
        <div className="flex items-center justify-center min-h-24 mt-5 mb-5 bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
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