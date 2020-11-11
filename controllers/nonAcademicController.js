const Class = require('../models/classModel');
const Leave = require('../models/leaveRequest');
const Notification = require('../models/notification')
const Teacher = require('../models/teacherModel');
const { getClass } = require('../socketHandler');

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
                leavenumber: element.leaveid,
                leavetype: element.leavetype,
                fullname: element.teacher.firstname + " " + element.teacher.lastname,
                roll: element.teacher.role

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

    const id = req.body.id;
    const leaveid = req.body.leaveid;
    const answer = req.body.answer;
    const leavetype = req.body.leavetype;


    try {

        if (answer) {
            //send notification that the requese is cansel
            //retur from here
        }

        const leave = await Leave.findOne({
            where: {
                leaveid: leaveid
            },
            include: Teacher
        });

        if (leave.allow) {
            res.status(200).json({
                update: true,
                messsge: "Already Leave Is Accepted"
            })
        }


        if (answer) {

            if (leavetype != 2) {
                leave.teacher.numberofleaves -= 0.5
            } else {
                leave.teacher.numberofleaves -= 1;
            }


        }


        leave.allow = answer;

        const teacherUpdate = await leave.teacher.save();
        const leaveUpdate = await leave.save();


        res.status(200).json({
            update: true
        })


    } catch (error) {

        if (!error.statusCode) {

            error.statusCode = 500;
        }

        next(error);
    }

}

exports.postAddNotification = async (req, res, next) => {

    const nonacademicid = req.body.nonacademicid;
    const type = req.body.type;
    const from = req.body.from;
    const expire = req.body.expire;
    const message = req.body.message;
    const to = (req.body.teacherid) ? req.body.teacherid : req.body.studentid;

    try {

        const newNotification = await Notification.create({
            type: type,
            from: from,
            message: message,
            expire: expire,
            publilsher: nonacademicid,
            to: to

        });

        res.status(200).json({
            notificatin: true,
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


exports.postUpdateClass = async (req, res, next) => {

    const classname = req.body.classname;
    const newTeacherid = req.body.newTeacherid;
    const pastTeacherid = req.body.pastTeacherid;

    console.log(pastTeacherid, newTeacherid)

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