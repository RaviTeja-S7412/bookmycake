import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orderstatus() {

  const navigate = useNavigate();

  return (
    <div className="default-width sm:px-6 py-10 bg-white font-[poppins]">
      <div className="sm:grid sm:grid-cols-5 gap-4">
        <div className="sm:col-span-3 sm:col-start-2 text-center shadow p-6">
          <img src="/assets/check.png" className="w-30 mx-auto" />
          <h2 className="sm:text-3xl poppins-semibold decoration-green-800 !text-green-600 mt-4">Your Order Placed Successfully</h2>
          <p className="sm:text-xl poppins-medium decoration-green-800 mt-4">Thank you for ordering the cake from our store. Click below button to check you status.</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded mt-4 hover:bg-green-700 transition duration-300" onClick={() => navigate('/my-profile')}>
            Check Order Status
          </button>
        </div>
      </div>
      {/* <div className="sm:grid sm:grid-cols-5 gap-4">
        <div className="sm:col-span-3 sm:col-start-2 text-center shadow p-6">
          <img src="/assets/cross.png" className="w-30 mx-auto" />
          <h2 className="sm:text-3xl poppins-semibold decoration-green-800 !text-red-600 mt-4">Payment Failed</h2>
          <p className="sm:text-xl poppins-medium decoration-green-800 mt-4">Your Order has been cancelled, Click below button to Re-order.</p>
          <button className="bg-orange-600 text-white px-6 py-2 rounded mt-4 hover:bg-orange-700 transition duration-300">
            Check Payment Method
          </button>
        </div>
      </div> */}
    </div>
  );
}
