
const Result = require("../models/resultModel");
const ResultSummary = require("../models/resultSummaryModel");
const StudentAttendence = require('../models/studentAttendaceModule');

exports.postAddStudentResults = async (req, res, next) => {

    const year = req.body.year;
    const term = req.body.term;
    const grade = req.body.grade;
    const studentid = req.body.studentid;
    const resultArray = req.body.result;
    const message = req.body.message;

    try {
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

            sum += resultObj.marks;
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
            studentId: studentid,
            average: (sum) / count,
            message: message
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

    const date = new Date(req.body.date);
    const attendencelist = req.body.attendence;

    try {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDay() + 1;


        const storeData = [
            { studentId: "ST_1", year: 2020, present: true, month: 11, week: 45, day: 4, date: new Date() },
            { studentId: "ST_2", year: 2020, present: true, month: 11, week: 45, day: 4, date: new Date() },
            { studentId: "ST_3", year: 2020, present: true, month: 11, week: 45, day: 4, date: new Date() },
            { studentId: "ST_4", year: 2020, present: true, month: 11, week: 45, day: 4, date: new Date() }

        ]



        await StudentAttendence.bulkCreate(storeData);


        res.status(200).json({
            insert: true
        })

    } catch (error) {

        console.log(error)
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