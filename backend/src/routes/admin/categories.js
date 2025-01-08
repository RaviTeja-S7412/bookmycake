const express = require('express');
const router = express.Router();
const {requireSignin} = require('../../controllers/admin/auth');
const { get_allcategories, create_category, update_category,get_singlecategory, deletecategory } = require('../../controllers/admin/categories');

router.get('/admin/get_categories',requireSignin,get_allcategories);
router.post('/admin/create_category',requireSignin,create_category);
router.put('/admin/update_category',requireSignin,update_category);
router.post('/admin/get_singlecategory',requireSignin,get_singlecategory);
router.delete('/admin/delete_category',requireSignin,deletecategory);

module.exports = router;