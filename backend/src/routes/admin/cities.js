const express = require('express');
const router = express.Router();
const { requireSignin } = require('../../controllers/admin/auth');
const { get_allcities, create_city, update_city, get_singlecity, deletecity } = require('../../controllers/admin/cities');

//City routes
router.get('/admin/get_cities', requireSignin, get_allcities);
router.post('/admin/create_city', requireSignin, create_city);
router.put('/admin/update_city', requireSignin, update_city);
router.post('/admin/get_singlecity', requireSignin, get_singlecity);
router.delete('/admin/delete_city/:id', requireSignin, deletecity);



module.exports = router;