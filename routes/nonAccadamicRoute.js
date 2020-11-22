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

//POST /nonacademic/update-class            =>this will use to change the student class manualy by the non academic member and send notification to the student
router.post('/update-class-student', nonacademicController.postUpdateStudentClass)

//GET /nonacademic/reset-student-subject  
router.get('/reset-student-subjects/:id', nonacademicController.getResetStudentSubjects);

//GET /nonacademic/get-teacher-subject-list         =>this is used to get the teahcer subjects which are teached by the teacher
router.get('/get-teacher-subject-list/:id', nonacademicController.getGetSubjectListOfTheTeahcer);


router.post('/update-teacher-subject-list', nonacademicController.postUpdateTeacherSubjectList);

//GET /nonacademic/get-pending-leaves
router.get('/get-pending-leaves', nonacademicController.getGetPendingLeaveRequests);

//POST /nonacademic/registration-ordinary-exam     =>this is to register student for the ordinary level examinatin  for the 
router.post('/registration-exam', nonacademicController.postRegistratinMainExam);

//POST /nonacademic/add-ordinary-level-results          =>this route is used to add result of the ordinary level
router.post('/add-ordinary-level-results', nonacademicController.postAddOrdinaryLevelStudentResult);

//POST /nonacademic/add-advance-lavel-result        =>this route is used to add results to the advance level exmination
router.post('/add-advance-lavel-result', nonacademicController.postAddAdvanceLevelExamResult);

//GET  /nonacademic/get-subjects-result-add
router.get('/get-subjects-result-add/:id', nonacademicController.getGetStudentRegisteredSubjectsForResultAdditiion);

//GET /notification/get-all-notifications    =>this method is used to get all the notifications of the students
router.get('/get-all-notifications', nonacademicController.getGetAllNotificaions);

//POST /nonacademic/switch-class-students       =>this router is used to change the grade of the students in the way that random,default ,and best
router.post('/switch-class-students', nonacademicController.postSwitchStudentsClassForTheYear);


//POST /nonacademic/ol-chart-one        =>this route is used to get the data of the ordinary level chartone
router.get('/ol-chart-one', nonacademicController.postGetOrdinalyLevelChartOneData)

//GET  /nonacademic/ol-chart-two        =>this route used to get the data of chart two
router.get('/ol-chart-two', nonacademicController.getGetOrdinaryLevelChartTwo);

//GET /nonacademic/ol-chart-three       =>this route is used to pass the data of the chart three
router.get('/ol-chart-three', nonacademicController.getGetOrdinaryLevelChartThree);

//POST /nonacademic/al-chart-one
router.post('/al-chart-one', nonacademicController.postGetAdvanceLevelChartOne);

router.post('/al-chart-two', nonacademicController.postGetAdvanceLevelChartTwo);

router.post('/al-chart-three', nonacademicController.postGetAdvanceLevelChartThree);


module.exports = router;