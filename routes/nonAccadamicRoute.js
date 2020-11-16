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

//GET /nonacademic/get-class
router.get('/get-class-student/:id', nonacademicController.getGetClassOfAStudent);

//POST /nonacademic/update-class    =>this will use to change the student class manualy by the non academic member and send notification to the student
router.post('/update-class-student', nonacademicController.postUpdateStudentClass)

//GET /nonacademic/reset-student-subject  
router.get('/reset-student-subjects/:id', nonacademicController.getResetStudentSubjects);

//GET /nonacademic/get-teacher-subject-list
router.get('/get-teacher-subject-list/:id', nonacademicController.getGetSubjectListOfTheTeahcer);

module.exports = router;