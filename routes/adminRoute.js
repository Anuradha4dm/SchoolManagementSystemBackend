const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const validators = require('../validators/adminRouteValidator');

//POST /admin/new-student-profile
router.post('/new-student-profile', adminController.postNewStudentProfile);

//GET /admin/get-new-student-id
router.get("/get-new-student-id", adminController.getStudentNewId);

//GET /
router.get('/test', adminController.getTest);

module.exports = router;