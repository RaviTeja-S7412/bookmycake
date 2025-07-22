import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosIntance from "../../components/axios";

export default function Policy() {


    return (
        <div className="default-width font-[Poppins] mx-auto">
            <h2 className="text-2xl poppins-bold tracking-tight pt-5 text-gray-900">Cancellation and Refund Policy</h2>
            <ul className="list-disc list-inside text-gray-700 mt-4 leading-10">
                <li>As all orders are customized as per the customer’s requirement and are perishable in nature, refund on any cancellation is not possible on the same day</li>
                <li>Refund charges of 5% per order shall be applicable.For cakes size 1 kg or less cancellation has to be requested 24 hrs prior to delivery time and for cakes more than 1 kg size cancellation has to be requested 36 hrs prior to delivery time</li>
                <li>Cancellation of Order shall be mailed by the customer at hello@bookmycake.co  with the Subject : “ Cancellation Request” along with order id.</li>
                <li>Refund will be done to the source mode of payment as first preference.</li>
                <li>Refund will be credited between 3-9 days of cancellation date .</li>
                <li>It is entirely up to Bookmycake’s discretion, to change, cancel, refund or otherwise offer any other option to the custom</li>
            </ul>
        </div>
    );
}