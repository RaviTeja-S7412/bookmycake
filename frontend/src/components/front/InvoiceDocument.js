// InvoiceDocument.js
import React, { useEffect, useState } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font
} from '@react-pdf/renderer';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row', 
    gap: 20
  },
  logo: {
    width: 100,
    height: 50,
    marginBottom: 10,
    float: 'right'
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottom: '1 solid #ccc',
    paddingBottom: 4,
    marginBottom: 4,
  },
  column: {
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  fontsize: {
    fontSize: 12
  }
});

Font.register({
  family: 'Roboto',
  src: '/fonts/Roboto-Regular.ttf', // Adjust the path if needed
});

// PDF Document Component
const InvoiceDocument = ({ invoice }) => {

  const order_datails = invoice?.order_details
  const products = invoice?.products

  const billingAddress = order_datails?.billing_address && JSON.parse(order_datails?.billing_address);

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Invoice Header */}
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          {/* Left Column (Invoice Info) */}
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={styles.bold}>Invoice #: {"INV_000" + order_datails?.o_id}</Text>
            <Text>Date: {new Date().toLocaleDateString()}</Text>
          </View>

          {/* Right Column (Company Info) */}
          <View style={{ flex: 1, textAlign: 'right', lineHeight: 1 }}>
            <Image
              src={`${import.meta.env.VITE_APIBASE_URL}products/logo.jpg`}
              style={{
                width: 100,
                height: 40,
                marginBottom: 10,
                alignSelf: 'flex-end',
              }}
            />
            <Text style={styles.fontsize}>Bookmycake Private Limited</Text>
            <Text style={styles.fontsize}>1114, Sohna Road, Sector 47 Gurugram,</Text>
            <Text style={styles.fontsize}>Haryana-122018</Text>
            <Text style={styles.fontsize}>Phone: +91 9870318105</Text>
            <Text style={styles.fontsize}>Email: info@bookmycake.co</Text>
            <Text style={styles.fontsize}>CIN: U15146DL2021PTC389546</Text>
            <Text style={styles.fontsize}>FSSAI No: 10823005001700</Text>
            <Text style={styles.fontsize}>GSTIN: 06AAKCB2869B1ZS</Text>
          </View>
        </View>

        {/* Addresses */}
        <View style={[styles.section, { flexDirection: 'row', gap: 20 }]}>
          {/* Billing Address */}
          <View style={{ flex: 1, lineHeight: 1 }}>
            <Text style={styles.bold}>Billing Address:</Text>
            <Text style={styles.fontsize}>{billingAddress?.full_name}</Text>
            <Text style={styles.fontsize}>{billingAddress?.house_no}, {billingAddress?.area},</Text>
            <Text style={styles.fontsize}>{billingAddress?.city}, {billingAddress?.state},</Text>
            <Text style={styles.fontsize}>{billingAddress?.country} - {billingAddress?.pincode},</Text>
            <Text style={styles.fontsize}>Mobile: {billingAddress?.mobile_number}</Text>
          </View>

          {/* Shipping Address */}
          <View style={[{ textAlign: 'right', flex: 1, lineHeight: 1 }]}>
            <Text style={styles.bold}>Shipping Address:</Text>
            <Text style={styles.fontsize}>{order_datails?.full_name}</Text>
            <Text style={styles.fontsize}>{order_datails?.house_no}, {order_datails?.area},</Text>
            <Text style={styles.fontsize}>{order_datails?.city}, {order_datails?.state},</Text>
            <Text style={styles.fontsize}>{order_datails?.country} - {order_datails?.pincode},</Text>
            <Text style={styles.fontsize}>Mobile: {order_datails?.mobile_number}</Text>
          </View>
        </View>

        <View style={[styles.section, { flexDirection: 'row', gap: 20, marginBottom: '20px' }]}>
          {/* Customer Details */}
          <View style={{ flex: 1, lineHeight: 1 }}>
            <Text style={styles.bold}>Customer Details:</Text>
            <Text style={styles.fontsize}>Name: {order_datails.first_name + ' ' + order_datails.last_name}</Text>
            <Text style={styles.fontsize}>Email: {order_datails.email}</Text>
            <Text style={styles.fontsize}>Phone: {order_datails.mobile_number}</Text>
          </View>

          <View style={[{ textAlign: 'right', flex: 1, lineHeight: 1 }]}>
            <Text style={styles.bold}>Payment Details:</Text>
            <Text style={styles.fontsize}>Order ID: {order_datails?.order_id}</Text>
            <Text style={styles.fontsize}>Payment Mode: {order_datails?.payment_type}</Text>
          </View>
        </View>

        {/* Products */}
        <View style={styles.section}>
          <Text style={[styles.bold, {marginBottom: 10}]}>Products:</Text>

          <View style={[styles.row, styles.bold]}>
            <Text style={[styles.column, {fontSize: 11}]}>Product Name</Text>
            <Text style={[styles.column, { marginLeft: '20px', fontSize: 11 }]}>Qty</Text>
            <Text style={[styles.column, {fontSize: 11}]}>Price</Text>
            <Text style={[styles.column, {fontSize: 11}]}>Total</Text>
          </View>

          {products.map((item, index) => (
            <View style={styles.row} key={index}>
              <Text style={[styles.column, {fontSize: 10}]}>{item.type === 'product' ? item?.product_name : item?.prop_name}</Text>
              <Text style={[styles.column, { marginLeft: '20px', fontSize: 10 }]}>{item.qty}</Text>
              <Text style={[styles.column, {fontSize: 10}]}>{item.type === 'product' ? item?.product_price : item?.price}</Text>
              <Text style={[styles.column, {fontSize: 10}]}>{(parseInt(item.qty) * parseInt(item.type === 'product' ? item?.product_price : item?.price))}</Text>
            </View>
          ))}
        </View>

        <Text style={{ marginTop: 0, fontSize: 10, textAlign: 'right', fontWeight: 'medium', fontFamily: 'Roboto' }}>
          Sub Total: ₹ {order_datails?.sub_total}
        </Text>
        <Text style={{ marginTop: 5, fontSize: 10, textAlign: 'right', fontWeight: 'medium', fontFamily: 'Roboto' }}>
          GST (18%): ₹ {order_datails?.gst}
        </Text>
        <Text style={{ marginTop: 5, fontSize: 12, textAlign: 'right', fontWeight: 'bold', fontFamily: 'Roboto' }}>
          Grand Total: ₹ {order_datails?.total_amount}
        </Text>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
