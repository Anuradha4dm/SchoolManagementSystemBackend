const { body, Result } = require('express-validator/check');
const Student = require('../models/studentModel');


exports.postAddNewStudentValidators = [

    body('email')
        .isEmail()
        .withMessage('Enter Valid Email!'),
    body('password')
        .trim()
        .isLength({ min: 6, max: 60 })
        .withMessage("Password need to contain at least 6 characters")
        .isAlphanumeric()
        .withMessage("password can only containt letters and numbers"),
    body('userid', "User id already Exists")
        .custom((value, { req }) => {

            return Student.findOne({
                where: {
                    _id: value
                }
            }).then(result => {

                if (result) {
                    return Promise.reject("User id already Exists");
                }

            })

        })

]
