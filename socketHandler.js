const Result = require('./models/resultModel');
const Subject = require('./models/subjectModel');
const io = require('./webSocket');


exports.getYear = async (studentObj) => {


    const studentid = studentObj.id;

    try {

        const yearsData = await Result.findAll({
            where: { _id: "ST_1" },
            attributes: ['year']
        })

        const yearArray = yearsData.map(elemt => {
            return elemt.year;
        })


        io.getIo().emit('years', { years: removeDuplicates(yearArray) });


    } catch (error) {

        console.log(error.dataValues)
    }


}


exports.getClass = async (data) => {
    const year = data.year;
    const studentid = data.id;
    const term = data.term;

    try {

        const getClass = await Result.findOne({
            where: {
                _id: studentid,
                term: term,
                year: year
            },
            attributes: ['grade']
        })




        io.getIo().emit('popClass', getClass.grade)

    } catch (error) {

        console.log(error)
    }

}


exports.getSubjectForChart1 = async (data) => {

    try {

        const subjects = await Result.findAll({
            where: {
                _id: data.studentid
            },
            include: [Subject],

        });

        const subjectArr = subjects.map(element => {
            return element.subject.subjectname;
        })


        io.getIo().emit("subectArr", { subjectArray: removeDuplicates(subjectArr) })

    } catch (error) {
        console.log(error);
    }

}


function removeDuplicates(data) {
    return [...new Set(data)]
}