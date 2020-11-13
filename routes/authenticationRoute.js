const express = require('express');
const authenticationValidator = require('../validators/authenticationValidation');

const route = express.Router();

//controllers
const authenticationController = require('../controllers/authenticationController');
const router = require('./studentRouter');

route.post('/login', authenticationController.postAuthentication);


//POST /auth./reset-password
route.post('/reset-password', authenticationController.postResetPassword);

//POST /auth/new-password
route.post('/new-password', authenticationValidator.authUserChecking, authenticationController.postNewpassword);


module.exports = route;