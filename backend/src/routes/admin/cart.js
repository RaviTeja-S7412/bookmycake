const express = require('express');
const router = express.Router();
const { requireSignin } = require('../../controllers/admin/auth');
const { addcart} = require('../../controllers/admin/cart');

//category routes
router.post('/admin/addcart', addcart);

module.exports = router;