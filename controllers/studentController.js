const Student = require('../models/studentModel');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const Subject = require('../models/subjectModel');
const Teacher = require('../models/teacherModel');



const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {

        api_key: process.env.API_KEY,
    }
}))


exports.getStudentProfile = (req, res, next) => {

    const _id = req.params.id;

    Student.findOne({
        where: {
            _id: _id
        }
    })
        .then(result => {
            const imagePathGeneral = result.imagepath.replace("\\", "/");
            res.status(200).json({
                fetch: true,
                studentData: {
                    _id: result._id,
                    surname: result.surname,
                    firstName: result.firstname,
                    lastName: result.lastname,
                    email: result.email,
                    username: result.username,
                    age: result.age,
                    imagePath: imagePathGeneral,
                    gender: result.gender,
                    startYear: result.startyear,
                    birthDate: result.birthdate,
                    addressLine1: result.addressline1,
                    addressLine2: result.addressline2,
                    addressLine3: result.addressline3,
                    city: result.city,
                    mobile: result.mobile
                }
            })
        })
        .catch(error => {
            console.log(error);

        })


}

exports.postEditStudentProfile = (req, res, next) => {
    const id = req.params.id;
    var updatedImagePath;
    if (req.body.imagepath && !req.file) {
        updatedImagePath = req.body.imagepath
    } else {
        updatedImagePath = req.file.path;
    }


    Student.findByPk(id).then(student => {

        student.surname = req.body.surname,
            student.firstName = req.body.firstname,
            student.lastName = req.body.lastname,
            student.email = req.body.email,
            student.username = req.body.username,
            student.age = req.body.age,
            student.imagePath = updatedImagePath,
            student.gender = req.body.gender,
            student.startYear = req.body.startyear,
            student.birthDate = req.body.birthdate,
            student.addressLine1 = req.body.addressline1,
            student.addressLine2 = req.body.addressline2,
            student.addressLine3 = req.body.addressline3,
            student.city = req.body.city,
            student.mobile = req.body.mobile

        return student.save();
    })
        .then(result => {
            res.status(200).json({
                update: true,
                data: result
            })
        })
        .catch(error => {
            error.statusCode = 503;
            throw error;
        })


}


exports.getGetSubjectData = (req, res, next) => {  //this is used to whent the student click on the subject selection then subject related data will be apper

    responseData = {
        subjectName: '',
        subjectDes: '',
        teacherName: '',
        imagePath: ''
    }

    Subject.findOne(
        {
            where: {
                subjectname: req.params.subject,
                grade: req.params.grade
            }
        }
    )
        .then(subjectInfo => {
            responseData.subjectName = subjectInfo.subjectname;
            responseData.subjectDes = subjectInfo.subjectinfo;
            return Teacher.findByPk(subjectInfo.dataValues.teacherid);
        })
        .then(teacherInfo => {
            responseData.teacherName = teacherInfo.firstname + " " + teacherInfo.lastname;
            responseData.imagePath = teacherInfo.imagepath;
            res.status(200).json(responseData)
        })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 401
            }
            next(error);
        })
}