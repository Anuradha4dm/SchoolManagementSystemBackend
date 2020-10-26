const express = require('express');

const route = express.Router();

//controllers
const authenticationController = require('../controllers/authenticationController');

route.post('/login', authenticationController.postAuthentication);



module.exports = route;