
const Class = require("../models/classModel");
const Result = require("../models/resultModel");
const ResultSummary = require("../models/resultSummaryModel");
const StudentAttendence = require('../models/studentAttendaceModule');
const QRdata = require('../models/QRdataModel');
const Student = require("../models/studentModel");
const Notification = require("../models/notification");
const nodemailer = require('nodemailer');

const Teacher = require("../models/teacherModel");
const Subject = require("../models/subjectModel");
const QRData = require("../models/QRdataModel");

const { Op, NOW } = require("sequelize");
const TeacherAttendence = require("../models/teacherAttendenceModel");




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
        const date = new Date(req.body.date);
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

                studentAttendenceData.push({ studentId: key, year: year, present: attendencelist[key], month: month, week: getWeek(year, month, day), day: day, date: date })
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

exports.attendanceReSubmit = async (req,res,next) => {
    try{
        const date = new Date(req.body.date);
        const attendencelist = req.body.submitdata;
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const markedList = await StudentAttendence.findAll({
            where: {
                year: year,
                day: day,
                month: month,
            }
        });

        for(const key in attendencelist){
            for(const student of markedList){
                if(student.studentId==key){
                    student.present=attendencelist[key];
                    await student.save();
                }
            }
        }

        res.status(200).json(
            true
        )

    }catch(error){
        console.log(error);
    }
}

