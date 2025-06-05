const express = require('express');
const router = express.Router();
const { requireSignin } = require('../../controllers/admin/auth');
const { addcart, updatecart, deletecartitem, getcartitems, getProps, addprop, insertOrder, updatePaymentStatus} = require('../../controllers/admin/cart');

//category routes
router.post('/admin/addcart', addcart);
router.post('/admin/updatecart', updatecart);
router.post('/admin/deletecartitem', deletecartitem);
router.post('/admin/getcartitems', getcartitems);
router.get('/admin/getProps', getProps);
router.post('/admin/addprop', addprop);
router.post('/front/insertOrder', insertOrder);
router.post('/front/updatePaymentStatus', updatePaymentStatus);

module.exports = router;