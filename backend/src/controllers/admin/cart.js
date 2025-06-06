const db = require('../../connection.js').getDb();
const axios = require('axios');

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
        type,
        user_type,
        area
    } = req.body;

    // Input validation
    if (!product_id) return res.status(202).json({ message: "Product ID is Required." });
    if (!user_id) return res.status(202).json({ message: "User ID is Required." });
    if (!product_price) return res.status(202).json({ message: "Product price is Required." });
    if (!qty) return res.status(202).json({ message: "Qty is Required." });
    if(type === "product"){
        if (!delivery_date) return res.status(202).json({ message: "Delivery date is Required." });
        if (!delivery_time) return res.status(202).json({ message: "Delivery time is Required." });
    }
    if (!type) return res.status(202).json({ message: "Type is Required." });

    const optionsQuery = "SELECT * FROM tbl_product_option WHERE product_id = ? AND flavor = ? AND weight = ?";
    db.query(optionsQuery, [product_id, flavor, weight], (err, optionsResult) => {
        if (err) return res.status(500).json({ message: "Failed to retrieve product options." });

        const product_info = JSON.stringify(optionsResult); // Convert to JSON string
        const insertQuery = `INSERT INTO tbl_cart (product_id, user_id, product_info, product_price, weight,qty, flavor, delivery_date, delivery_time,message, user_type, type, area, created_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [product_id, user_id, product_info, product_price, weight,qty, flavor, delivery_date, delivery_time,message, user_type, type, area, new Date()];

        db.query(insertQuery, values, (insertErr, result) => {
            if (insertErr) {
                return res.status(500).json({ message: insertErr });
            }

            return res.status(200).json({ message: "Product added to cart successfully." });
        });
    });
};

exports.addprop = (req, res) => {

    const cartItems = req.body.cartItems || [];
    const userId = req.body.user_id;

     db.query(
        "DELETE FROM tbl_cart WHERE user_id = ? AND type = 'prop'",
        [userId],
        (deleteErr, deleteResult) => {
            /* if (deleteErr) {
                return res.status(500).json({ message: "Failed to clear existing props", error: deleteErr });
            } */

            if (cartItems.length === 0) {
                return res.status(200).json({ message: "Props Updated Successfully." });
            }

        // Check for existing cart items for each (user_id, product_id)
        const checkPromises = cartItems.map(item => {
            return new Promise((resolve, reject) => {
                db.query(
                    "SELECT id FROM tbl_cart WHERE user_id = ? AND product_id = ? AND type = ?",
                    [item.user_id, item.product_id, item.type],
                    (err, result) => {
                        if (err) return reject(err);
                        resolve({ item, exists: result.length > 0 });
                    }
                );
            });
        });

        Promise.all(checkPromises)
            .then(results => {
                // Filter out items that already exist in the cart
                const newItems = results.filter(r => !r.exists).map(r => r.item);

                if (newItems.length === 0) {
                    return res.status(200).json({ message: "All items already exist in cart." });
                }

                const values = newItems.map(item => [
                    item.product_id,
                    item.user_id,
                    item.product_price,
                    item.qty,
                    item.user_type,
                    item.type,
                    new Date()
                ]);

                const insertQuery = `
                    INSERT INTO tbl_cart (product_id, user_id, product_price, qty, user_type, type, created_date)
                    VALUES ?
                `;

                db.query(insertQuery, [values], (insertErr, result) => {
                    if (insertErr) {
                        return res.status(500).json({ message: insertErr });
                    }
                    return res.status(200).json({ message: "Props added to cart successfully.", inserted: result.affectedRows });
                });
            })
            .catch(err => {
                return res.status(500).json({ message: "Database error", error: err });
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

    const user_id = req.body.user_id || null;

    db.query("SELECT * FROM tbl_cart WHERE user_id = ? ORDER BY id DESC", [user_id], async function (error, cartItems) {
        if (error) {
            return res.status(500).json({ message: error });
        }
        if (!cartItems || cartItems.length === 0) {
            return res.status(200).json({ cart_data: [] });
        }

        // Fetch product/prop data for each cart item
        const cartWithProductData = await Promise.all(cartItems.map(async (item) => {
            let productData = null;
            if (item.type === 'prop') {
                productData = await new Promise((resolve) => {
                    db.query("SELECT * FROM tbl_props WHERE id = ?", [item.product_id], (err, result) => {
                        resolve(result && result[0] ? result[0] : null);
                    });
                });
            } else if (item.type === 'product') {
                productData = await new Promise((resolve) => {
                    db.query("SELECT * FROM tbl_products WHERE id = ?", [item.product_id], (err, result) => {
                        resolve(result && result[0] ? result[0] : null);
                    });
                });
            }
            return {
                ...item,
                product_data: productData
            };
        }));

        return res.status(200).json({
            cart_data: cartWithProductData
        });
    });
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
            return res.status(202).json({ message : 'Product not found' });
        }
        
        return res.status(200).json({ message: 'Product removed from cart successfully.'  });
    });
}

exports.getProps = (req, res) => {
    
    const user_id = req.query.user_id || null;
    const query = 'SELECT * FROM tbl_props WHERE status = 1 ORDER BY id DESC';
    db.query(query, async (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'No props found.' });
        }
        const categories = await new Promise((resolve, reject) => {
            db.query("select * from tbl_prop_category WHERE status = 1", (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return res.status(200).json({ props: result, categories: categories });
    });
}

exports.insertOrder = (req, res) => {
    
    const user_id = req.body.user_id;

    const cartQuery = "SELECT * FROM tbl_cart WHERE user_id = ?";
    db.query(cartQuery, [user_id], async (err, cresult) => {
        if (err) return res.status(500).json({ message: "Failed to retrieve cart data." });
        if (cresult.length > 0) {
            const cartData = await new Promise((resolve, reject) => {
                db.query("SELECT * FROM tbl_cart WHERE user_id = ? and type='product' order by id desc", [user_id], (err, result) => {
                    if (err) return reject(err);
                    resolve(result[0]);
                });
            });

            const total_amount = cresult.reduce((total, item) => total + (item.product_price * item.qty), 0);
            
            const order_id = "ORD_" + new Date().toLocaleTimeString('en-US', { hour12: false }).replace(/:/g, '');
            const insertQuery = `INSERT INTO tbl_orders (order_id, payment_type, total_amount, total_order_amount, discount_amount, area,user_id, date_of_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [order_id, "online", total_amount, total_amount, 0, cartData?.area, user_id, new Date()];

            db.query(insertQuery, values, (insertErr) => {
                if (insertErr) {
                    return res.status(500).json({ message: insertErr });
                }

                // Ensure the order of fields matches the values
                const productsQuery = `INSERT INTO tbl_order_products (order_id, product_id, user_id, price, weight, qty, flavor, delivery_date, delivery_time, user_type, type, area, message, created_date) VALUES ?`;

                const product_values = cresult.map(item => [
                    order_id,
                    item.product_id,
                    item.user_id,
                    item.product_price,
                    item.weight,
                    item.qty,
                    item.flavor,
                    item.delivery_date,
                    item.delivery_time,
                    item.user_type,
                    item.type,
                    item.area,
                    item.message,
                    new Date()
                ]);

                db.query(productsQuery, [product_values], (oinsertErr) => {
                    if (oinsertErr) {
                        return res.status(500).json({ message: oinsertErr });
                    }

                    return res.status(200).json({ message: "Order Processed successfully.", order_id });
                });
            });
        }else{
            return res.status(500).json({ message: 'Error Occured' });
        }
    });
};

