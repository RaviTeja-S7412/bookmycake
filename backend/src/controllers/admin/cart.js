const db = require('../../connection.js').getDb();
const multer  = require('multer');
const path = require('path');
const express = require('express');


exports.addcart = (req, res) => {
    // const { product_id, product_size, product_flavor, product_qty, product_price } = req.body;

    if (!req.body.product_id) {
        return res.status(202).json({ message: "Product ID is Required." });
    }
    if (!req.body.product_size) {
        return res.status(202).json({ message: "Product size is Required." });
    }
    if (!req.body.product_flavor) {
        return res.status(202).json({ message: "Product flavour is Required." });
    }
    if (!req.body.product_qty) {
        return res.status(202).json({ message: "Product qty is Required." });
    }
    if (!req.body.product_price) {
        return res.status(202).json({ message: "Product Price is Required." });
    }

    const query = "INSERT INTO tbl_cart (product_id, product_size, product_flavor, product_qty, product_price, created_date) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [req.body.product_id, req.body.product_size, req.body.product_flavor, req.body.product_qty, req.body.product_price, new Date()];

    db.query(query, values, function (err, result) {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        return res.status(200).json({
            message: "Added to Cart Successfully",
        });
    });
};



