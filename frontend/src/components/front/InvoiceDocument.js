// InvoiceDocument.js
import React, { useEffect, useState } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 50,
    marginBottom: 10,
    alignSelf: 'center',
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
});

// PDF Document Component
const InvoiceDocument = ({ invoice }) => {

  const order_datails = invoice?.order_details
  const products = invoice?.products

  const billingAddress = order_datails?.billing_address && JSON.parse(order_datails?.billing_address);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo */}
        <img src={import.meta.env.VITE_APIBASE_URL + 'products/logo.jpg'} style={styles.logo} />

        {/* Invoice Header */}
        <View style={styles.header}>
          <Text style={{ fontSize: 20, marginBottom: 4 }}>Invoice</Text>
          <Text>Invoice #: {"INV_000" + order_datails?.o_id}</Text>
          <Text>Date: {new Date().toLocaleDateString()}</Text>
        </View>

        {/* Addresses */}
        <View style={[styles.section, { flexDirection: 'row', gap: 20 }]}>
          {/* Billing Address */}
          <View style={{ flex: 1 }}>
            <Text style={styles.bold}>Billing Address:</Text>
            <Text>{billingAddress?.full_name}</Text>
            <Text>{billingAddress?.house_no}, {billingAddress?.area},</Text>
            <Text>{billingAddress?.city}, {billingAddress?.state},</Text>
            <Text>{billingAddress?.country} - {billingAddress?.pincode},</Text>
            <Text>Mobile: {billingAddress?.mobile_number}</Text>
          </View>

          {/* Shipping Address */}
          <View style={[{ textAlign: 'right', flex: 1 }]}>
            <Text style={styles.bold}>Shipping Address:</Text>
            <Text>{order_datails?.full_name}</Text>
            <Text>{order_datails?.house_no}, {order_datails?.area},</Text>
            <Text>{order_datails?.city}, {order_datails?.state},</Text>
            <Text>{order_datails?.country} - {order_datails?.pincode},</Text>
            <Text>Mobile: {order_datails?.mobile_number}</Text>
          </View>
        </View>

        <View style={[styles.section, { flexDirection: 'row', gap: 20, marginBottom: '20px' }]}>
          {/* Customer Details */}
          <View style={{ flex: 1 }}>
            <Text style={styles.bold}>Customer Details:</Text>
            <Text>Name: {order_datails.first_name + ' ' + order_datails.last_name}</Text>
            <Text>Email: {order_datails.email}</Text>
            <Text>Phone: {order_datails.mobile_number}</Text>
          </View>

          <View style={[{ textAlign: 'right', flex: 1 }]}>
            <Text style={styles.bold}>Payment Details:</Text>
            <Text>Order ID: {order_datails?.order_id}</Text>
            <Text>Payment Mode: {order_datails?.payment_type}</Text>
          </View>
        </View>

        {/* Products */}
        <View style={styles.section}>
          <Text style={styles.bold}>Products:</Text>

          <View style={[styles.row, styles.bold]}>
            <Text style={styles.column}>Name</Text>
            <Text style={styles.column}>Qty</Text>
            <Text style={styles.column}>Price</Text>
            <Text style={styles.column}>Total</Text>
          </View>

          {products.map((item, index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.column}>{item.type === 'product' ? item?.product_name : item?.prop_name}</Text>
              <Text style={styles.column}>{item.qty}</Text>
              <Text style={styles.column}>{item.type === 'product' ? item?.product_price : item?.price}</Text>
              <Text style={styles.column}>{(parseInt(item.qty) * parseInt(item.type === 'product' ? item?.product_price : item?.price))}</Text>
            </View>
          ))}
        </View>

        <Text style={{ marginTop: 20, fontSize: 14 }}>
          Grand Total: {order_datails?.total_amount} Rs/-
        </Text>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
