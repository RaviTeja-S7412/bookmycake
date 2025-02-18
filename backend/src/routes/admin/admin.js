const express = require('express');
const router = express.Router();
const {requireSignin} = require('../../controllers/admin/auth');
const {get_userdata, get_roles, get_navigationmenu} = require('../../controllers/admin/admin');

router.post('/admin/get_userdata',requireSignin,get_userdata);
router.get('/admin/get_roles',requireSignin,get_roles);
router.get('/admin/get_navigationmenu', get_navigationmenu);

module.exports = router;