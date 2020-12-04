const express = require('express');


const router = express.Router();

const teacherController = require('../controllers/teacherController');

//POST /teacher/add-student-result
router.post('/add-student-result', teacherController.postAddStudentResults);

//POST /teacher/mark-attendence                  =>teacher will submit the student attendence and then the are store in the database
router.post('/mark-attendence', teacherController.postMarkStudentAttendence);

//POST     //teacher//class-student-list/:id    
router.get('/class-student-list/:id', teacherController.getStudentListForSpecificTeacher);

router.post('/get-student-subject', teacherController.getSubjectOfStudent);

//GET       /teacher/get-teacher-profile/AC_           =>this is the route that provide teacher profile data
router.get('/get-teacher-profile/:id', teacherController.getGetTeacherDataForProfile);

//POST      /teacher/edit-result   =>this route will get the past result data to update the result by the teacher
router.post('/edit-results-get-previous', teacherController.postGetPreviousResultData);

//POST /teacher/update-result     =>this is use to update the result and change past data to new incoming data
router.post('/update-student-result', teacherController.postUpdateStudentResult);

//POST /teacher//get-average-data =>this route is used to get avatage data of the class
router.post('/get-average-data', teacherController.postGetAvarageDataForTheClass);

//POST /teacher/add-qrcode-data   >this route is used to add the data for the QR code
router.post("/add-qrcode-data", teacherController.postAddQRcodeRecode);

//GET /teacher/mark-teacher-attendence   =>this route is used to mark the teacher attendence
router.get("/mark-teacher-attendence", teacherController.getMarkTeacherAttendence)


router.post('/update-teacher-profile/:id', teacherController.postUpdateTeacherProfile);


module.exports = router;