exports.checkAttendanceStatus = async (req,res,next) =>{
    try{
        const date = new Date(req.body.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const id = req.body.id;

        const markedList = await StudentAttendence.findOne({
            where: {
                year: year,
                day: day,
                month: month,
                studentId: id
            }
        });

        if(markedList){
            res.status(200).json({
                mark:true
            })
        }
        else{
            res.status(200).json({
                mark:false
            })
        }

    }catch(error){
        console.log(error)
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
            email: teacherData.email,
            username: teacherData.username,
            imagepath: teacherData.imagepath,
            startyear: teacherData.startyear,
            age: teacherData.age,
            gender: teacherData.gender,
            role: teacherData.role,
            subjects: subjectData,
            timatable: teacherData.timetablepath,
            qualifications: (teacherData.qualifications === null) ? "Qualifications are not specified..." : teacherData.qualifications.split('%'),
            description: teacherData.description,
            mobile: teacherData.mobile,
            numberofleaves: teacherData.numberofleaves,
            class: (teacherData.class === null) ? null : teacherData.class.grade,
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

exports.postUpdateTeacherProfile = async (req, res, next) => {

    try {
        const teacherid = req.params.id;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const surname = req.body.surname;
        const username = req.body.username;
        const email = req.body.email;
        const mobile = req.body.mobile;
        const age = req.body.age;
        const gender = req.body.gender;
        const addressline1 = req.body.addressline1;
        const addressline2 = req.body.addressline2;
        const addressline3 = req.body.addressline3;
        const city = req.body.city;
        const role = req.body.role;
        const qualifications = req.body.qualifications;
        const description = req.body.description;
        var imagepath;


        if (req.files.imageData) {

            imagepath = req.files.imageData[0].path.replace('\\', '/');

        } else {
            imagepath = req.body.imagepath;
        }

        const teacherData = await Teacher.findByPk(teacherid);

        if (!teacherData) {
            throw new Error("Teacher Not Found....")
        }


        teacherData.firstname = firstname;
        teacherData.lastname = lastname;
        teacherData.surname = surname;
        teacherData.username = username;
        teacherData.email = email;
        teacherData.mobile = mobile;
        teacherData.age = age;
        teacherData.gender = gender;
        teacherData.addressline1 = addressline1;
        teacherData.addressline2 = addressline2;
        teacherData.addressline3 = addressline3;
        teacherData.city = city;
        teacherData.role = role;
        teacherData.qualifications = qualifications;
        teacherData.description = description;
        teacherData.imagepath = imagepath;


        await teacherData.save();

        res.status(200).json({
            update: true
        })

    }
    catch (error) {
        console.log(error);
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

        const studentName = await Student.findOne({
            where: {
                _id: studentid
            },
            attributes: ['firstname', 'lastname', 'surname']
        })

        const fullname = studentName.firstname + " " + studentName.lastname + " " + studentName.surname;

        const resposeData = resultData.map(value => {
            return { subjectid: value.subjectSubjectid, subjectname: value.subject.subjectname, mark: value.marks }
        })

        res.json({
            result: resposeData,
            fullname: fullname
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
        var count = 0;
        var sum = 0;

        const resultSetInfo = await Result.findAll({
            where: {
                year: year,
                term: term,
                studentid: studentid
            }
        })

        const udpateResultSetToStore = resultSetInfo.map(pastResult => {

            updatedResult.forEach(newResult => {
                sum += +newResult.mark;
                count++;
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

        const avg = await ResultSummary.findOne({
            where: {
                year: year,
                term: term,
                _id: studentid
            }
        })

        avg.average = sum / count;
        await avg.save();

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
            },
            attributes: ['average', 'place', '_id']
        })

        res.status(200).json({
            avarageData: avarageData
        })

    } catch (error) {
        console.log("error", error)

    }

}

exports.sendTeacherNotifications = async (req, res, next) => {
    try {
        const data = req.body.data;
        const notifications = [];
        const list = req.body.list;

        list.forEach((element) => {
            notifications.push({
                type: 4,
                from: req.body.teacherid,
                expire: data.expire,
                message: data.description,
                to: element,
                studentId: element,
                title: data.title,
            });
        });

        await Notification.bulkCreate(notifications);

        res.status(200).json(
            true
        );

    } catch (error) {
        console.log(error);
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
            expiredtime: Date.now() + 60000
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
        const teacherid = req.body.teacherid;
        const sequreid = req.body.sequreid;
        const macaddress = req.body.macid;
        const date = new Date();
        //default
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const teacherData = await Teacher.findOne({
            teacherid: teacherid,
            macaddress: macaddress
        })

        if (!teacherData) {
            throw new Error('Teacher Is Not With Relavante Device....')
        }

        const QRrecode = await QRData.findOne({
            where: {
                teacherTeacherid: teacherid,
                randomcode: sequreid,
                expiredtime: {
                    [Op.gte]: Date.now()
                }
            }
        })

        if (!QRrecode) {
            throw new Error("Authentication Failed....Or Token expire.....");
        }

        const countVal = await TeacherAttendence.count({
            where: {
                teacherTeacherid: teacherid,
                year: year,
                day: day,
                month: month
            }
        })

        if (countVal != 0) {
            throw new Error("Your Have Alredy Mark Your Attendence");
        }


        const addAttendence = await TeacherAttendence.create({
            present: true,
            date: new Date().toLocaleString(),
            year: year,
            day: day,
            month: month,
            teacherTeacherid: teacherid

        })

        if (!addAttendence) {
            throw new Error("Attendence Mark Error....")
        }

        await QRrecode.destroy();

        res.status(200).json({
            markattendence: true
        })

    } catch (error) {

        if (!error.statusCode) {

            error.statusCode = 500;
        }

        next(error)
    }

}

//this is used to print report of students term by term
exports.printReport = async (req, res, next) => {
    try {
        const studentid = req.body.id;
        const grade = req.body.grade;
        const place = req.body.place;
        const term = req.body.term;
        const year = req.body.year;

        var message = "This is your Average.";

        if (place < 4) {
            message += "Great work,Keep going"
        }
        else if (place < 25) {
            message += "Good,You can try to first places"
        }
        else {
            message += "You have to work harder"
        }

        const student = await ResultSummary.findOne({
            where: {
                grade: grade,
                _id: studentid,
                term: term,
                year: year
            }
        });

        if (student.place != null) {
            res.status(200).json(
                false
            );

        } else {
            student.place = place;
            student.message = message;
            await student.save();

            res.status(200).json(
                true
            );
        }

    } catch (error) {
        console.log(error);
    }
}

exports.sendEreport = async (req, res, next) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'newschoolmanagement20@gmail.com',
                pass: 'Madmax@123'
            }
        });

        var filename = req.files.report[0].path.replace('\\', '/');
        const id = req.body.id;

        const student = await Student.findOne({
            where: {
                _id: id
            },
            attributes: ['email']
        });

        var mailOptions = {
            from: 'newschoolmanagement20@gmail.com',
            to: student.email,
            subject: "To Inform Term Test Results",
            text: "Here attached your report of this term",
            attachments: [
                { path: filename }
            ]
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err)
                console.log(err);
            else {
                res.status(200).json(
                    true
                );
            }
        });

    } catch (error) {
        console.log(error);
    }
}

exports.getTeacherAttendance = async (req,res,next) => {
    try{
        const id=req.body.teacherid;
        const month=new Date().getMonth()+1;

        const dates=await TeacherAttendence.findAll({
            where:{
                teacherTeacherid: id,
                month: month
            },
            attributes: ['present','year','day','month']
        });

        res.status(200).json(
            dates
        );

    }catch(error){
        console.log(error);
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