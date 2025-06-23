const express = require('express');
const router = express.Router();
const { requireSignin } = require('../../controllers/admin/auth');
const { get_allbannners, create_banner, update_banner, get_singlebanner, deletebanner } = require('../../controllers/admin/banners');

//Area routes
router.get('/admin/get_banners', requireSignin, get_allbannners);
router.post('/admin/create_banner', requireSignin, create_banner);
router.put('/admin/update_banner', requireSignin, update_banner);
router.post('/admin/get_singlebanner', requireSignin, get_singlebanner);
router.delete('/admin/delete_banner/:id', requireSignin, deletebanner);


module.exports = router;