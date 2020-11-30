
const fs = require('fs');

const { Op } = require('sequelize');

const Class = require('../models/classModel');
const Leave = require('../models/leaveRequest');
const MainExamDetails = require('../models/mainExamDetails');
const MainExamResult = require('../models/mainExamResult');
const MainExamSubject = require('../models/mainExamSubjects');
const NonAcademic = require('../models/nonAcademicModel');
const Notification = require('../models/notification');
const PermissionAvanceLevel = require('../models/permissionAdvanceLavel');
const ResultSummary = require('../models/resultSummaryModel');
const Student = require('../models/studentModel');
const Subject = require('../models/subjectModel');
const SubjectWrapper = require('../models/subjectWrapper');
const Teacher = require('../models/teacherModel');
const { resetPasswordChecking } = require('../validators/authenticationValidation');

//Use to get pending leave data
exports.getGetPengingRequestList = async (req, res, next) => {


    try {

        const pendingList = await Leave.findAll({
            where: {
                allow: false
            },
            include: [Teacher]
        })


        const pendingLeaveArray = pendingList.map(element => {

            if (element.leavetype === 0) {
                element.leavetype = "Half Day"
            }

            if (element.leavetype === 1) {
                element.leavetype = "Short Leave"
            }

            if (element.leavetype === 2) {
                element.leavetype = "Full Day"
            }


            return {
                leaveid: element.leaveid,
                leavedate: element.leavedate,
                leavedescription: element.description,
                leavetype: element.leavetype,
                fullname: element.teacher.firstname + " " + element.teacher.lastname,
                roll: element.teacher.role,
                userid: element.teacher.teacherid
            }

        })

        res.status(200).json({
            pendingLeaveData: pendingLeaveArray
        })



    } catch (error) {
        console.log(error);
    }


}

exports.postAnswerLeaveRequest = async (req, res, next) => {

    const leaveid = req.body.leaveid;
    const answer = req.body.answer;
    const leavetype = req.body.leavetype;
    const id = req.body.nonacademicid;
    const message = req.body.message;


    try {

        if (answer || !answer) {
            //this should modify to send email including this.message 
            //send notification that the requese is cansel
            //retur from here
        }

        const leave = await Leave.findOne({
            where: {
                leaveid: leaveid
            },
            include: Teacher
        });

        //you can remove this not nesssary
        if (leave === null) {
            throw new Error("No Leave Is Found...Check Again....")
        }

        if (leave.allow) {
            res.status(200).json({
                update: true,
                messsge: "Already Leave Is Accepted"
            })
        }
        if (answer) {

            leave.allow = true;
            if (leave.leavetype != 2) {
                leave.teacher.numberofleaves -= 0.5
            } else {
                leave.teacher.numberofleaves -= 1;
            }

            await leave.teacher.save();

            await leave.save();


            await Notification.create({
                type: 2,
                from: id,
                title: "Allow Leave Request",
                message: message,
                expire: new Date().getTime() + (1000 * 3600 * 24 * 3),
                attachmentpath: null,
                publisher: id,
                to: leave.teacher.teacherid,
                teacherTeacherid: leave.teacher.teacherid
            })



            res.status(200).json({
                leaveupdate: true
            })

        } else {
            leave.allow = true;

            await leave.destroy();

            await Notification.create({
                type: 2,
                from: id,
                title: "Reject Leave Request",
                message: message,
                expire: new Date().getTime() + (1000 * 3600 * 24 * 3),
                attachmentpath: null,
                publisher: id,
                to: leave.teacher.teacherid,
                teacherTeacherid: leave.teacher.teacherid
            })
            res.status(200).json({
                leaveupdate: true
            })

        }


        res.status(200).json({
            update: true,
            message: message
        })


        // leave.allow = answer;

        // const teacherUpdate = await leave.teacher.save();
        // const leaveUpdate = await leave.save();


        // res.status(200).json({
        //     update: true
        // })


    } catch (error) {

        if (!error.statusCode) {

            error.statusCode = 500;
        }

        next(error);
    }

}

