import React, { useState } from "react";

export default function Email() {
    return (
        <>
            <section class="bg-gray-100 font-sans">
                {/* <!-- Main Container --> */}
                <div class="max-w-2xl mx-auto my-8 bg-white rounded-lg shadow-md overflow-hidden">
                    {/* <!-- Header --> */}
                    <div class="bg-blue-600 p-6 text-center">
                        <img src="https://placehold.co/120x40" alt="Company Logo" class="mx-auto mb-4" />
                        <h1 class="text-white text-2xl font-bold">Order Confirmation</h1>
                    </div>

                    {/* <!-- Thank You Message --> */}
                    <div class="p-6 border-b border-gray-200">
                        <h2 class="text-xl font-semibold mb-2">Thank you for your order, [Customer Name]!</h2>
                        <p class="text-gray-600">Your order #[ORDER-123] has been confirmed and is being processed.</p>
                    </div>

                    {/* <!-- Order Summary --> */}
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold mb-4">Order Summary</h3>
                        <div class="space-y-4">
                            {/* <!-- Order Item --> */}
                            <div class="flex items-center space-x-4">
                                <img src="https://placehold.co/80x80" alt="Product" class="w-20 h-20 object-cover rounded" />
                                <div class="flex-1">
                                    <h4 class="font-medium">Product Name</h4>
                                    <p class="text-gray-500">Quantity: 1</p>
                                </div>
                                <p class="font-semibold">$99.99</p>
                            </div>

                            {/* <!-- Order Total --> */}
                            <div class="border-t pt-4 mt-4">
                                <div class="flex justify-between text-sm mb-2">
                                    <span>Subtotal</span>
                                    <span>$99.99</span>
                                </div>
                                <div class="flex justify-between text-sm mb-2">
                                    <span>Shipping</span>
                                    <span>$4.99</span>
                                </div>
                                <div class="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>$104.98</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Shipping Information --> */}
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold mb-4">Shipping Details</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <h4 class="font-medium mb-2">Shipping Address</h4>
                                <p class="text-gray-600">
                                    [Customer Name]<br />
                                    123 Street Name<br />
                                    City, State 12345<br />
                                    Country
                                </p>
                            </div>
                            <div>
                                <h4 class="font-medium mb-2">Estimated Delivery</h4>
                                <p class="text-gray-600">
                                    [Delivery Date]<br />
                                    Shipping Method: Standard Shipping
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Support Section --> */}
                    <div class="p-6 bg-gray-50">
                        <h3 class="text-lg font-semibold mb-4">Need Help?</h3>
                        <p class="text-gray-600 mb-4">If you have any questions about your order, please contact our customer support team.</p>
                    </div>
                </div>
            </section>
        </>
    )
}