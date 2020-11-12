const jwt = require('jsonwebtoken');
const { errorMonitor } = require('stream');
const { body } = require('express-validator');
const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
const NonAcademic = require('../models/nonAcademicModel');

exports.authUserChecking = (req, res, next) => {
    const tokenFull = req.get("Authorization");
    var decodedToken;
    if (!tokenFull) {
        const error = new Error("You token doesnot exists");
        error.statusCode = 401;
        throw error;
    }

    const token = tokenFull.split(' ')[1];

    try {
        decodedToken = jwt.verify(token, 'sercret')
    } catch (error) {
        error.message = "Authentication Faild"
        error.statusCode = 401;
        throw error;
    }
    if (!decodedToken) {
        const error = new Error("Authenticatin Falid");
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken._id;
    next();
}


exports.resetPasswordChecking = [

    body()
        .custom((value, { req }) => {

            const user = value.userid.split('_')[0];

            if (user === "ST") {

                Student.findOne({
                    where: {
                        email: value.email
                    }
                }).then(user => {

                    if (user == null) {

                        return true;
                    }
                    return true;
                })

            }
            if (user === "AC") {
                Teacher.findOne({
                    where: {
                        email: value.email
                    }
                }).then(user => {

                    if (user == null) {

                        return false;
                    }
                    return true;
                })


            }
            if (user === "NAC") {
                NonAcademic.findOne({
                    where: {
                        email: value.email
                    }
                }).then(user => {

                    if (user == null) {

                        return true;
                    }
                    return true;
                })


            }


        }).withMessage("Email Does Not Exist")


]