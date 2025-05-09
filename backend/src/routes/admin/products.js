const express = require('express');
const router = express.Router();
const { requireSignin } = require('../../controllers/admin/auth');
const { get_allproducts, create_product, create_productoption, update_product, get_singleproduct, deleteproduct, get_filter_products, get_singleproduct_by_route} = require('../../controllers/admin/products');

//category routes
router.get('/admin/get_products', requireSignin, get_allproducts);
router.post('/admin/create_product', requireSignin, create_product);
router.post('/admin/create_productoption', create_productoption);
router.put('/admin/update_product', requireSignin, update_product);
router.post('/admin/get_singleproduct', get_singleproduct);
router.delete('/admin/delete_product/:id', requireSignin, deleteproduct);
router.get('/admin/get_filterproducts',  get_filter_products);
router.get('/admin/get_singleproductroute',get_singleproduct_by_route);

module.exports = router;