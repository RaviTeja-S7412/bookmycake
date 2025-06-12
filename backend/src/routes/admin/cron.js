const express = require('express');
const router = express.Router();
const { requireSignin } = require('../../controllers/admin/auth');
const { insert_products } = require('../../controllers/admin/cron');

//Area routes
router.post('/admin/insertBulkproducts', insert_products);


module.exports = router;