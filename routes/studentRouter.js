const express = require('express');

//import modules
const studentController = require('../controllers/studentController');
const authenticationValidation = require('../validators/authenticationValidation');
const { route } = require('./adminRoute');

const router = express.Router();

// GET=> /studet/profile/:id get the student profile infomation
router.get('/profile/:id', studentController.getStudentProfile);

//POST=> /student/edit-profilr/:id
router.post('/edit-profile/:id', studentController.postEditStudentProfile);

//POST=> /student/getSubjectInfo/:subject/:grade
router.get('/getsubjectinfo/:subject/:grade', studentController.getGetSubjectData);


module.exports = router;


