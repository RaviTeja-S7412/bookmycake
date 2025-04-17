const express = require('express');
const router = express.Router();
const { requireSignin } = require('../../controllers/admin/auth');
const { get_allprops, create_prop, update_prop, get_singleprop, deleteprop} = require('../../controllers/admin/props');

//category routes
router.get('/admin/get_props', requireSignin, get_allprops);
router.post('/admin/create_prop', requireSignin, create_prop);
router.put('/admin/update_prop', requireSignin, update_prop);
router.post('/admin/get_singleprop', get_singleprop);
router.delete('/admin/delete_prop/:id', requireSignin, deleteprop);


module.exports = router;