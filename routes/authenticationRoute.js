const express = require('express');
const authenticationValidator = require('../validators/authenticationValidation');

const route = express.Router();

//controllers
const authenticationController = require('../controllers/authenticationController');
const router = require('./studentRouter');
const NonAcademic = require('../models/nonAcademicModel');

route.post('/login', authenticationController.postAuthentication);


//POST /auth./reset-password        =>this router is used to reset the password for the of the uses if they know their password .
route.post('/reset-password', authenticationController.postResetPassword);

//POST /auth/new-password
route.post('/new-password', authenticationValidator.authUserChecking, authenticationController.postNewpassword);

//POST /auth/forget-password            =>this router is used to request the password request link 
route.post('/forget-password', authenticationController.postForgetPassword);

//POST /auth/set-new-password-forget    =>after the token set to clien then pass to set new password
route.post('/set-new-password-forget', authenticationController.postNewpasswordInForget);


module.exports = route;