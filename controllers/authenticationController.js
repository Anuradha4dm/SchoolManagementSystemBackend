
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const crypto = require('crypto')

//database models
const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
const Admin = require('../models/adminModel');
const NonAcademic = require('../models/nonAcademicModel');

const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');


const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {

        api_key: process.env.API_KEY,
    }
}))

// email send
//     transporter.sendMail({
//         to: "ulmadushan96@gmail.com",
//         from: "damithanuradha44@gmail.com",
//         subject: "Welcome To ABC School",
//         html: "<h1></h1>"
//     }).then(re => {
//         console.log(re);
//     })
//         .catch(err => {
//             console.log(err)
//      })
// 


exports.postAuthentication = (req, res, next) => {

    console.log(req.body);
    const _id = req.body._id;
    const password = req.body.password;
    var userid;
    var useremail;

    const roll = _id.split('_')[0];

    if (roll == "ST") {
        Student.findAll({
            attributes: ['password', '_id', 'email'],
            where: { _id: _id }
        })
            .then(result => {


                if (result.length === 0) {
                    const error = new Error("Invalid Username or Password");
                    error.statusCode = 401;
                    throw error;
                }

                userid = result[0].dataValues._id;
                useremail = result[0].dataValues.email;

                return bcrypt.compare(password, result[0].dataValues.password);


            })
            .then(isMatch => {
                if (!isMatch) {
                    const error = new Error("Invalid Username or Password");
                    error.statusCode = 401;
                    throw error;
                }

                console.log("data")
                const token = jwt.sign({
                    _id: userid,
                    email: useremail

                }, 'sercret', { expiresIn: '1h' });

                res.status(200).json({
                    authentication: true,
                    token: token,
                    _id: userid,
                    logInAs: "student",
                    expirationdata: new Date().getTime() + 3600 * 1000
                })
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 401;

                }

                next(error);
            })

    }
    if (roll == "AC") {

        Teacher.findAll({
            attributes: ['password', 'teacherid', 'email'],
            where: { teacherid: _id }
        })
            .then(result => {


                if (result.length === 0) {
                    const error = new Error("Invalid Username or Password");
                    error.statusCode = 401;
                    throw error;
                }

                userid = result[0].dataValues.teacherid;
                useremail = result[0].dataValues.email;

                return bcrypt.compare(password, result[0].dataValues.password);


            })
            .then(isMatch => {
                if (!isMatch) {
                    const error = new Error("Invalid Username or Password");
                    error.statusCode = 401;
                    throw error;
                }

                console.log("data")
                const token = jwt.sign({
                    _id: userid,
                    email: useremail

                }, 'sercret', { expiresIn: '1h' });

                res.status(200).json({
                    authentication: true,
                    token: token,
                    _id: userid,
                    logInAs: "teacher",
                    expirationdata: new Date().getTime() + 3600 * 1000
                })
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 401;

                }

                next(error);
            })

    }
    if (roll == "AD") {

        Admin.findAll({
            attributes: ['password', 'adminid', 'publicemail'],
            where: { adminid: _id }
        })
            .then(result => {


                if (result.length === 0) {
                    const error = new Error("Invalid Username or Password");
                    error.statusCode = 401;
                    throw error;
                }

                userid = result[0].dataValues.adminid;
                useremail = result[0].dataValues.publicemail;

                return bcrypt.compare(password, result[0].dataValues.password);


            })
            .then(isMatch => {
                if (!isMatch) {
                    const error = new Error("Invalid Username or Password");
                    error.statusCode = 401;
                    throw error;
                }

                console.log("data")
                const token = jwt.sign({
                    _id: userid,
                    email: useremail

                }, 'sercret', { expiresIn: '1h' });

                res.status(200).json({
                    authentication: true,
                    token: token,
                    _id: userid,
                    logInAs: "admin",
                    expirationdata: new Date().getTime() + 3600 * 1000
                })
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 401;

                }

                next(error);
            })

    }
    if (roll == "NAC") {

        NonAcademic.findAll({
            attributes: ['password', 'nonacademicid', 'email'],
            where: { nonacademicid: _id }
        })
            .then(result => {


                if (result.length === 0) {
                    const error = new Error("Invalid Username or Password");
                    error.statusCode = 401;
                    throw error;
                }

                userid = result[0].dataValues.nonacademicid;
                useremail = result[0].dataValues.email;

                return bcrypt.compare(password, result[0].dataValues.password);


            })
            .then(isMatch => {
                if (!isMatch) {
                    const error = new Error("Invalid Username or Password");
                    error.statusCode = 401;
                    throw error;
                }

                console.log("data")
                const token = jwt.sign({
                    _id: userid,
                    email: useremail

                }, 'sercret', { expiresIn: '1h' });

                res.status(200).json({
                    authentication: true,
                    token: token,
                    _id: userid,
                    logInAs: "nonacademic",
                    expirationdata: new Date().getTime() + 3600 * 1000
                })
            })
            .catch(error => {
                if (!error.statusCode) {
                    error.statusCode = 401;

                }

                next(error);
            })

    }

}


exports.postResetPassword = async (req, res, next) => {

    const userid = req.body.userid;
    const email = req.body.email;

    const user = userid.split('_')[0];

    var token;
    var expire;

    try {
        const validator = validationResult(req);

        if (validator.errors.length != 0) {
            throw new Error(validator.errors[0].msg);
        }

        crypto.randomBytes(32, (error, buff) => {
            if (error) {
                error.statusCode = 500;
                error.message = "Internal Server Error"
            }

            token = buff.toString('hex');
            expire = new Date().getTime() + 3600000;

        })

        if (user === "ST") {
            const studentData = await Student.findOne({
                where: {
                    _id: userid
                }
            });


            studentData.resetToken = token;
            studentData.resetTokenExpire = expire;

            await studentData.save();

            const re = await transporter.sendMail({
                to: email,
                from: "damithanuradha44@gmail.com",
                subject: "Reset Password",
                html: `<p>Password Reset</p>
                        <p>Click  link <a href="http://localhost:4200/home" >Link</a></p>
                
                `
            })
            console.log(re)

        }



    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 401;
        }
        next(error)

    }

}
