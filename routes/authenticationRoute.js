const express = require('express');
const authenticationValidator = require('../validators/authenticationValidation');

const route = express.Router();

//controllers
const authenticationController = require('../controllers/authenticationController');
const router = require('./studentRouter');

route.post('/login', authenticationController.postAuthentication);


//POST /auth./reset-password
route.post('/reset-password', authenticationController.postResetPassword)


module.exports = route;