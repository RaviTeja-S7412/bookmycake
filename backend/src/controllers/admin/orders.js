const db = require('../../connection.js').getDb();
const path = require('path');


// cities
// categories
exports.get_orders = function(req,res){

    var date = req.body.date;
    let query = `
        SELECT o.*, u.first_name, u.last_name, ta.area_name 
        FROM tbl_orders o 
        LEFT JOIN tbl_users u ON o.user_id = u.id 
        LEFT JOIN tbl_areas ta ON o.area = ta.id
    `;
    let params = [];
    if (date && date !== '') {
        query += ' WHERE DATE(o.date_of_order) = ?';
        params.push(date);
    }

    db.query(query, params, function (err, result) {
        if (err) {
            return res.status(500).json({ message: err });
        }
        return res.status(200).json({
            orders: result
        });
    });
}

exports.get_order_details = function(req, res){

    const query =`
        SELECT 
            o.*, 
            u.*,
            (
                SELECT CONCAT('[', GROUP_CONCAT(
                    CONCAT(
                        '{{"id":', op.order_product_id,
                        ',"order_id":', op.order_id,
                        ',"product_id":', op.product_id,
                        ',"quantity":', op.qty,
                        ',"price":', op.price,
                        '}'
                    )
                ), ']')
                FROM tbl_order_products op
                WHERE op.order_id = o.id
            ) AS products_list
        FROM tbl_orders o
        LEFT JOIN tbl_users u ON o.user_id = u.id
    `
    db.query(query, function (err, result) {
        if (err) {
            return res.status(500).json({ message: err });
        }
        return res.status(200).json({
            data: result
        });
    });
}

exports.update_deliverystatus = function(req,res){

    if(!req.body.order_id){
        return res.status(202).json({ message: "Order ID is Required." });
    }

    if(!req.body.delivery_status){
        return res.status(202).json({ message: "Delivery Status is Required." });
    }

    const query = "UPDATE tbl_orders SET delivery_status = ? where order_id = ?";
    const values = [req.body.delivery_status, req.body.order_id];
    
    db.query(query, values, function (err, result) {
    
        if (err) {
            return res.status(500).json({ message: err });
        }

        if (result) {
            return res.status(200).json({
                message: "Delivery Status Updated Succussfully."
            })
        }
    });
}