exports.postAddNotification = async (req, res, next) => {

    //0-all
    //1-all teachers
    //2-specific-teacher
    //3-all students
    //4-fora student
    //5-for a grade

    const nonacademicid = req.body.nonacademicid;
    const type = req.body.type;
    const from = req.body.from;
    const title = req.body.title;
    const expire = req.body.expire;
    const message = req.body.description;
    const to = req.body.to;
    var path;


    if (req.files.attachment == undefined) {
        path = null;
    } else {
        path = req.files.attachment[0].path.replace('\\', '/');
    }


    try {


        if (parseInt(type) === 0 || parseInt(type) === 1 || parseInt(type) === 3) {
            const newNotification = await Notification.create({
                type: type,
                from: from,
                title: title,
                message: message,
                expire: expire,
                attachmentpath: path,
                publisher: nonacademicid,
                to: to

            });



        }

        if (parseInt(type) === 2) {
            const teacherList = req.body.teacherarray.split(',');

            var teacherData;

            teacherList.forEach(async teacher => {

                teacherData = await Teacher.findOne({
                    where: {
                        teacherid: teacher
                    }
                })

                if (!teacherData) {
                    var error = new Error("No Teacher Found");
                    error.statusCode = 500;
                    throw error;
                }
                await Notification.create({
                    type: type,
                    from: from,
                    title: title,
                    message: message,
                    expire: expire,
                    attachmentpath: path,
                    publisher: nonacademicid,
                    to: teacherData.teacherid,
                    teacherTeacherid: teacherData.teacherid
                })

            });


        }

        if (parseInt(type) === 4) {
            const studentList = req.body.studentarray.split(',');

            var studentData;

            studentList.forEach(async student => {

                studentData = await Student.findOne({
                    where: {
                        _id: student
                    }
                })

                if (!studentData) {
                    var error = new Error("No Student Found");
                    error.statusCode = 500;
                    throw error;
                }

                await Notification.create({
                    type: type,
                    from: from,
                    title: title,
                    message: message,
                    expire: expire,
                    attachmentpath: path,
                    publisher: nonacademicid,
                    to: studentData._id,
                    studentId: studentData._id

                })

            });


        }

        res.status(200).json({
            notification: true,
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }

        next(error);
    }




}


exports.getGetClassTeacherData = async (req, res, next) => {

    const classname = req.params.class;

    try {

        const classid = await Class.findOne({
            where: {
                grade: classname
            },
            attributes: ['classid']
        })

        const teacherinfo = await Teacher.findOne({
            where: {
                classClassid: classid.classid
            }
        })

        if (!teacherinfo) {
            var error = new Error("No Teacher Assign Still");
            error.statusCode = 500;
            throw error;
        }



        res.status(200).json({
            fullname: teacherinfo.firstname + " " + teacherinfo.lasename,
            teacherid: teacherinfo.teacherid,
            year: teacherinfo.startyeat,
            email: teacherinfo.email,
            qualifications: teacherinfo.qualifications,
            image: teacherinfo.imagepath

        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

exports.getGetFreeClassTeachers = async (req, res, next) => {


    try {

        const teacherList = await Teacher.findAll({
            where: {
                classClassid: null
            },
            attributes: ['teacherid', 'username']
        })

        res.status(200).json({
            teachers: teacherList
        })


    } catch (error) {

        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}


exports.postUpdateClassHandler = async (req, res, next) => {

    const classname = req.body.classname;
    const newTeacherid = req.body.newTeacherid;
    const pastTeacherid = req.body.pastTeacherid;



    try {
        if (newTeacherid && pastTeacherid) {

            const pastClassTeacher = await Teacher.findOne({

                where: {
                    teacherid: pastTeacherid
                },

            })
            console.log(pastClassTeacher)

            const classid = pastClassTeacher.classClassid;

            pastClassTeacher.classClassid = null;

            const pastTeacherRemoveClass = await pastClassTeacher.save();

            const newClassTeacher = await Teacher.findOne({
                where: {
                    teacherid: newTeacherid
                }
            })

            newClassTeacher.classClassid = classid;

            const newTeacherAddData = await newClassTeacher.save();

            if (!newTeacherAddData) {
                var error = new Error("Update Teacher Fail");
                error.statusCode = 500;
                throw error;
            }

        }
        if (newTeacherid && !pastTeacherid) {

            const classData = await Class.findOne({
                where: {
                    grade: classname
                },

            })

            const newTeacherData = await Teacher.findOne({
                where: {
                    teacherid: newTeacherid
                }
            })

            newTeacherData.classClassid = classData.classid;
            const assignNewTeacher = await newTeacherData.save();



        }



        if (req.files) {
            const getClass = await Class.findOne({
                where: {
                    grade: classname,
                }
            });

            var setFilePath = req.files.timetable[0].path;

            getClass.timetable = setFilePath.replace('\\', '/');

            await getClass.save();


        }




    } catch (error) {
        console.log(error);
    }



    res.status(200).json({
        success: true
    })

}

exports.getGetClassOfAStudent = async (req, res, next) => {

    const studentid = req.params.id;



    try {

        const classData = await Student.findOne({
            where: {
                _id: studentid,
            },
            include: Class,

        })



        res.status(200).json({
            grade: classData.class.dataValues.grade,
            gradeid: classData.class.dataValues.classid,

        })

    } catch (error) {
        console.log(error);
    }

}

exports.postUpdateStudentClass = async (req, res, next) => {

    const classname = req.body.moveclass;
    const studentid = req.body.studentid;
    const nonacademicid = req.body.nonacademicid;

    try {

        const studentData = await Student.findOne({
            where: {
                _id: studentid
            }
        })

        const classData = await Class.findOne({
            where: {
                grade: classname
            }
        })

        studentData.classClassid = classData.classid;

        const result = await studentData.save();

        const notification = await studentData.createNotification({
            type: 4,
            from: nonacademicid,
            expire: new Date() + (3600000 * 24 + 3),
            message: `You have successfully change your class to ${classname}`,
            to: studentid,
            publisher: nonacademicid,
            title: "Class Change Success",
            attachmentpath: null,


        })


        res.status(200).json({
            update: true
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }

        next(error)

    }
}

exports.getResetStudentSubjects = async (req, res, next) => {

    const studentid = req.params.id;


    try {

        const studentData = await Student.findOne({
            where: {
                _id: studentid
            }
        });

        if (studentData === null) {
            var error = new Error('Student Not found...');
            error.statusCode = 401;
            throw error;
        }

        studentData.subjectRegistrationDone = 0;

        const deleteData = await SubjectWrapper.destroy({
            where: {
                studentId: studentid
            }
        })

        if (!deleteData) {
            var error = new Error('You Have No Register For Subjects...');
            error.statusCode = 401;
            throw error;
        }

        const notification = await studentData.createNotification({
            type: 4,
            from: "ADMIN",
            expire: new Date() + (3600000 * 24 + 3),
            message: `You have successfully Reset Class .Pleace Re-Register for subject as soon as possible . Otherwise you will loose the process tracking`,
            to: studentid,
            publisher: "ADMIN",
            title: "Subject Reset",
            attachmentpath: null,

        });


        res.status(200).json({
            update: true
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }

        next(error)

    }

}

exports.getGetSubjectListOfTheTeahcer = async (req, res, next) => {

    try {

        const teacherid = req.params.id;

        const teacherData = await Teacher.findOne({
            where: {
                teacherid: teacherid
            }
        })

        if (teacherData === null) {
            var error = new Error("Teacher Not Found With Id " + teacherid);
            error.statusCode = 401;
            throw error;
        }

        const subjectList = await Subject.findAll({
            where: {
                teacherTeacherid: teacherid,
            }
        })

        const responceList = subjectList.map(subject => {

            return {
                subjectid: subject.subjectid,
                subjectname: subject.subjectname,
                assigndate: subject.createdAt,
                grade: subject.grade
            }
        })


        res.status(200).json({
            subjectlist: responceList
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 401;
        }
        next(error)
    }
}


exports.postUpdateTeacherSubjectList = async (req, res, next) => {


    try {
        const teacherid = req.body.teacherid;
        const updatedSubjectList = req.body.subjectList;

        var updatedSubjectids = [];

        updatedSubjectList.forEach(element => {
            return updatedSubjectids.push(element.subjectid);
        });

        const teacherSubjectList = await Subject.findAll({
            where: {
                [Op.or]: {
                    teacherTeacherid: teacherid,
                    subjectid: updatedSubjectids

                }
            }
        })

        teacherSubjectList.forEach(subject => {


            if (updatedSubjectids.includes(subject.subjectid)) {

                subject.teacherTeacherid = teacherid;
            } else {
                subject.teacherTeacherid = null;
            }
        });


        teacherSubjectList.forEach(async subject => {

            await subject.save();

        })

        res.status(200).json({
            update: true
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 401
        }
        next(error)

    }

}

exports.postRegistratinMainExam = async (req, res, next) => {

    try {
        const studentid = req.body.studentid;
        const indexnumber = req.body.indexnumber;
        const year = req.body.year;
        const shy = req.body.shy;
        const type = req.body.type;
        const subjectsList = req.body.subjectnames;
        const studentclass = req.body.class;
        const stream = req.body.stream;

        var registration;

        const studentData = await Student.findOne({
            where: {
                _id: studentid
            }
        });

        if (studentData === null) {
            throw new Error('User Not Found....')
        }


        if (!type) {
            registration = await MainExamDetails.create({
                indexnumber: indexnumber,
                studentid: studentid,
                meyear: year,
                metype: false,
                shy: shy,
                class: studentclass
            })


        }
        if (type) {
            registration = await MainExamDetails.create({
                indexnumber: indexnumber,
                studentid: studentid,
                meyear: year,
                metype: true,
                shy: shy,
                stream: stream

            })

        }

        if (registration === null) {
            throw new Error('Registration Fail....');
        }

        const mainExamSubjectId = await MainExamSubject.findAll({
            where: {
                mesubjectname: {
                    [Op.in]: subjectsList
                }
            },

        })

        const registerSubject = await studentData.addMainexamsubjects(mainExamSubjectId, { through: { year: year, metype: type } });

        if (registerSubject.length === 0) {
            throw new Error('Some Probolem Occur In the Registration....');
        }


        res.status(200).json({
            registration: true,
            subjectRegister: true,
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }

        next(error);
    }
}
exports.getGetPendingLeaveRequests = async (req, res, next) => {

    //0-half day
    //1-short leave
    //2- full day

    try {

        const getPendingRequests = await Leave.findAll({
            where: {
                [Op.and]: {
                    allow: false,
                    leavedate: {
                        [Op.gte]: new Date()
                    }
                }
            },
            include: Teacher
        });

        var type = "";

        var responsePendingLeaveDataArray = getPendingRequests.map(leaveData => {

            if (leaveData.leavetype === 0) {
                type = "Half Day"
            }
            if (leaveData.leavetype === 0) {
                type = "Short Leave"
            }
            if (leaveData.leavetype === 0) {
                type = "Full Day"
            }


            return {
                leaveid: leaveData.leaveid,
                leavedate: leaveData.leavedate,
                description: leaveData.description,
                leavetype: type,
                userid: leaveData.teacherTeacherid,
                fullname: leaveData.teacher.firstname + " " + leaveData.teacher.lastname,
                role: leaveData.teacher.role,
                numofleave: leaveData.teacher.numberofleaves
            }
        })


        res.status(200).json({
            leavedata: responsePendingLeaveDataArray
        })



    } catch (error) {

        console.log(error);
    }

}

exports.postAddOrdinaryLevelStudentResult = async (req, res, next) => {


    try {
        const nonacademcid = req.body.nonacademicid;
        const indexnumber = req.body.indexnumber;
        const year = req.body.year;
        const type = req.body.type;
        const result = req.body.results;
        const districtrank = req.body.districtrank;
        const islandrank = req.body.islandrank;
        var resultcounts = { acount: 0, bcount: 0, ccount: 0, scount: 0, wcount: 0 };



        var storeResultData = result.map(result => {

            if (result.meresult.toUpperCase() === "A") {
                resultcounts.acount++;
            }

            if (result.meresult.toUpperCase() === "B") {
                resultcounts.bcount++;
            }

            if (result.meresult.toUpperCase() === "C") {
                resultcounts.ccount++;
            }

            if (result.meresult.toUpperCase() === "S") {
                resultcounts.scount++;
            }

            if (result.meresult.toUpperCase() === "W") {
                resultcounts.wcount++;
            }

            return { index: indexnumber, meyear: year, metype: false, subjectid: result.mesubjectid, result: result.meresult.toUpperCase() }
        });





        const meDetailsOfStudent = await MainExamDetails.findOne({
            where: {
                indexnumber: indexnumber
            }
        });

        meDetailsOfStudent.districtrank = districtrank;
        meDetailsOfStudent.islandrank = islandrank;
        meDetailsOfStudent.acount = resultcounts.acount;
        meDetailsOfStudent.bcount = resultcounts.bcount;
        meDetailsOfStudent.ccount = resultcounts.ccount;
        meDetailsOfStudent.scount = resultcounts.scount;
        meDetailsOfStudent.wcount = resultcounts.wcount;
        meDetailsOfStudent.addresultdone = true;

        const addOLresults = await MainExamResult.bulkCreate(storeResultData);
        const detailUpdateOfStudent = await meDetailsOfStudent.save();

        if (detailUpdateOfStudent === null || addOLresults === null) {
            throw new Error("Result Addition Problem... Try Later....");
        }

        res.status(200).json({
            resultaddtion: true
        })


    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;

        }

        next(error);

    }

}

exports.postAddAdvanceLevelExamResult = async (req, res, next) => {

    try {

        const nonacademicid = req.body.nonacademicid;
        const indexnumber = req.body.indexnumber;
        const year = req.body.year;
        const islandrank = req.body.islandrank;
        const districtrank = req.body.districtrank;
        const resultList = req.body.results;
        const stream = req.body.stream;
        const zscore = req.body.zscore;
        var resultcounts = { acount: 0, bcount: 0, ccount: 0, scount: 0, wcount: 0 };

        const mainExamRegistrationData = await MainExamDetails.findOne({
            where: {
                indexnumber: indexnumber
            }
        });

        const storeResultArray = resultList.map(result => {
            if(result.mesubjectid!=10){
                if (result.meresult.toUpperCase() === "A") {
                    resultcounts.acount++;
                }
    
                if (result.meresult.toUpperCase() === "B") {
                    resultcounts.bcount++;
                }
    
                if (result.meresult.toUpperCase() === "C") {
                    resultcounts.ccount++;
                }
    
                if (result.meresult.toUpperCase() === "S") {
                    resultcounts.scount++;
                }
    
                if (result.meresult.toUpperCase() === "W") {
                    resultcounts.wcount++;
                }
            }
            return { meyear: year, metype: true, subjectid: result.mesubjectid, result: result.meresult.toUpperCase(), index: indexnumber }
        });

        mainExamRegistrationData.stream = stream;
        mainExamRegistrationData.zscore = zscore;
        mainExamRegistrationData.districtrank = districtrank;
        mainExamRegistrationData.islandrank = islandrank;
        mainExamRegistrationData.acount = resultcounts.acount;
        mainExamRegistrationData.bcount = resultcounts.bcount;
        mainExamRegistrationData.ccount = resultcounts.ccount;
        mainExamRegistrationData.scount = resultcounts.scount;
        mainExamRegistrationData.wcount = resultcounts.wcount;
        mainExamRegistrationData.addresultdone = true;




        const updateProfileDataInRegistration = await mainExamRegistrationData.save();
        const addedResultData = await MainExamResult.bulkCreate(storeResultArray);

        if (updateProfileDataInRegistration === null || addedResultData === null) {
            throw new Error("Result Additoin Error Occure ... Try Later...")
        }

        res.status(200).json({
            resultaddtion: true
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }

        next(error);
    }

}


exports.getGetStudentRegisteredSubjectsForResultAdditiion = async (req, res, next) => {

    try {

        const studentid = req.params.id;
        const year = parseInt(req.query.year);



        const studentData = await Student.findOne({
            where: {
                _id: studentid
            }
        })

        if (studentData === null) {
            throw new Error('Student Not Found With Is' + studentid);
        }

        const subjectData = await studentData.getMainexamsubjects(
            {
                through: {
                    where: {
                        year: year
                    }
                }
            });

        if (subjectData.length === 0) {
            throw new Error('Subject Are Not Found....')
        }

        const responseDataSetUp = subjectData.map(subject => {
            return { mesubjectid: subject.mesubjectid, mesubjectname: subject.mesubjectname }
        })

        res.status(200).json(
            {subjects: responseDataSetUp, studentname: studentData.firstname + " " + studentData.lastname }
        )


    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getGetAllNotificaions = async (req, res, next) => {

    try {

        const notification = await Notification.findAll();
        res.status(200).json({

            notificationList: notification
        });

    } catch (error) {
        console.log("error", error)

    }
}

exports.postSwitchStudentsClassForTheYear = async (req, res, next) => {

    try {

        const switchingTypeMode = req.body.type;


        if (switchingTypeMode === "random") {


            var gradeCount = 1;
            var previousGrade = []

            for (let i = 0; i < 4; i++) {
                previousGrade[i] = await Student.findAll({
                    where: {
                        classClassid: {
                            [Op.in]: [gradeCount, gradeCount + 1, gradeCount + 2, gradeCount + 3, gradeCount + 4]
                        }
                    }
                });

                gradeCount += 5;

                previousGrade[i] = shuffle(previousGrade[i]);
            }

            //get grade 10 students
            const grade10students = await Student.findAll({
                where: {
                    classClassid: {
                        [Op.in]: [21, 22, 23, 24, 25]

                    }
                }
            });

            //update the grade to grade 11
            await Promise.all(

                grade10students.map(async student => {

                    student.classClassid += 5;

                    await student.save();

                })

            );

            //get grede 12 students
            const grade12students = await Student.findAll({
                where: {
                    classClassid: {
                        [Op.in]: [31, 32, 33, 34, 35]

                    }
                }
            });
            //change student grade 13 
            await Promise.all(

                grade12students.map(async student => {

                    student.classClassid += 5;

                    await student.save();

                })

            );



            var newGradeArray = [];

            for (let i = 0; i < 4; i++) {
                newGradeArray[i] = []
                for (let k = 0; k < 5; k++) {


                    newGradeArray[i][k] = previousGrade[i].filter((student, index) => {

                        if ((index % 5) === k) {
                            return student;
                        }
                        return null;

                    })

                }

            }

            var incrementClassid = 6;

            for (let i = 0; i < 4; i++) {

                for (let k = 0; k < 5; k++) {


                    await Promise.all(
                        newGradeArray[i][k].map(async (student) => {

                            student.classClassid = incrementClassid;

                            if (i === 3) {
                                student.subjectRegistrationDone = false;

                            }

                            await student.save();

                        })


                    )


                    // await Promise.all(newGradeArray[i][k].forEach(async student => {
                    //     student.subjectRegistrationDone = false;
                    //     student.classClassid = incrementClassid;

                    //     await student.save();
                    // }))

                    incrementClassid++;

                }


            }

            res.status(200).json({
                gradeUpdate: true
            })
        }

        if (switchingTypeMode === "default") {

            const getAllStudentsData = await Student.findAll({
                where: {
                    classClassid: {
                        [Op.notIn]: [26, 27, 28, 29, 30, 36, 37, 38, 39, 40]
                    }
                }
            });

            await Promise.all(

                getAllStudentsData.map(async student => {

                    student.classClassid += 5;

                    if (student.classClassid >= 21 && student.classClassid <= 25) {
                        student.subjectRegistrationDone = false;
                    }

                    await student.save();

                })
            )

            res.status(200).json({
                gradeUpdate: true
            })

        }

        if (switchingTypeMode === "best") {

            var gradeCount = 1;
            var getStudentDataGradeWise = [];

            for (let i = 0; i < 4; i++) {
                getStudentDataGradeWise[i] = await Student.findAll({
                    where: {
                        classClassid: {
                            [Op.in]: [gradeCount, gradeCount + 1, gradeCount + 2, gradeCount + 3, gradeCount + 4]
                        }
                    }
                });

                gradeCount += 5;
            }


            var studentSummationOfAveragesWithStudentid = [];


            for (let i = 0; i < 4; i++) {

                studentSummationOfAveragesWithStudentid[i] = [];

                await Promise.all(
                    getStudentDataGradeWise[i].map(async studentdata => {


                        const results = await ResultSummary.findAll({
                            where: {
                                _id: studentdata._id,
                                year: studentdata.graderegistration
                            },
                            attributes: ['average']
                        })

                        var sum = 0;

                        results.forEach(varage => {

                            sum = ((results[0].average != undefined) ? results[0].average : 0) + ((results[1].average != undefined) ? results[1].average : 0) + ((results[2].average != undefined) ? results[2].average : 0)

                        })

                        studentSummationOfAveragesWithStudentid[i].push({ studentdata: studentdata, sumOfAvg: sum });

                        sum = 0;
                    })
                )
            }


            var newClassArray = [];
            var numberOfStudentsInClass = 0;
            var startIndex = 0;

            for (let i = 0; i < 4; i++) {

                newClassArray[i] = [];

                studentSummationOfAveragesWithStudentid[i] = studentSummationOfAveragesWithStudentid[i].sort((a, b) => (a.sumOfAvg < b.sumOfAvg) ? 1 : -1);

                numberOfStudentsInClass = Math.ceil(studentSummationOfAveragesWithStudentid[i].length / 5);



                for (let k = 0; k < 5; k++) {
                    newClassArray[i][k] = studentSummationOfAveragesWithStudentid[i].splice(startIndex, numberOfStudentsInClass)

                }

            }


            var incrementClassid = 6;

            for (let i = 0; i < 4; i++) {

                for (let k = 0; k < 5; k++) {


                    await Promise.all(
                        newClassArray[i][k].map(async ({ ...studentdata }) => {
                            studentdata.studentdata.classClassid = incrementClassid;

                            if (i === 3) {
                                studentdata.studentdata.subjectRegistrationDone = false;

                            }


                            await studentdata.studentdata.save()

                        })


                    )
                    incrementClassid++;

                }
            }


            res.status(200).json({
                gradeUpdate: true
            })

        }





    } catch (error) {
        console.log("error", error)

    }


}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


exports.postGetOrdinalyLevelChartOneData = async (req, res, next) => {

    try {

        const result = req.query.result;
        const count = parseInt(req.query.count);
        var countByYear;

        if (result.toUpperCase() === "A") {

            countByYear = await MainExamDetails.count({
                where: {
                    acount: count,
                    metype: false,
                },
                attributes: ['meyear'],
                group: ['meyear']
            });
        }

        if (result.toUpperCase() === "B") {

            countByYear = await MainExamDetails.count({
                where: {
                    bcount: count,
                    metype: false,
                },
                attributes: ['meyear'],
                group: ['meyear']
            });
        }

        if (result.toUpperCase() === "C") {

            countByYear = await MainExamDetails.count({
                where: {
                    ccount: count,
                    metype: false,
                },
                attributes: ['meyear'],
                group: ['meyear']
            });
        }

        if (result.toUpperCase() === "S") {

            countByYear = await MainExamDetails.count({
                where: {
                    scount: count,
                    metype: false,
                },
                attributes: ['meyear'],
                group: ['meyear']
            });
        }

        if (result.toUpperCase() === "W") {

            countByYear = await MainExamDetails.count({
                where: {
                    wcount: count,
                    metype: false,
                },
                attributes: ['meyear'],
                group: ['meyear']
            });
        }


        res.status(200).json(countByYear)


    } catch (error) {
        console.log("🚀 ~ file: nonAcademicController.js ~ line 1374 ~ error", error)

    }

}


exports.getGetOrdinaryLevelChartTwo = async (req, res, next) => {

    try {
        const year = parseInt(req.query.year);
        const subjectid = parseInt(req.query.subjectid);

        const Acount = await MainExamResult.count({
            where: {
                meyear: year,
                subjectid: subjectid,
                metype: false,
                result: "A"
            },

        });
        const Bcount = await MainExamResult.count({
            where: {
                meyear: year,
                subjectid: subjectid,
                metype: false,
                result: "B"
            },

        });
        const Ccount = await MainExamResult.count({
            where: {
                meyear: year,
                subjectid: subjectid,
                metype: false,
                result: "C"
            },

        });
        const Scount = await MainExamResult.count({
            where: {
                meyear: year,
                subjectid: subjectid,
                metype: false,
                result: "S"
            },

        });
        const Wcount = await MainExamResult.count({
            where: {
                meyear: year,
                subjectid: subjectid,
                metype: false,
                result: "W"
            },

        });

        res.status(200).json({
            acount: Acount,
            bcount: Bcount,
            ccount: Ccount,
            Scount: Scount,
            wcount: Wcount
        })

    } catch (error) {
        console.log("🚀 ~ file: nonAcademicController.js ~ line 1449 ~ error", error)

    }

}

exports.getGetOrdinaryLevelChartThree = async (req, res, next) => {


    try {

        const year = parseInt(req.query.year);
        const result = req.query.result;
        const count = parseInt(req.query.count);

        var studentDataSet;

        if (result.toUpperCase() === "A") {
            studentDataSet = await MainExamDetails.findAll({
                where: {
                    acount: count,
                    metype: false,
                    meyear: year

                },
                attributes: ['indexnumber', 'class', 'studentid']
            })
        }
        if (result.toUpperCase() === "B") {
            studentDataSet = await MainExamDetails.findAll({
                where: {
                    bcount: count,
                    metype: false,
                    meyear: year

                },
                attributes: ['indexnumber', 'class', 'studentid']
            })
        }
        if (result.toUpperCase() === "C") {
            studentDataSet = await MainExamDetails.findAll({
                where: {
                    ccount: count,
                    metype: false,
                    meyear: year

                },
                attributes: ['indexnumber', 'class', 'studentid']
            })
        }
        if (result.toUpperCase() === "S") {
            studentDataSet = await MainExamDetails.findAll({
                where: {
                    scount: count,
                    metype: false,
                    meyear: year

                },
                attributes: ['indexnumber', 'class', 'studentid']
            })
        }
        if (result.toUpperCase() === "W") {
            studentDataSet = await MainExamDetails.findAll({
                where: {
                    wcount: count,
                    metype: false,
                    meyear: year

                },
                attributes: ['indexnumber', 'class', 'studentid']
            })
        }


        res.status(200).json(studentDataSet)

    } catch (error) {
        console.log("🚀 ~ file: nonAcademicController.js ~ line 1518 ~ error", error)

    }

}

exports.getMainExamResults = async (req,res,next)=>{
    try{
        const year=req.body.year;
        const type=req.body.type;

        const mainResults = await MainExamDetails.findAll({
            where:{
                meyear: year,
                metype: type
            },
            attributes:['indexnumber','stream','zscore','districtrank','islandrank','shy','class','studentid','acount','bcount','ccount','scount','wcount']
        })

        res.status(200).json({
            result: mainResults
        });

    }catch(error){
        console.log("Results error",error);
    }
}

exports.postGetAdvanceLevelChartOne = async (req, res, next) => {

    try {
        const result = req.body.result;
        const count = parseInt(req.body.count);
        const stream = req.body.stream;

        var responseData;

        if (result.toUpperCase() === "A") {
            responseData = await MainExamDetails.count({
                where: {
                    metype: true,
                    stream: stream,
                    acount: count
                },
                attributes: ['meyear'],
                group: ['meyear']
            })
        }
        if (result.toUpperCase() === "B") {
            responseData = await MainExamDetails.count({
                where: {
                    metype: true,
                    stream: stream,
                    bcount: count
                },
                attributes: ['meyear'],
                group: ['meyear']
            })
        }
        if (result.toUpperCase() === "c") {
            responseData = await MainExamDetails.count({
                where: {
                    metype: true,
                    stream: stream,
                    ccount: count
                },
                attributes: ['meyear'],
                group: ['meyear']
            })
        }
        if (result.toUpperCase() === "S") {
            responseData = await MainExamDetails.count({
                where: {
                    metype: true,
                    stream: stream,
                    scount: count
                },
                attributes: ['meyear'],
                group: ['meyear']
            })
        }
        if (result.toUpperCase() === "W") {
            responseData = await MainExamDetails.count({
                where: {
                    metype: true,
                    stream: stream,
                    wcount: count
                },
                attributes: ['meyear'],
                group: ['meyear']
            })
        }


        res.status(200).json(responseData);

    } catch (error) {
        console.log("🚀 ~ file: nonAcademicController.js ~ line 1595 ~ error", error)

    }
}

exports.postGetAdvanceLevelChartTwo = async (req, res, next) => {

    try {
        const year = parseInt(req.body.year);
        const subjectid = parseInt(req.body.subjectid);

        const Acount = await MainExamResult.count({
            where: {
                meyear: year,
                subjectid: subjectid,
                metype: true,
                result: "A"
            },

        });
        const Bcount = await MainExamResult.count({
            where: {
                meyear: year,
                subjectid: subjectid,
                metype: true,
                result: "B"
            },

        });
        const Ccount = await MainExamResult.count({
            where: {
                meyear: year,
                subjectid: subjectid,
                metype: true,
                result: "C"
            },

        });
        const Scount = await MainExamResult.count({
            where: {
                meyear: year,
                subjectid: subjectid,
                metype: true,
                result: "S"
            },

        });
        const Wcount = await MainExamResult.count({
            where: {
                meyear: year,
                subjectid: subjectid,
                metype: true,
                result: "W"
            },

        });

        res.status(200).json({
            acount: Acount,
            bcount: Bcount,
            ccount: Ccount,
            Scount: Scount,
            wcount: Wcount
        })

    } catch (error) {
        console.log("🚀 ~ file: nonAcademicController.js ~ line 1449 ~ error", error)

    }
}

exports.postGetAdvanceLevelChartThree = async (req, res, next) => {

    try {
        const year = parseInt(req.body.year);
        const result = req.body.result;
        const count = parseInt(req.body.count);
        const stream = req.body.stream

        var studentDataSet;

        if (result.toUpperCase() === "A") {
            studentDataSet = await MainExamDetails.findAll({
                where: {
                    acount: count,
                    metype: true,
                    meyear: year,
                    stream: stream,

                },
                attributes: ['indexnumber', 'class', 'studentid', 'islandrank', 'districtrank']
            })
        }
        if (result.toUpperCase() === "B") {
            studentDataSet = await MainExamDetails.findAll({
                where: {
                    bcount: count,
                    metype: true,
                    meyear: year,
                    stream: stream,

                },
                attributes: ['indexnumber', 'class', 'studentid', 'islandrank', 'districtrank']
            })
        }
        if (result.toUpperCase() === "C") {
            studentDataSet = await MainExamDetails.findAll({
                where: {
                    ccount: count,
                    metype: true,
                    meyear: year,
                    stream: stream,

                },
                attributes: ['indexnumber', 'class', 'studentid', 'islandrank', 'districtrank']
            })
        }
        if (result.toUpperCase() === "S") {
            studentDataSet = await MainExamDetails.findAll({
                where: {
                    scount: count,
                    metype: true,
                    meyear: year,
                    stream: stream,

                },
                attributes: ['indexnumber', 'class', 'studentid', 'islandrank', 'districtrank']
            })
        }
        if (result.toUpperCase() === "W") {
            studentDataSet = await MainExamDetails.findAll({
                where: {
                    wcount: count,
                    metype: true,
                    meyear: year,
                    stream: stream,

                },
                attributes: ['indexnumber', 'class', 'studentid', 'islandrank', 'districtrank']
            })
        }


        res.status(200).json(studentDataSet)

    } catch (error) {
        console.log("🚀 ~ file: nonAcademicController.js ~ line 1518 ~ error", error)

    }
}

exports.postGetStudentListInMainExam = async (req, res, next) => {

    try {
        const year = req.body.year;
        const type = req.body.type;
        var studentlist;

        if (type === true) {

            studentlist = await MainExamDetails.findAll({
                where: {
                    meyear: year,
                    metype: true,
                    addresultdone: false

                },
                attributes: ['indexnumber', 'studentid', 'stream','class'],

            });

            res.status(200).json(studentlist)
        }


        if (type === false) {

            studentlist = await MainExamDetails.findAll({
                where: {
                    meyear: year,
                    metype: false,
                    addresultdone: false
                },
                attributes: ['indexnumber', 'studentid','class'],

            });

            res.status(200).json(studentlist)
        }





    } catch (error) {
        console.log("🚀 ~ file: nonAcademicController.js ~ line 1821 ~ exports.getGetStudentListForMainExam= ~ error", error)

    }

}


exports.postUpdateNotification = async (req, res, next) => {


    try {

        const nonacademicid = req.body.nonacademicid;
        const notificationid = req.body.notificationid;
        const from = req.body.from;
        const expire = req.body.expire;
        const message = req.body.message;
        const publisher = req.body.publisher;
        const title = req.body.title;

        const notificationData = await Notification.findByPk(notificationid);

        notificationData.from = from;
        notificationData.expire = expire;
        notificationData.message = message;
        notificationData.title = title;
        notificationData.publisher = nonacademicid;



        if (req.files.attachment != undefined) {
            if (notificationData.attachmentpath != null) {
                console.log("data")
                fs.unlink(notificationData.attachmentpath, error => {
                    if (error) {
                        throw error;
                    }
                });

            }

            notificationData.attachmentpath = req.files.attachment[0].path.replace('\\', '/');

        }

        await notificationData.save();


    } catch (error) {
        console.log("🚀 ~ file: nonAcademicController.js ~ line 1918 ~ exports.postUpdateNotification= ~ error", error)

    }

}


exports.getDeletePostedNotification = async (req, res, next) => {

    try {

        const notificationid = parseInt(req.params.id);

        const notificationData = await Notification.findByPk(notificationid);

        if (notificationData === null) {
            throw new Error('Notification Not Found....');
        }

        if (notificationData.attachmentpath != null) {
            fs.unlink(notificationData.attachmentpath, error => {
                if (error) {
                    throw error
                }
            })
        }


        if (notificationid === undefined) {
            console.log("data");
        }

        await notificationData.destroy();


        res.status(200).json({
            delete: true
        })

    } catch (error) {
        console.log("🚀 ~ file: nonAcademicController.js ~ line 1967 ~ exports.getDeletePostedNotification ~ error", error)

    }


}

exports.getAllPendingAdvanceLevelRegistration = async (req, res, next) => {
    try {

        const pendings = await PermissionAvanceLevel.findAll();

        var responserDataArray;
        var streamData;

        await Promise.all(

            responserDataArray = pendings.map(async requestData => {

                streamData = await Class.findOne({
                    where: {
                        classid: requestData.stream
                    },
                    attributes: ['grade']
                })

                requestData.stream = streamData.grade;

                return requestData;

            })


        )

        res.status(200).json({
            dataset: pendings
        });

    } catch (error) {
        console.log("🚀 ~ file: nonAcademicController.js ~ line 2007 ~ exports.getAllPendingAdvanceLevelRegistration= ~ error", error)

    }
}

exports.postHandleAdvanceLevelRequest = async (req, res, next) => {

    try {

        const answer = req.body.answer;
        const requestid = req.body.requestid;
        const nonacademicid = req.body.nonacademicid;
        const message = req.body.message;
        const studentid = req.body.studentid;
        const classname = req.body.classname;

        if (answer === 0) {
            const requestData = await PermissionAvanceLevel.findByPk(requestid);

            if (requestData === null) {
                throw new Error("This Request Can Not Found...");
            }
            requestData.state = 0;
            requestData.viewcount++;

            const studentData = await Student.findByPk(studentid);

            studentData.classClassid = 0;


            await requestData.save();
            await studentData.save();

            await Notification.create({
                type: 4,
                from: nonacademicid,
                title: "Advance Level Registration",
                message: message,
                expire: new Date().getTime() + (1000 * 3600 * 24 * 7),
                attachmentpath: null,
                publisher: nonacademicid,
                to: studentid,

            });

            res.status(200).json({
                udpaterecode: true
            })


        }

        if (answer === 1) {

            const requestData = await PermissionAvanceLevel.findByPk(requestid);

            if (requestData === null) {
                throw new Error("This Request Can Not Found...");
            }

            requestData.state = 1;
            requestData.viewcount++;

            const studentData = await Student.findByPk(studentid);

            if (studentData === null) {
                throw new Error("Student Can Not Found...");
            }

            studentData.classClassid = requestData.stream;
            studentData.selectedRequest = new Date().getFullYear();
            requestData.save();
            studentData.save();

            await Notification.create({
                type: 4,
                from: nonacademicid,
                title: "Advance Level Registration",
                message: "Your Have Successfully Register For The classs " + classname + ". You Can Start Your Accademic Activities for " + new Date().getFullYear() + " Year",
                expire: new Date().getTime() + (1000 * 3600 * 24 * 7),
                attachmentpath: null,
                publisher: nonacademicid,
                to: studentid,
                studentId: studentid

            });

            res.status(200).json({
                udpaterecode: true
            })

        }


    } catch (error) {
        console.log("🚀 ~ file: nonAcademicController.js ~ line 2047 ~ exports.postHandleAdvanceLevelRequest= ~ error", error)

    }
}