const express = require('express');

const router = express.Router();

const commonController = require('../controllers/commonController');


router.post('/get-leave-profile-data', commonController.postGetDataForleave);

router.post('/get-previous-leave', commonController.postGetPreviousLeavesData);

router.post('/new-leave-request', commonController.postNewLeaveRequest);

router.get('/get-post/:id', commonController.getGetNotifications);

router.post('/send-email', commonController.sendEmail)

module.exports = router;