const express = require('express');
const router = express.Router();
const { requireSignin } = require('../../controllers/admin/auth');
const { get_orders, update_deliverystatus, get_userorders, update_paymentstatus } = require('../../controllers/admin/orders');

//Area routes
router.post('/admin/orders', requireSignin, get_orders);
router.post('/admin/orders/view-order/:order_id', requireSignin, get_orders);
router.post('/admin/orders/update_deliverystatus', requireSignin, update_deliverystatus);
router.post('/admin/orders/update_paymentstatus', requireSignin, update_paymentstatus);
router.post('/front/orders/get_userorders', get_userorders);

module.exports = router;