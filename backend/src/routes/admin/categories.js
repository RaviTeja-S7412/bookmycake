const express = require('express');
const router = express.Router();
const { requireSignin } = require('../../controllers/admin/auth');
const { get_allcategories, create_category, update_category, get_singlecategory, deletecategory, get_allsubcategories, create_subcategory, update_subcategory, get_singlesubcategory, delete_sub_category, get_allchildcategories, create_childcategory, update_childcategory, get_singlechildcategory, delete_child_category, get_childcateriesbysubcategoryid, get_subcategoriesbycategoryid } = require('../../controllers/admin/categories');

//category routes
router.get('/admin/get_categories', requireSignin, get_allcategories);
router.post('/admin/create_category', requireSignin, create_category);
router.put('/admin/update_category', requireSignin, update_category);
router.post('/admin/get_singlecategory', requireSignin, get_singlecategory);
router.delete('/admin/delete_category/:id', requireSignin, deletecategory);

//sub category routes
router.get('/admin/get_sub_categories', requireSignin, get_allsubcategories);
router.post('/admin/create_sub_category', requireSignin, create_subcategory);
router.put('/admin/update_sub_category', requireSignin, update_subcategory);
router.post('/admin/get_singlesubcategory', requireSignin, get_singlesubcategory);
router.delete('/admin/delete_sub_category/:id', requireSignin, delete_sub_category);
router.post('/admin/get_subcateriesbycategoryid', requireSignin, get_subcategoriesbycategoryid);

//child category routes
router.get('/admin/get_child_categories', requireSignin, get_allchildcategories);
router.post('/admin/create_child_category', requireSignin, create_childcategory);
router.put('/admin/update_child_category', requireSignin, update_childcategory);
router.post('/admin/get_singlechildcategory', requireSignin, get_singlechildcategory);
router.delete('/admin/delete_child_category/:id', requireSignin, delete_child_category);

// router.post('/admin/get_childcateriesbysubcategoryid',requireSignin,get_childcateriesbysubcategoryid);

module.exports = router;