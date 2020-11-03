const Result = require("../models/resultModel");
const ResultSummary = require("../models/resultSummaryModel");


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