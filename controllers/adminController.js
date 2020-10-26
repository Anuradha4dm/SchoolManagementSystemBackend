const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


const Student = require('../models/studentModel');
const DataModel = require("../models/dataModule");

const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');


const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {

        api_key: process.env.API_KEY,
    }
}))

//========send email

//      transporter.sendMail({
//         to: "ulmadushan96@gmail.com",
//         from: "damithanuradha44@gmail.com",
//         subject: "Welcome To ABC School",
//         html: "<h1></h1>"
//     }).then(re => {
//         console.log(re);
//     })
//         .catch(err => {
//             console.log(err)
//         })


exports.postNewStudentProfile = (req, res, next) => {
    const errorArr = validationResult(req);

    if (!errorArr.isEmpty()) {

        var error = new Error("Validation Fail");
        error.statusCode = 422;

        throw error;
    }

    if (!req.file) {
        var error = new Error("Validation Fail");
        error.statusCode = 415;

        throw error;
    }


    bcrypt.hash(req.body.password, 12)
        .then(hashedPassword => {
            return Student.create({
                _id: req.body.userid,
                surname: req.body.surname,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                age: parseInt(req.body.age),
                startyear: parseInt(req.body.startyear),
                imagepath: req.file.path,
                birthdate: req.body.birthdate,
                gender: req.body.gender,
                addressline1: req.body.addressline1,
                addressline2: req.body.addressline2,
                addressline3: req.body.addressline3,
                city: req.body.city,
                mobile: req.body.mobile,
            })

        })
        .then(result => {

            DataModel.findByPk(1).then(re => {
                var id = parseInt((re.dataValues.studentid).split('_')[1]);
                id++;
                re.dataValues.studentid = "ST_" + id;

                DataModel.update(
                    { studentid: "ST_" + id },
                    { where: { _id: 1 } }

                ).then(success => {
                    console.log("data increment success");
                }).catch(error => {
                    var error = new Error("Student Id Increment Problem");
                    error.statusCode = 500;

                    throw error;
                })

            })
            res.status(200).json({
                storeData: true,
                postData: result
            })

            return transporter.sendMail({
                to: "ulmadushan96@gmail.com",
                from: "damithanuradha44@gmail.com",
                subject: "Welcome To ABC School",
                html: "<h1></h1>"
            })

        })
        .then(sendMail => {
            console.log('mail send ');
        })
        .catch(error => {
            if (error.statusCode) {
                error.statusCode = 500;
            }

            next(error);
        })

}


exports.getStudentNewId = (req, res, next) => {

    DataModel.findByPk(1).then(result => {
        res.status(200).json({
            fetch: true,
            Id: result.dataValues.studentid
        })

    }).catch(error => {
        console.log(error)
    })


}