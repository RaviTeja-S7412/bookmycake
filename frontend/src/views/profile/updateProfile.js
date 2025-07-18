import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaImage, FaLock } from 'react-icons/fa';
import axios from 'axios';

const UpdateProfile = () => {
  const [activeForm, setActiveForm] = useState('profile');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const userId = 1; // Replace with actual user ID

  const handleProfileUpdate = async () => {
    try {
      const res = await axios.post(`admin/updateProfile/${userId}`, {
        first_name: firstName,
        email: email,
      });

      alert(res.data.message || 'Profile updated successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Profile update failed');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start p-8 md:space-x-20 space-y-6 md:space-y-0">
      {/* Left Section */}
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
        </div>
        <p className="mt-2 font-semibold text-lg">Super Admin</p>
        <div className="flex space-x-3 mt-4">
          <button
            onClick={() => setActiveForm('profile')}
            className={`px-6 py-2 rounded-full text-sm text-white ${
              activeForm === 'profile' ? 'bg-[#7c3aed]' : 'bg-gray-400'
            }`}
          >
            Update Profile
          </button>
          <button
            onClick={() => setActiveForm('password')}
            className={`px-6 py-2 rounded-full text-sm text-white ${
              activeForm === 'password' ? 'bg-[#3b82f6]' : 'bg-gray-400'
            }`}
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full max-w-md space-y-4">
        {activeForm === 'profile' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <FaUser size={14} />
                </span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 pl-9 pr-4 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <FaEnvelope size={14} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 pl-9 pr-4 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleProfileUpdate}
                className="bg-[#10b981] text-white px-4 py-1.5 rounded-md text-sm"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setFirstName('');
                  setEmail('');
                }}
                className="bg-[#1f2937] text-white px-4 py-1.5 rounded-md text-sm"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {activeForm === 'password' && (
          <>
            {/* Password form (no API integration yet) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <FaLock size={14} />
                </span>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded-md py-2 pl-9 pr-4 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <FaLock size={14} />
                </span>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 rounded-md py-2 pl-9 pr-4 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button className="bg-[#10b981] text-white px-4 py-1.5 rounded-md text-sm">Update</button>
              <button className="bg-[#1f2937] text-white px-4 py-1.5 rounded-md text-sm">Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
