const express = require('express');
const router = express.Router();
const { requireSignin } = require('../../controllers/admin/auth');
const { get_orders, update_deliverystatus } = require('../../controllers/admin/orders');

//Area routes
router.post('/admin/orders', requireSignin, get_orders);
router.post('/admin/orders/view-order/:order_id', requireSignin, get_orders);
router.post('/admin/orders/update_deliverystatus', requireSignin, update_deliverystatus);


module.exports = router;