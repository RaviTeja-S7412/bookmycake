import React, { useState } from "react";

export default function OurStory() {

    return (
        <div className="default-width font-[Poppins] mx-auto 2xl:px-5 xl:px-5 lg:px-5 md:px-0 mb-5">
            <div className="2xl:grid 2xl:grid-cols-3 xl:grid xl:grid-cols-3 lg:grid lg:grid-cols-3 gap-4 mt-5">
                <div className="bg-white p-5 shadow-md rounded-lg">
                    <h2 className="!font-semibold"><i class="fa-solid fa-location-dot"></i> Our Location</h2>
                    <ul className="text-gray-700 text-xl leading-[2] mt-3">
                        <li>Bookmycake Private Limited</li>
                        <li>1114, Sohna Road, Sector 47 Gurugram</li>
                        <li>Haryana-122018</li>
                    </ul>
                </div>
                <div className="col-span-2 bg-white shadow-md rounded-lg p-2 ">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.750682624774!2d77.03823779999999!3d28.4267789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19ce55555555%3A0x4349d148cf9c3615!2sBookMyCake!5e0!3m2!1sen!2sin!4v1753431244820!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}