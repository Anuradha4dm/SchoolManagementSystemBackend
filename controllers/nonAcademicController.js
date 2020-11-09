const Leave = require('../models/leaveRequest');
const Notification = require('../models/notification')
const Teacher = require('../models/teacherModel');

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
