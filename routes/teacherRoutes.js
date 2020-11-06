const express = require('express');


const router = express.Router();

const teacherController = require('../controllers/teacherController');

//POST /teacher/add-student-result
router.post('/add-student-result', teacherController.postAddStudentResults);

//POST /teacher/mark-attendence
router.post('/mark-attendence', teacherController.postMarkStudentAttendence);

//POST
router.get('/class-student-list/:id', teacherController.getStudentListForSpecificTeacher);

router.post('/get-student-subject', teacherController.getSubjectOfStudent);


module.exports = router;