const express = require("express");
const router = express.Router();

const {get_cake_collection} = require("../../controllers/products/productControllers")

router.get('/products/collections',get_cake_collection);

module.exports = router;