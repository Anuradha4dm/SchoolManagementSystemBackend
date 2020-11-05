const express = require('express');


//import modules
const studentController = require('../controllers/studentController');
const authenticationValidation = require('../validators/authenticationValidation');


const router = express.Router();

// GET=> /studet/profile/:id get the student profile infomation
router.get('/profile/:id', studentController.getStudentProfile);

//POST=> /student/edit-profilr/:id
router.post('/edit-profile/:id', studentController.postEditStudentProfile);

//POST=> /student/getSubjectInfo/:subject/:grade
router.get('/getsubjectinfo/:subject/:grade', studentController.getGetSubjectData);

//POST=> /student/addsubjectprimary
router.post('/addsubjectprimary', studentController.postAddSubjectPrimary);

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


router.post('/get-attendence-mainchart-data', studentController.postGetAttendenceMainChartData);

module.exports = router;


