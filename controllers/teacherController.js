
const Class = require("../models/classModel");
const Result = require("../models/resultModel");
const ResultSummary = require("../models/resultSummaryModel");
const StudentAttendence = require('../models/studentAttendaceModule');
const QRdata = require('../models/QRdataModel');
const Student = require("../models/studentModel");

const Teacher = require("../models/teacherModel");
const Subject = require("../models/subjectModel");
const QRData = require("../models/QRdataModel");
const { errorMonitor } = require("nodemailer/lib/mailer");
const { Op } = require("sequelize/types");




exports.postAddStudentResults = async (req, res, next) => {

    try {
        const year = req.body.year;
        const term = req.body.term;
        const grade = req.body.grade;
        const studentid = req.body.studentid;
        const resultArray = req.body.result;
        const message = req.body.message;

        const reslutAvailable = await Result.count({
            where: {
                year: year,
                term: term,
                studentId: studentid,
                grade: grade
            }
        });



        if (reslutAvailable != 0) {
            var error = new Error("You have alredy Enter the following result");
            error.statusCode = 401;
            throw error;
        }

        var sum = 0;
        var count = 0

        resultArray.forEach(async resultObj => {

            sum += +resultObj.marks;
            count++;

            resultObj.year = year;
            resultObj.term = term;
            resultObj.studentId = studentid;
            resultObj.grade = grade;

            await Result.create(resultObj);

        });


        const summary = {
            year: year,
            term: term,
            _id: studentid,
            average: (sum) / count,
            message: message,
            grade: grade
        }

        const re = await ResultSummary.create(summary);


        res.status(200).json({
            insert: true,

        })



    } catch (error) {

        if (!error.statusCode) {
            error.statusCode = 500;
        }

        next(error);

    }


}

exports.postMarkStudentAttendence = async (req, res, next) => {

    try {
        const date = new Date();
        const attendencelist = req.body.submitdata;
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        var studentAttendenceData = [];


        var checkMarkAllReady = [];

        for (const key in attendencelist) {
            if (attendencelist.hasOwnProperty(key)) {
                console.log(key)
                checkMarkAllReady = await StudentAttendence.findAll({
                    where: {
                        year: year,
                        day: day,
                        month: month,
                        studentId: key
                    }
                })

                if (checkMarkAllReady.length != 0) {
                    var error = new Error("You Have Already Marks The Student Attendence....");
                    error.statusCode = 401;
                    throw error;
                }

                studentAttendenceData.push({ studentId: key, year: year, present: attendencelist[key], month: month, week: getWeek(year, month, day), day: day, date: new Date() })
            }
        }

        await StudentAttendence.bulkCreate(studentAttendenceData);


        res.status(200).json({
            insert: true
        })

    } catch (error) {

        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }


}


exports.getStudentListForSpecificTeacher = async (req, res, next) => {

    const id = req.params.id;

    var error;

    try {

        const classid = await Teacher.findOne({
            where: {
                teacherid: id,
            },
            attribute: ['classClassid'],
            include: [Class]
        })



        if (!classid.classClassid) {
            error = new Error('You Have No Class...Contact Admin......');
            error.statusCode = 500;
            throw error;
        }

        const studentList = await Student.findAll({
            where: {
                classClassid: classid.classClassid
            },
            attributes: ['_id', 'firstname', 'lastname']
        });

        res.status(200).json({
            grade: classid.class.grade,
            studentListData: studentList
        })





    } catch (error) {

        console.log(error);
    }


}

exports.getSubjectOfStudent = async (req, res, next) => {


    const grade = req.body.grade;
    const studentid = req.body.studentid;

    const subjectlist = await Subject.findAll({
        where: {
            grade: grade
        },
        include: {
            model: Student,
            where: {
                _id: studentid,

            },

        },
        attributes: ['subjectid', 'subjectname']
    }
    )

    const subjectArray = subjectlist.map(element => {
        return { subjectid: element.subjectid, subjectname: element.subjectname }
    });

    res.status(200).json({
        subjectlist: subjectArray
    })

}

exports.getGetTeacherDataForProfile = async (req, res, next) => {


    const teacherid = req.params.id;



    try {

        const teacherData = await Teacher.findOne({
            where: {
                teacherid: teacherid
            },
            include: [Class]
        })

        const subjectData = await Subject.findAll({
            where: {
                teacherTeacherid: teacherid
            },
        })

        if (teacherData === null) {
            var error = new Error('No Teacher Found...Enter Valid User Id');
            error.statusCode = 403;
            throw error;
        }



        res.status(200).json({
            surname: teacherData.surname,
            firstname: teacherData.firstname,
            lastname: teacherData.lastname,
            email: teacherData.lastname,
            username: teacherData.username,
            imagepath: teacherData.imagepath,
            startyear: teacherData.startyear,
            age: teacherData.age,
            role: teacherData.role,
            subjects: subjectData,
            timatable: teacherData.timetablepath,
            qualifications: (teacherData.qualifications === null) ? "Qualifications are not specified..." : teacherData.qualifications.split('%'),
            description: teacherData.description,
            mobile: teacherData.mobile,
            numberofleaves: teacherData.numberofleaves,
            class: (teacherData.class === null) ? "No Class..." : teacherData.class.grade,
            addressline1: teacherData.addressline1,
            addressline2: teacherData.addressline2,
            addressline3: teacherData.addressline3,
            city: teacherData.city
        })


    } catch (error) {

        if (!error.statusCode) {
            error.statusCode = 403;

        }
        next(error);
    }


}

