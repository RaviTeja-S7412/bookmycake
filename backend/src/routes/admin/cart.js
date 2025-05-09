const express = require('express');
const router = express.Router();
const { requireSignin } = require('../../controllers/admin/auth');
const { addcart, updatecart, deletecartitem, getcartitems} = require('../../controllers/admin/cart');

//category routes
router.post('/admin/addcart', addcart);
router.post('/admin/updatecart', updatecart);
router.post('/admin/deletecartitem', deletecartitem);
router.get('/admin/getcartitems', getcartitems)

module.exports = router;