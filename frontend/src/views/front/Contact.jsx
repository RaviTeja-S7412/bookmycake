import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosIntance from "../../components/axios";

export default function Contact() {


    return (
        <div className="sm:w-5xl font-[Poppins] mx-auto px-5">
            <form class="space-y-4 max-w-3xl w-full mx-auto">
                <h2 className="text-2xl poppins-bold tracking-tight pt-5 text-gray-900 mb-3">Contact</h2>
                <div class="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        class="flex-1 p-3 border-2 border-[#5b0026] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b0026]"
                    />
                    <input
                        type="email"
                        placeholder="Email *"
                        class="flex-1 p-3 border-2 border-[#5b0026] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b0026]"
                    />
                </div>

                <input
                    type="tel"
                    placeholder="Phone number"
                    class="w-full p-3 border-2 border-[#5b0026] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b0026]"
                />

                <textarea
                    rows="4"
                    placeholder="Comment"
                    class="w-full p-3 border-2 border-[#5b0026] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b0026] mt-3"
                ></textarea>

                <button
                    type="submit"
                    class="px-6 py-2 mt-2 bg-[#5b0026] text-white rounded-full hover:bg-[#43001c] transition"
                >
                    Send
                </button>
            </form>
        </div>
    );
}