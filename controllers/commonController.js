const stripe = require('stripe');
const { Op } = require('sequelize');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const nodemailer = require('nodemailer');


const Teacher = require('../models/teacherModel');
const NonAcademic = require('../models/nonAcademicModel');
const LeaveRequest = require('../models/leaveRequest');
const Notification = require('../models/notification');

const Student = require('../models/studentModel');


const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {

        api_key: process.env.API_KEY,
    }
}))

/*
exports.postGetDataForleave = async (req, res, next) => {

    const id = req.body.id;
    const year = req.body.year;
    var profileData = { username: '', email: '', fullname: '', mobile: '', leaveData: { numberdflevestaken: 0, takenleavedates: [], numnerofpeding: 0, pendingDates: [] } };
    try {

        const idPreFix = id.split('_')[0];

        if (idPreFix === 'AC') {
            const academicData = await Teacher.findOne({
                teacherid: id,
            })
            if (!academicData) {
                var error = new Error('No Teeacher Found');
                error.statusCode = 500;
                throw error;
            }
            profileData.username = academicData.username;
            profileData.email = academicData.email;
            profileData.fullname = academicData.surname + " " + academicData.firstname + " " + academicData.lastname;
            profileData.mobile = academicData.mobile;
        }

        if (idPreFix === "NAC") {
            const nonAcademicData = await NonAcademic.findOne({
                where: {
                    nonacademicid: id
                }
            })

            profileData.username = nonAcademicData.username;
            profileData.fullname = nonAcademicData.surname + " " + nonAcademicData.firstname + " " + nonAcademicData.lastname;
            profileData.email = nonAcademicData.email;
            profileData.mobile = nonAcademicData.mobile;

            if (!nonacademicid) {
                var error = new Error("Staff Member Can Not Find");
                error.statusCode = 400;
                throw error;
            }
        }

        const leaveData = await LeaveRequest.findAll({
            where: {
                [Op.or]: [
                    {
                        teacherTeacherid: id
                    }, {
                        nonacademicNonacademicid: id
                    },
                ],
                [Op.and]: [
                    {
                        leavedate: { [Op.lte]: new Date(year + 1, 0, 0, 00, 00, 00) }

                    },
                    {
                        leavedate: { [Op.gte]: new Date(year, 0, 02, 00, 00, 00) }

                    }],

            },

        })

        var takenLeaveSum = 0;
        var pendingLeaveSum = 0;

        leaveData.forEach(element => {



            if (element.allow) {


                profileData.leaveData.takenleavedates.push(element.leavedate);
                takenLeaveSum++;
            }
            if (!element.allow) {



                profileData.leaveData.pendingDates.push(element.leavedate)
                pendingLeaveSum++;
            }


        });

        profileData.leaveData.numberdflevestaken = takenLeaveSum;
        profileData.leaveData.numnerofpeding = pendingLeaveSum;



        res.status(200).json({
            fetch: true,
            profileData: profileData
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}
*/

exports.postGetPreviousLeavesData = async (req, res, next) => {

    const year = req.body.year;
    const id = req.body.id;

    var responseData = { username: "", fullname: "", email: "", mobile: "" };

    try {



        // // responseData.username = leaveData.teacher.username;
        // responseData.fullname = leaveData.teacher.surname + " " + leaveData.teacher.firstname + " " + leaveData.teacher.lastname;
        // responseData.email = leaveData.teacher.email;
        // responseData.mobile = leaveData.teacher.mobile;



        res.status(200).json({
            leaveData: responseData
        })



    } catch (error) {
        if (error.statusCode) {
            error.statusCode = 500;
        }

        next(error);
    }



}

exports.postNewLeaveRequest = async (req, res, next) => {

    const id = req.body.id;
    const date = req.body.date;
    const type = req.body.type;
    const description = req.body.description;

    const roll = id.split('_')[0];

    var result;

    try {
        if (roll === "AC") {
            const academicUser = await Teacher.findOne({
                where: {
                    teacherid: id
                }
            })

            if (!academicUser) {
                var error = new Error("User Can Not Find");
                error.statusCode = 500;
                throw error;
            }

            var leave = {
                leavedate: date,
                description: description,
                allow: false,
                leavetype: type,
            }

            result = await academicUser.createLeaverequest(leave);

            if (!result.leaveid) {
                throw new Error("Requser Can Not Make Now");
            }

        }

        if (roll === "NAC") {
            const nonAcademicUser = await NonAcademic.findOne({
                where: {
                    nonacademicid: id
                }
            })

            console.log(nonAcademicUser)

            if (!nonAcademicUser) {
                var error = new Error("User Can Not Find");
                error.statusCode = 500;
                throw error;
            }

            var leave = {
                leavedate: date,
                description: description,
                allow: false,
                leavetype: type,
            }

            result = await nonAcademicUser.createLeaverequest(leave);

            if (!result.leaveid) {
                throw new Error("Requser Can Not Make Now");
            }


        }


        res.status(200).json({
            message: "Leave Request Made Successfully..."
        })

    } catch (error) {

        if (!error.statusCode) {
            error.statusCode = 500;
        }

        next(error);
    }

}


exports.getGetNotifications = async (req, res, next) => {

    const id = req.params.id;
    var notifications = [];
    //0-all
    //1-all teachers
    //2-specific-teacher
    //3-all students
    //4-fora student
    //5-for a grade

    try {

        var role = id.split('_')[0];

        if (role === "AC") {


            notifications = await Notification.findAll({
                where: {
                    [Op.or]: {
                        type: [0, 1],
                        [Op.and]: {
                            type: [2],
                            to: id
                        }
                    },
                },
                order: [['createdAt', 'ASC']]
            })


        }

        if (role === "ST") {
            notifications = await Notification.findAll({
                where: {
                    [Op.or]: {
                        type: [0, 3],
                        [Op.and]: {
                            type: [4, 5],
                            to: id
                        }
                    },
                },
                order: [['createdAt', 'ASC']]

            })

        }


        res.status(200).json({
            notificationArray: notifications
        })

    } catch (error) {

        if (error.statusCode) {
            error.statusCode = 500;
        }

        next(error);
    }

}


exports.sendEmail = async (req, res, next) => {

    const receiver = req.body.receiver;
    const sender = req.body.sender;
    const subject = req.body.subject;
    const message = req.body.message;

    transporter.sendMail({
        to: receiver,
        from: "damithanuradha44@gmail.com",
        subject: subject,
        html: `<h3>Message from ${sender} </h3>
                <p>${message}</p>
            `
    }).then(re => {

        res.status(200).json({
            success: re,
            send: true
        })
    })
        .catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error)
        })

}

exports.getPayment = async (req, res, next) => {

    const studentid = req.params.id;

    try {

    } catch (error) {
        console.log(error)
    }


}