exports.postGetPreviousResultData = async (req, res, next) => {


    const year = req.body.year;
    const term = req.body.term;
    const studentid = req.body.studentid;

    try {

        const resultData = await Result.findAll({
            where: {
                year: year,
                term: term,
                studentId: studentid
            },
            include: Subject,

        });

        const resposeData = resultData.map(value => {
            return { subjectid: value.subjectSubjectid, subjectname: value.subject.subjectname, mark: value.marks }
        })

        res.json({
            result: resposeData
        })

    } catch (error) {

        console.log(error);
    }

}



exports.postUpdateStudentResult = async (req, res, next) => {

    const year = req.body.year;
    const term = req.body.term;
    const studentid = req.body.studentid;
    const updatedResult = req.body.result;


    try {

        const resultSetInfo = await Result.findAll({
            where: {
                year: year,
                term: term,
                studentid: studentid
            }
        })

        const udpateResultSetToStore = resultSetInfo.map(pastResult => {

            updatedResult.forEach(newResult => {
                if (newResult.subjectid === pastResult.subjectSubjectid) {
                    pastResult.marks = newResult.mark;
                    return pastResult;
                }
            })
            return pastResult

        })



        await udpateResultSetToStore.forEach(async element => {
            await element.save()

        });



        res.status(200).json({
            update: true

        })


    } catch (error) {

        console.log(error)
    }

}


exports.postGetAvarageDataForTheClass = async (req, res, next) => {


    try {
        const teacherid = req.body.teacherid;
        const year = req.body.year;
        const term = req.body.term;
        const grade = req.body.grade;


        const avarageData = await ResultSummary.findAll({
            where: {
                year: year,
                term: term,
                grade: grade
            }
        })

        res.status(200).json({
            avarageData: avarageData
        })

    } catch (error) {
        console.log("error", error)

    }

}

exports.postAddQRcodeRecode = async (req, res, next) => {

    try {

        const qrcoderandom = req.body.qrcode;
        const teacherid = req.body.teacherid;

        const teacherData = await Teacher.findOne({
            where: {
                teacherid: teacherid
            }
        })

        if (!teacherData) {
            throw new Error("Teacher not found with id " + teacherid)
        }



        const addQRdata = await QRData.create({
            teacherTeacherid: teacherid,
            randomcode: qrcoderandom,
            expiredtime: Date.now() + 15000
        })


        res.status(200).json({
            auth: true
        })

    } catch (error) {
        if (error.statusCode) {
            error.statusCode = 500;
        }

        next(error)
    }

}

exports.getMarkTeacherAttendence = async (req, res, next) => {

    try {
        const teacherid = req.query.teacherid;
        const sequreid = req.query.sequreid;
        const macaddress = req.query.macid;

        const teacherData = await Teacher.findOne({
            teacherid: teacherid,
            macaddress: macaddress
        })

        if (!teacherData) {
            throw new Error('Teacher not found with relavant device....')
        }

        const QRrecode = await QRData.findOne({
            where: {
                teacherTeacherid: teacherData.teacherid,
                randomcode: sequreid,
                expiredtime: {
                    [Op.lte]: Date.now()
                }
            }
        })

        if (!QRrecode) {
            throw new Error("Authentication Failed....Or Token expire.....");
        }


    } catch (error) {
        console.log("🚀 ~ file: teacherController.js ~ line 458 ~ exports.getMarkTeacherAttendence=async ~ error", error)

    }

}








function getWeek(year, month, day) {

    function serial(days) { return 86400000 * days; }
    function dateserial(year, month, day) { return (new Date(year, month - 1, day).valueOf()); }
    function weekday(date) { return (new Date(date)).getDay() + 1; }
    function yearserial(date) { return (new Date(date)).getFullYear(); }
    var date = year instanceof Date ? year.valueOf() : typeof year === "string" ? new Date(year).valueOf() : dateserial(year, month, day),
        date2 = dateserial(yearserial(date - serial(weekday(date - serial(1))) + serial(4)), 1, 3);
    return ~~((date - date2 + serial(weekday(date2) + 5)) / serial(7));
}