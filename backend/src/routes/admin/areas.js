const express = require('express');
const router = express.Router();
const { requireSignin } = require('../../controllers/admin/auth');
const { get_allareas, create_area, update_area, get_singlearea, deletearea } = require('../../controllers/admin/areas');

//Area routes
router.get('/admin/get_areas', requireSignin, get_allareas);
router.post('/admin/create_area', requireSignin, create_area);
router.put('/admin/update_area', requireSignin, update_area);
router.post('/admin/get_singlearea', requireSignin, get_singlearea);
router.delete('/admin/delete_area/:id', requireSignin, deletearea);


module.exports = router;