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

//POST /nonacademic/update-class            =>this will use to change the student class manualy by the non academic member and send notification to the student
router.post('/update-class-student', nonacademicController.postUpdateStudentClass)

//GET /nonacademic/reset-student-subject  
router.get('/reset-student-subjects/:id', nonacademicController.getResetStudentSubjects);

//GET /nonacademic/get-teacher-subject-list         =>this is used to get the teahcer subjects which are teached by the teacher
router.get('/get-teacher-subject-list/:id', nonacademicController.getGetSubjectListOfTheTeahcer);

//POSR /nonacademic/update-teacher-subject-list         =>this used to assign subject to teacher and remove subject from teacher and update the subjectlist       
router.post('/update-teacher-subject-list', nonacademicController.postUpdateTeacherSubjectList)

//POST /nonacademic/registration-ordinary-exam     =>this is to register student for the ordinary level examinatin  for the 
router.post('/registration-exam', nonacademicController.postRegistratinMainExam);

//POST /nonacademic/add-ordinary-level-results
router.post('/add-ordinary-level-results', nonacademicController.postAddOrdinaryLevelStudentResult);


module.exports = router;