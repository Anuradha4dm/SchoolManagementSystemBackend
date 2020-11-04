
const Teacher = require('../models/teacherModel');
const NonAcademic = require('../models/nonAcademicModel');
const LeaveRequest = require('../models/leaveRequest');
const { Op, DataTypes } = require('sequelize')


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


exports.postGetPreviousLeavesData = async (req, res, next) => {

    const year = req.body.year;
    const id = req.body.id;

    var responseData = { username: "", fullname: "", email: "", mobile: "" };

    try {



        // // responseData.username = leaveData.teacher.username;
        // responseData.fullname = leaveData.teacher.surname + " " + leaveData.teacher.firstname + " " + leaveData.teacher.lastname;
        // responseData.email = leaveData.teacher.email;
        // responseData.mobile = leaveData.teacher.mobile;

        console.log(leaveData.teacher)

        res.status(200).json({
            leaveData: responseData
        })



    } catch (error) {
        console.log(error);
    }



}