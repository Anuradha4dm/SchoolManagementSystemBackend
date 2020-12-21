const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const validators = require('../validators/adminRouteValidator');
const { route } = require('./commonRouter');

//POST /admin/new-student-profile
router.post('/new-student-profile', adminController.postNewStudentProfile);

//GET /admin/get-new-student-id
router.get("/get-new-student-id", adminController.getStudentNewId);

//GET /
router.get('/test', adminController.getTest);

//use to get new teacher details
router.post('/add-new-teacher',adminController.postAddNewTeacher);

//return counts of students,non,classes and teachers
router.get('/get-all-count',adminController.getAllCounts);

//to create new class
router.post('/create-new-class',adminController.postCreateNewClass);

//return class list and data
router.get('/get-class-list',adminController.getClassList);

//used to create new non academic
router.post('/create-non-academic',adminController.createNonAcademic);

module.exports = router;