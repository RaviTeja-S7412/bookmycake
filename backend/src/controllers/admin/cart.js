const db = require('../../connection.js').getDb();
const multer  = require('multer');
const path = require('path');
const express = require('express');

exports.addcart = (req, res) => {
    const {
        product_id,
        user_id,
        product_price,
        weight,
        qty,
        flavor,
        delivery_date,
        delivery_time,
        message,
        egg_option,
        type
    } = req.body;

    // Input validation
    if (!product_id) return res.status(202).json({ message: "Product ID is Required." });
    if (!user_id) return res.status(202).json({ message: "User ID is Required." });
    if (!product_price) return res.status(202).json({ message: "Product price is Required." });
    if (!weight) return res.status(202).json({ message: "Weight is Required." });
    if (!qty) return res.status(202).json({ message: "Qty is Required." });
    if (!delivery_date) return res.status(202).json({ message: "Delivery date is Required." });
    if (!delivery_time) return res.status(202).json({ message: "Delivery time is Required." });
    if (!message) return res.status(202).json({ message: "Message is Required." });
    if (!type) return res.status(202).json({ message: "Type is Required." });

    const optionsQuery = "SELECT * FROM tbl_product_option WHERE product_id = ?";
    db.query(optionsQuery, [product_id], (err, optionsResult) => {
        if (err) return res.status(500).json({ message: "Failed to retrieve product options." });

        const product_info = JSON.stringify(optionsResult); // Convert to JSON string
        const insertQuery = `
            INSERT INTO tbl_cart (product_id, user_id, product_info, product_price, weight,
                qty, flavor, delivery_date, delivery_time,message, egg_option, type, created_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [product_id, user_id, product_info, product_price, weight,qty, flavor, delivery_date, delivery_time,message, egg_option, type, new Date()];

        db.query(insertQuery, values, (insertErr, result) => {
            if (insertErr) {
                if (insertErr.code === 'ER_DUP_ENTRY') {
                    return res.status(202).json({ message: 'Product already exists' });
                }
                return res.status(500).json({ message: 'Database error' });
            }

            return res.status(200).json({ message: "Product added to cart successfully." });
        });
    });
};






exports.updatecart = (req, res) => {
  
    if (!req.body.product_id) {
        return res.status(202).json({ message: "Product ID is Required." });
    }
    if (!req.body.user_id) {
        return res.status(202).json({ message: "user id is Required." });
    }
  
    if(!req.body.qty) {
        return res.status(202).json({ message: "Qty is required. "});
    }

    const query = 'UPDATE tbl_cart SET product_id = ?, user_id = ?, qty = ?, updated_date = ?  WHERE id = ?';

    const values = [ req.body.product_id, req.body.user_id, req.body.qty, new Date(), req.body.id];

    db.query(query, values, function (err, result) {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Cart item not found." });
        }

        return res.status(200).json({ message: "Cart updated successfully" });
    });

}


exports.getcartitems = (req,res) => {

    db.query("SELECT * FROM tbl_cart order by id desc", function (error,result) {
        
        if(error){
            return res.status(202).json({message:error});
        }
        return res.status(200).json({
            cart : result
        });
    })
}

exports.deletecartitem = (req,res) => {
    
    const { id } = req.body;
    

    if(!id){
        return res.status(202).json({message : "id is required"});
    }

    const checkCartQuery = 'DELETE FROM tbl_cart Where id = ?';
    db.query(checkCartQuery, [id], (err, result) => {

        if(err){
            return res.status(500).json({ message : 'Database error' });
        }
        if(result.affectedRows === 0){
            return res.status(202).json({ message : 'cart not found' });
        }
        
        return res.status(200).json({ message: 'Cart Deleted Successfully'});
    });
}





