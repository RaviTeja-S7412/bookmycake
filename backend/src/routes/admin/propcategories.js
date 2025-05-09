const express = require('express');
const router = express.Router();
const { requireSignin } = require('../../controllers/admin/auth');
const { get_allpropcategories, create_propcategory, update_propcategory, get_singlepropcategory, deletepropcategory} = require('../../controllers/admin/propcategories');

//category routes
router.get('/admin/get_propcategories', requireSignin, get_allpropcategories);
router.post('/admin/create_propcategory', requireSignin, create_propcategory);
router.put('/admin/update_propcategory', requireSignin, update_propcategory);
router.post('/admin/get_singlepropcategory', get_singlepropcategory);
router.delete('/admin/delete_propcategory/:id', requireSignin, deletepropcategory);


module.exports = router;