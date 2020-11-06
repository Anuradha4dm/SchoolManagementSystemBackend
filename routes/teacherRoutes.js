const express = require('express');

const router = express.Router();

const teacherController = require('../controllers/teacherController');

//POST /teacher/add-student-result
router.post('/add-student-result', teacherController.postAddStudentResults);

//POST /teacher/mark-attendence
router.post('/mark-attendence', teacherController.postMarkStudentAttendence);

//POST


module.exports = router;