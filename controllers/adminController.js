const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


const Student = require('../models/studentModel');
const DataModel = require("../models/dataModule");
const Teacher = require('../models/teacherModel');
const NonAcademic = require('../models/nonAcademicModel');
const Class = require('../models/classModel');

const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const Subject = require('../models/subjectModel');


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


exports.getTest = (req, res, next) => {

    var student;

    Student.findByPk("ST_1")
        .then(re => {
            student = re;
        }).catch(error => {
            console.log(error)
        })


    Subject.findByPk(1)
        .then(re => {
            return re.addStudent(student);
        })
        .then(re => {
            console.log(re);
        })
        .catch(error => {
            console.log(error);
        })


}


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


exports.getAllCounts = async (req,res,next) => {
    try{
        const teacherCount = await Teacher.count();
        const studentCount = await Student.count();
        const nonCount = await NonAcademic.count();
        const classCount = await Class.count();

        res.status(200).json({
            teacherCount: teacherCount,
            studentCount: studentCount,
            nonCount: nonCount,
            classCount: classCount
        });

    }catch(error){
        console.log(error);
    }
}

exports.postAddNewTeacher = async (req,res,next) => {
    try{
        const data=req.body.data;
        const hpassword=await bcrypt.hash(req.body.teacherid+'pwd',12);

        await Teacher.create({
            teacherid: req.body.teacherid,
            surname: data.surname,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            username: data.username,
            password: hpassword,
            startyear: data.startyear,
            age: data.age,
            description: "I am the best Teacher",
            gender: data.gender,
            addressline1: data.addressline1,
            addressline2: data.addressline2,
            addressline3: data.addressline3,
            city: data.city,
            role: data.role,
            mobile: data.mobile,
            numberofleaves: data.nbrofleaves,
            birthdate: data.birthdate,
        });

        res.status(200).json({
            create: true
        });

    }catch(error){
        console.log(error);
    }
}