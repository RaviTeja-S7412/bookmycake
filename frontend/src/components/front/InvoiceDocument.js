// InvoiceDocument.js
import React from 'react';
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
const InvoiceDocument = ({ invoiceData }) => {
  const {
    billingAddress,
    shippingAddress,
    customer,
    products,
    invoiceNumber,
    date,
    logoUrl
  } = invoiceData;

  const grandTotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo */}
        {logoUrl && <Image src={logoUrl} style={styles.logo} />}

        {/* Invoice Header */}
        <View style={styles.header}>
          <Text style={{ fontSize: 20, marginBottom: 4 }}>Invoice</Text>
          <Text>Invoice #: {invoiceNumber}</Text>
          <Text>Date: {date}</Text>
        </View>

        {/* Addresses */}
        <View style={styles.section}>
          <Text style={styles.bold}>Billing Address:</Text>
          <Text>{billingAddress.name}</Text>
          <Text>{billingAddress.street}</Text>
          <Text>{billingAddress.city}, {billingAddress.state} {billingAddress.zip}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Shipping Address:</Text>
          <Text>{shippingAddress.name}</Text>
          <Text>{shippingAddress.street}</Text>
          <Text>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</Text>
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.bold}>Customer Details:</Text>
          <Text>Name: {customer.name}</Text>
          <Text>Email: {customer.email}</Text>
          <Text>Phone: {customer.phone}</Text>
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
              <Text style={styles.column}>{item.name}</Text>
              <Text style={styles.column}>{item.quantity}</Text>
              <Text style={styles.column}>${item.price.toFixed(2)}</Text>
              <Text style={styles.column}>${(item.quantity * item.price).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <Text style={{ marginTop: 20, fontSize: 14 }}>
          Grand Total: ${grandTotal.toFixed(2)}
        </Text>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
