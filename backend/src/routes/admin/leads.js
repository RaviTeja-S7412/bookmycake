const express = require('express');
const router = express.Router();
const {requireSignin} = require('../../controllers/admin/auth');
const { get_leads, create_lead, update_lead, get_singlelead, deleteLead, update_startdate, export_leads } = require('../../controllers/admin/leads');

router.post('/admin/get_leads',requireSignin,get_leads);
router.post('/admin/create_lead',requireSignin,create_lead);
router.post('/admin/update_lead',requireSignin,update_lead);
router.post('/admin/get_singlelead',requireSignin,get_singlelead);
router.delete('/admin/deleteLead',requireSignin,deleteLead);
router.post('/admin/update_startdate',requireSignin,update_startdate);
router.get('/admin/export_leads',export_leads);

module.exports = router;