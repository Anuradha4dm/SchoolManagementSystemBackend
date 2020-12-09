const express = require('express');


//import modules
const studentController = require('../controllers/studentController');
const authenticationValidation = require('../validators/authenticationValidation');


const router = express.Router();

// GET=> /studet/profile/:id get the student profile infomation
router.get('/profile/:id', authenticationValidation.authUserChecking, studentController.getStudentProfile);

//POST=> /student/edit-profilr/:id                =>this router is used to update the students profile details
router.post('/edit-profile/:id', authenticationValidation.authUserChecking, studentController.postEditStudentProfile);

//POST=> /student/getSubjectInfo/:subject/:grade
router.post('/getsubjectinfo', studentController.getGetSubjectData);

//POST=> /student/addsubjectprimary
router.post('/addsubjectprimary', studentController.postAddSubjectPrimary);

//POST 
router.post('/add-subject-advance-level', studentController.postAddSubjectAdvanceLevel);

//GET=> /student/get-subject-list/:studentid
router.get('/get-subject-list/:studentid', studentController.getRegisteredSubjectList);

//POST=> /student/add-subject-ordinaty-level
router.post('/add-subject-ordinaty-level', studentController.postAddSubjectOrdinaryLevel);

//GET
router.post('/view-result', studentController.getGetResultOfSpecificStudent);


//GET /student/dashboard
router.get('/dashboard/:id', studentController.getGetDataForDashboardAverage);

//POST /student/get-chart1-data
router.post('/get-chart1-data', studentController.postGetChar1Data);

//POST /student/get-chart2-data
router.post('/get-chart2-data', studentController.postGetDatForChar2);

//POST /studnet/get-attendence-mainchart-data
router.post('/get-attendence-mainchart-data', studentController.postGetAttendenceMainChartData);

//POST /student/add-sports
router.post('/add-sports', studentController.postAddSportsToStudent);

//GET /student/get-sports
router.get('/get-sports/:id', studentController.getGetStudentSports);

module.exports = router;