exports.updatePaymentStatus = (req, res) => {
    
    const {
        order_id,
        user_id,
        status,
        txn_id,
        bank_ref_no,
        payment_mode
    } = req.body;

    if(order_id == ""){
        return res.status(202).json({ message: "Order ID is Required." });
    }

    if(user_id == ""){
        return res.status(202).json({ message: "User ID is Required." });
    }

    if(status == ""){
        return res.status(202).json({ message: "Status is Required." });
    }

    if(status === "success"){
        const updateQuery = "UPDATE tbl_orders SET order_status=?, payment_status=?, txn_id=?, payment_mode=?, bank_ref_no=?, date_of_payment=? where order_id=?";
        const values = ["success", "success", Date.now(), "UPI", "BA1234564654", new Date(), order_id];
        db.query(updateQuery, values, (err, result) => {
            if (err) {
                return res.status(500).json({ message: err });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Order not found." });
            }

            db.query("delete from tbl_cart where user_id = "+user_id, (cerr, cres) => {
                if (cerr) {
                    return res.status(500).json({ message: cerr });
                }   
                return res.status(200).json({ message: "Payment successfully Done" });
            })
                
        });
    }else{
        const updateQuery = 'UPDATE tbl_orders SET order_status=?, payment_status=? where order_id=?';
        const values = ["cancelled", "failed", order_id];
        db.query(updateQuery, values, (err, result) => {
            if (err) {
                return res.status(500).json({ message: err });
            }
            return res.status(202).json({ message: "Payment failed" });    
        })
    }

}

exports.cashfreepay = async (req, res) => {

    const { orderId, orderAmount, customerDetails } = req.body;
    
    const sandbox_url = "https://sandbox.cashfree.com/pg/orders";
    const live_url = "https://api.cashfree.com/pg/orders";

    try {
        const response = await axios.post(
        live_url,
        {
            order_id: orderId,
            order_amount: orderAmount,
            order_currency: 'INR',
            customer_details: customerDetails,
        },
        {
            headers: {
            'x-client-id': "1751029664b0b899c7067cf76e201571",
            'x-client-secret': "913db8256643a85be78d59b6521cac0e61419467",
            'x-api-version': '2023-08-01',
            'Content-Type': 'application/json',
            },
        }
        );

        res.json({ success: true, payment_session_id: response.data.payment_session_id });
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ success: false, error: err.message });
    }
}

