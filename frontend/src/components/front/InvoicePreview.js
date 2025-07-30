import React from 'react';
import InvoiceDocument from './InvoiceDocument';
import { BlobProvider } from '@react-pdf/renderer';

const InvoicePreview = ({ invoice }) => {

  const order_details = invoice?.order_details;
  const products = invoice?.products;
  const billingAddress = order_details?.billing_address && JSON.parse(order_details?.billing_address);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow border border-gray-300">

      <div className="flex flex-col md:flex-row gap-8 mb-6">
        <div className="flex-1">
          <p className='text-sm leading-2 font-bold'>Invoice # INV_000{order_details?.o_id}</p>
          <p className='text-sm leading-2'>Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex-1 text-right">
          <img
            src={`${import.meta.env.VITE_APIBASE_URL}products/logo.jpg`}
            alt="Logo"
            className="w-40 mb-2 float-right"
          /><br />
          <p className='text-sm leading-5 float-right'>Bookmycake Private Limited<br />
            1114, Sohna Road, Sector 47 Gurugram,<br />
            Haryana-122018<br />
            Phone: +91 9870318105<br />
            Email: info@bookmycake.co<br />
            CIN: U15146DL2021PTC389546<br />
            FSSAI No: 10823005001700<br />
            GSTIN: 06AAKCB2869B1ZS
          </p>

        </div>
      </div>

      {/* Billing & Shipping Addresses */}
      <div className="flex flex-col md:flex-row gap-8 mb-6">
        {/* Billing */}
        <div className="flex-1">
          <h6 className="font-semibold mb-3">Billing Address:</h6>
          <p className='text-sm leading-2'>{billingAddress?.full_name}</p>
          <p className='text-sm leading-2'>{billingAddress?.house_no}, {billingAddress?.area},</p>
          <p className='text-sm leading-2'>{billingAddress?.city}, {billingAddress?.state},</p>
          <p className='text-sm leading-2'>{billingAddress?.country} - {billingAddress?.pincode}</p>
          <p className='text-sm leading-2'>Mobile: {billingAddress?.mobile_number}</p>
        </div>

        {/* Shipping */}
        <div className="flex-1 text-right">
          <h6 className="font-semibold mb-3">Shipping Address:</h6>
          <p className='text-sm leading-2'>{order_details?.full_name}</p>
          <p className='text-sm leading-2'>{order_details?.house_no}, {order_details?.area},</p>
          <p className='text-sm leading-2'>{order_details?.city}, {order_details?.state},</p>
          <p className='text-sm leading-2'>{order_details?.country} - {order_details?.pincode}</p>
          <p className='text-sm leading-2'>Mobile: {order_details?.mobile_number}</p>
        </div>
      </div>

      {/* Customer & Payment Info */}
      <div className="flex flex-col md:flex-row gap-8 mb-6">
        {/* Customer */}
        <div className="flex-1">
          <h6 className="font-semibold mb-3">Customer Details:</h6>
          <p className='text-sm leading-2'>Name: {order_details?.first_name} {order_details?.last_name}</p>
          <p className='text-sm leading-2'>Email: {order_details?.email}</p>
          <p className='text-sm leading-2'>Phone: {order_details?.mobile_number}</p>
        </div>

        {/* Payment */}
        <div className="flex-1 text-right">
          <h6 className="font-semibold mb-3">Payment Details:</h6>
          <p className='text-sm leading-2'>Order ID: {order_details?.order_id}</p>
          <p className='text-sm leading-2 uppercase'>Payment Mode: {order_details?.payment_type}</p>
          {/* <p className='text-sm leading-2'>Phone: {order_details?.mobile_number}</p> */}
        </div>
      </div>

      {/* Products Table */}
      <div>
        <h5 className="font-semibold mb-2">Products:</h5>
        <div className="grid grid-cols-4 font-semibold border-b border-gray-400 py-2">
          <div className="text-center">Name</div>
          <div className="text-center">Qty</div>
          <div className="text-center">Price</div>
          <div className="text-center">Total</div>
        </div>

        {products.map((item, index) => {
          const price = parseInt(item.type === 'product' ? item.product_price : item.price);
          const total = parseInt(item.qty) * price;

          return (
            <div key={index} className="grid grid-cols-4 py-2 border-b border-gray-100 text-center text-sm">
              <div>{item.type === 'product' ? item.product_name : item.prop_name}</div>
              <div>{item.qty}</div>
              <div>{price}</div>
              <div>{total}</div>
            </div>
          );
        })}
      </div>

      {/* Grand Total */}
      <div>
        <p className="mt-6 text-right text-md font-medium mb-2">
          Sub Total: ₹ {order_details?.sub_total}
        </p>
        <p className="mt-6 text-right text-md font-medium mb-2">
          GST (18%): ₹ {order_details?.gst}
        </p>
        <p className="mt-6 text-right text-lg font-semibold mb-2">
          Grand Total: ₹ {order_details?.total_amount}
        </p>
      </div>
      <div className='flex grid grid-cols-3 text-center'>
        <div></div>
        <BlobProvider document={<InvoiceDocument invoice={invoice} />}>
          {({ url, loading: pdfLoading }) =>
            pdfLoading ? (
              'Preparing...'
            ) : (
              <a href={url} className="mt-8 px-6 py-2 justify-center !no-underline bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition" download={`invoice-${order_details?.order_id}.pdf`}>
                Download Invoice
              </a>
            )
          }
        </BlobProvider>
      </div>
    </div>
  );
};

export default InvoicePreview;
