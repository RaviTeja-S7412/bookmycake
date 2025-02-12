const express = require('express');
const router = express.Router();
const { requireSignin } = require('../../controllers/admin/auth');
const { get_allproducts, create_product, update_product, get_singleproduct, deleteproduct } = require('../../controllers/admin/products');

//category routes
router.get('/admin/get_products', requireSignin, get_allproducts);
router.post('/admin/create_product', requireSignin, create_product);
router.put('/admin/update_product', requireSignin, update_product);
router.post('/admin/get_singleproduct', requireSignin, get_singleproduct);
router.delete('/admin/delete_product/:id', requireSignin, deleteproduct);

module.exports = router;