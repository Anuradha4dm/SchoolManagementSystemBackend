const express = require('express');

const nonacademicController = require('../controllers/nonAcademicController');
const { route } = require('./studentRouter');


const router = express.Router();

//GET /nonacademic/get-pening-request
router.get('/get-pending-request', nonacademicController.getGetPengingRequestList);

//POST /nonacademic/answer the pending requests
router.post('/answer-pending-leave', nonacademicController.postAnswerLeaveRequest);

//POST   /nonacademic/add-notification
router.post('/add-notification', nonacademicController.postAddNotification);

//GET /nonacademic/get-class-teacher
router.get('/get-class-teacher/:class', nonacademicController.getGetClassTeacherData);

//GET /nonacademic/get-free-class-teacher
router.get('/get-free-class-teacher', nonacademicController.getGetFreeClassTeachers);

//GET /nonacademic/update-class
router.post('/update-class-handler', nonacademicController.postUpdateClassHandler)

//GET /nonacademic/get-class        =>this route is used to get the class of the specific student
router.get('/get-class-student/:id', nonacademicController.getGetClassOfAStudent);

//POST /nonacademic/update-class            =>
router.post('/update-class-student', nonacademicController.postUpdateStudentClass)

//GET /nonacademic/get-pending-leaves
router.get('/get-pending-leaves', nonacademicController.getGetPendingLeaveRequests);

module.exports = router;