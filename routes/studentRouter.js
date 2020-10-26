const express = require('express');

//import modules
const studentController = require('../controllers/studentController');
const authenticationValidation = require('../validators/authenticationValidation');

const router = express.Router();

// GET=> /studet/profile/:id get the student profile infomation
router.get('/profile/:id', studentController.getStudentProfile);

//POST=> /student/edit-profilr/:id
router.post('/edit-profile/:id', studentController.postEditStudentProfile);


module.exports = router;


