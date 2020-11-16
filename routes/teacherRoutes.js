const express = require('express');


const router = express.Router();

const teacherController = require('../controllers/teacherController');

//POST /teacher/add-student-result
router.post('/add-student-result', teacherController.postAddStudentResults);

//POST /teacher/mark-attendence
router.post('/mark-attendence', teacherController.postMarkStudentAttendence);

//POST     //teacher//class-student-list/:id    
router.get('/class-student-list/:id', teacherController.getStudentListForSpecificTeacher);

router.post('/get-student-subject', teacherController.getSubjectOfStudent);

//GET       /teacher/get-teacher-profile/AC_
router.get('/get-teacher-profile/:id', teacherController.getGetTeacherDataForProfile);

//POST      /teacher/edit-result   =>this route will get the past result data to update the result by the teacher
router.post('/edit-results-get-previous', teacherController.postGetPreviousResultData);

//POST /teacher/update-result        => this router is used to update the past result of the student and update the recode in the database
router.post('/update-student-result', teacherController.postUpdateStudentResult);




module.exports = router;