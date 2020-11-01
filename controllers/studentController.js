const Student = require('../models/studentModel');
const { Op, } = require("sequelize");
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const Subject = require('../models/subjectModel');
const Teacher = require('../models/teacherModel');
const Class = require("../models/classModel");
const Result = require('../models/resultModel');



const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {

        api_key: process.env.API_KEY,
    }
}))


exports.getStudentProfile = async (req, res, next) => {

    const _id = req.params.id;

    const studentData = await Student.findOne(
        {
            where:
                { _id: _id },
            include: {
                model: Class,
                attributes: ['grade', 'classid'],

            }
        })


    const teachername = await Teacher.findOne({
        where: {
            classClassid: studentData.class.classid,
        },
        attributes: ['firstname', 'lastname']
    })



    res.status(200).json({
        fetch: true,
        studentData: {
            _id: studentData._id,
            surname: studentData.surname,
            firstName: studentData.firstname,
            lastName: studentData.lastname,
            email: studentData.email,
            username: studentData.username,
            age: studentData.age,
            imagePath: studentData.imagepath.replace("\\", "/"),
            gender: studentData.gender,
            grade: studentData.class.grade,
            classTeacher: teachername.firstname + " " + teachername.lastname,
            startYear: studentData.startyear,
            birthDate: studentData.birthdate,
            addressLine1: studentData.addressline1,
            addressLine2: studentData.addressline2,
            addressLine3: studentData.addressline3,
            city: studentData.city,
            mobile: studentData.mobile

        }
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
                grade: "8_D"
            }
        }
    )
        .then(subjectInfo => {
            responseData.subjectId = subjectInfo.subjectid;
            responseData.subjectName = subjectInfo.subjectname;
            responseData.subjectDes = subjectInfo.subjectinfo;
            return Teacher.findByPk(subjectInfo.dataValues.teacherTeacherid);
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

exports.postAddSubjectPrimary = async (req, res, next) => {

    var studentid = req.body.studentid;    //get the student id for find the student
    var opSubjectname = req.body.optional1;  //in primary case there is only one option to take the subject id we get subject name
    var grade = req.body.grade;



    try {
        const student = await Student.findOne({                             //find the student there check is already submit the registration
            where: {
                _id: studentid,
                subjectRegistrationDone: false

            }
        });
        if (!student) {
            var error = new Error("User Can Not Find OR Have already Registered");
            error.statusCode = 501;
            throw error;
        }

        const addSubjectArr = await Subject.findAll({
            where: {
                [Op.or]: [
                    { grade: grade, mandatory: true },
                    { subjectname: opSubjectname, mandatory: false }                 //later change this one without check
                ]
            }
        });

        if (addSubjectArr.length == 0) {
            var error = new Error("Subjects are not foundable");
            error.statusCode = 501;
            throw error;
        }

        const re = await addSubjectArr.forEach(element => {
            element.addStudent(student);
        });

        student.subjectRegistrationDone = true;    //make the student only submit the registration onece this means that student is registered success

        await student.save();


        res.status(200).json({
            insertion: true,
            studentId: studentid,

        })




    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }

        next(error);
    }


}


exports.getRegisteredSubjectList = async (req, res, next) => {



    teacherArray = [];

    try {

        const datalist = await Student.findOne({
            where: { _id: req.params.studentid },
            include: [Subject]
        })

        if (!datalist) {
            var error = new Error("No relavalt data found");
            error.statusCode = 501;
            throw (error);
        }


        var teacherData;

        const subjectDetailFull = await Promise.all(datalist.subjects.map(async (element) => {
            teacherData = await element.getTeacher();
            if (!teacherData) {
                var error = new Error("No teacher has assign for sum of the subjects try later");
                error.statusCode = 501;
                throw (error);
            }

            return {
                subjectid: element.subjectid,
                subjectname: element.subjectname,
                teacherid: teacherData.teacherid,
                teachername: teacherData.firstname + " " + teacherData.lastname,
                teacheremail: teacherData.email
            };
        }))



        res.status(200).json({
            quaery: true,
            dataArray: subjectDetailFull
        })


    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 501;

        }
        next(error);
    }

}

exports.postAddSubjectOrdinaryLevel = async (req, res, nextt) => {

    const studentid = req.body.studentid;
    const grade = req.body.grade;
    const optional1 = req.body.optional1;
    const optional2 = req.body.optional2;
    const optional3 = req.body.optional3;

    console.log(req.body);

    try {

        const student = await Student.findOne({
            where: {
                _id: studentid,
                subjectRegistrationDone: false
            }
        });

        if (!student) {
            var error = new Error("Not user found or You have Already Submited");
            error.statusCode = 401;
            throw error;
        }

        var subjectidlist = await Subject.findAll({
            where: {

                [Op.or]: [
                    { grade: grade, mandatory: true },
                    {
                        subjectname: [optional1, optional2, optional3],
                        grade: grade,
                        mandatory: false,
                    }
                ]
            }
        })

        subjectidlist.forEach(element => {
            element.addStudent(student);
        });

        student.subjectRegistrationDone = true;

        await student.save();


        res.status(200).json({
            insertion: true,
            studentid: studentid
        })



    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 401;
        }
        nextt(error)
    }


}

exports.getGetResultOfSpecificStudent = async (req, res, next) => {

    var resultArray = []

    try {

        const resultList = await Result.findAll({
            where: {
                grade: req.body.class,
                term: req.body.term,
                year: req.body.year
            }
            ,
            include: [Subject]
        })



        var resObj = {};
        var sum;
        var count;
        resultList.forEach(result => {


            resObj.marks = result.marks;
            resObj.subject = result.subject.subjectname;

            if (resObj.marks >= 75) {
                resObj.grade = "A";
            } else if (resObj.marks >= 55 && resObj.marks <= 74) {
                resObj.grade = "B";
            } else if (resObj.marks >= 35 && resObj.marks <= 54) {
                resObj.grade = "C";
            }
            else {
                resObj.grade = "F";
            }
            resultArray.push(resObj);

            resObj = {};

        });

        if (resultArray.length == 0) {
            var error = new Error("No Results Are Found");
            error.statusCode = 500;
            throw error;
        }


        res.status(200).json({
            resultarray: resultArray
        })

    } catch (error) {

        console.log(error);
    }


}