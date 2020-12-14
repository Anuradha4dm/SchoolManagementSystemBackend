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


exports.postNewStudentProfile = async (req, res, next) => {
    const errorArr = validationResult(req);

    if (!errorArr.isEmpty()) {

        var error = new Error("Validation Fail");
        error.statusCode = 422;

        throw error;
    }


    if (!req.files.imageData[0]) {
        var error = new Error("No Image Is Added....");
        error.statusCode = 415;

        throw error;
    }



    const classid = await Class.findOne({
        where: {
            grade: req.body.grade
        },
        attributes: ['classid']
    })



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
                imagepath: req.files.imageData[0].path.replace('\\', '/'),
                birthdate: req.body.birthdate,
                gender: req.body.gender,
                addressline1: req.body.addressline1,
                addressline2: req.body.addressline2,
                addressline3: req.body.addressline3,
                city: req.body.city,
                mobile: req.body.mobile,
                classClassid: classid.classid
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


            return transporter.sendMail({
                to: req.body.email,
                from: "damithanuradha44@gmail.com",
                subject: "Welcome To ABC School",
                html: `<h1>Welcome To ABC School, Glad To See You Here</h1>
                    <h3>This message is from school management system and make sure you receive this email first time you encounter the system</h3></br>
                    <h3>Pleace make sure to update your profile by log in to the system and use following credintials for the login</h3></br>
                    <h3>username:${req.body.userid}</h3></br>
                    <h3>password:${req.body.password}</h3></br>
                    <h3>Pleace make sure to change the password in the fist login</h3></br>
                `
            })

        })
        .then(sendMail => {
            res.status(200).json({ newstudent: true })
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
        if (error.statusCode) {
            error.statusCode = 500;
        }

        next(error);
    })
}


exports.getAllCounts = async (req, res, next) => {
    try {
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

    } catch (error) {
        console.log(error);
    }
}

exports.postAddNewTeacher = async (req, res, next) => {

    try {

        if (!req.files.imageData[0]) {
            var error = new Error("No Image Is Added....");
            error.statusCode = 415;

            throw error;
        }

        const hpassword = await bcrypt.hash(req.body.teacherid + 'pwd', 12);

        await Teacher.create({
            teacherid: req.body.teacherid,
            surname: req.body.surname,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: hpassword,
            startyear: req.body.startyear,
            age: req.body.age,
            description: "I am the best Teacher",
            gender: req.body.gender,
            addressline1: req.body.addressline1,
            addressline2: req.body.addressline2,
            addressline3: req.body.addressline3,
            city: req.body.city,
            role: req.body.role,
            mobile: req.body.mobile,
            numberofleaves: req.body.nbrofleaves,
            birthdate: req.body.birthdate,
            imagepath: req.files.imageData[0].path.replace('\\', '/')
        });

        res.status(200).json(
            true
        );

    } catch (error) {
        console.log(error);
    }
}

exports.postCreateNewClass = async (req, res, next) => {
    try {
        const className = req.body.className;
        const year = new Date().getFullYear();

        await Class.create({
            year: year,
            grade: className,
            numofstudents: 0,
            timetable: ''
        });

        res.status(200).json(
            true
        )
    }
    catch (error) {
        console.log(error);
    }
}