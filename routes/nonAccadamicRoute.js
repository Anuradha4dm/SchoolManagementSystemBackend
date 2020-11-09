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


module.exports = router;