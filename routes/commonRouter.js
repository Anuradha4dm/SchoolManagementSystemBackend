const express = require('express');

const router = express.Router();

const commonController = require('../controllers/commonController');


router.post('/get-leave-profile-data', commonController.postGetDataForleave);

router.post('/get-previous-leave', commonController.postGetPreviousLeavesData);

router.post('/new-leave-request', commonController.postNewLeaveRequest);

module.exports = router;