const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
require('dotenv').config()
// const upload = require('express-fileupload')
//include the body to the parse
const app = express();

//these are the main routing modules
const studentRoute = require('./routes/studentRouter');
const sequelize = require('./util/databaseConnection');
const adminRouter = require('./routes/adminRoute');
const authenticationRouter = require('./routes/authenticationRoute');
const socketHandler = require('./socketHandler');
const teacherRouter = require('./routes/teacherRoutes');
const commnoRouter = require('./routes/commonRouter');
const nonacademicRouter = require('./routes/nonAccadamicRoute');



//database modules
const Student = require('./models/studentModel');
const Teacher = require('./models/teacherModel');
const Admin = require('./models/adminModel');
const NonAcademic = require('./models/nonAcademicModel');
const Subject = require('./models/subjectModel');
const SubjectWrapper = require('./models/subjectWrapper');
const Class = require("./models/classModel");
const Result = require('./models/resultModel');
const ResultSummary = require('./models/resultSummaryModel');
const Leave = require('./models/leaveRequest');
const StudentAttendence = require('./models/studentAttendaceModule');
const Notification = require('./models/notification');
const Sports = require('./models/sportModel');
const SportsWrapper = require('./models/sportsWrapperModule');
const Winning = require('./models/winningModel');


//data dumy
const studentDumy = require('./test/studentDumy');
const teacherDumy = require('./test/teacherDumy');
const subjectDumy = require('./test/subjectDataDummy');
const classDumy = require('./test/classDumy');
const resultDumy = require('./test/resultDumy');
const attendenceDumy = require('./test/attendenceDumy');



//resolving CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
})

//static serving files
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use('/timetable', express.static(path.join(__dirname, 'timetable')));
app.use('/attachment', express.static(path.join(__dirname, 'attachment')));

//get the files 

//file storage configurations
const storageLocation = multer.diskStorage({

    destination: (req, file, callback) => {
        if (file.fieldname === "timetable") {
            callback(null, 'timetable')
        }
        if (file.fieldname === "imageData") {
            callback(null, 'image');
        }
        if (file.fieldname === "attachment") {

            callback(null, 'attachment')
        }
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }

});

//filefilter 

const filters = (req, file, callback) => {


    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "application/pdf") {

        callback(null, true);
    } else {
        callback(null, false);
    }
}


//this is for user profile
// app.use(multer({ fileFilter: filters, storage: storageLocation }).single('imageData'));
// app.use(multer().single('timetable'));
app.use(multer({ fileFilter: filters, storage: storageLocation }).fields([{ name: 'timetable', maxCount: 1 }, { name: 'imageData', maxCount: 1 }, { name: "attachment", maxCount: 1 }]));

//include the body parser 
app.use(bodyParser.json());

app.use(bodyParser.urlencoded())

app.use('/student', studentRoute);
app.use('/admin', adminRouter);
app.use('/teacher', teacherRouter);
app.use('/nonacademic', nonacademicRouter);
app.use('/auth', authenticationRouter);
app.use('/common', commnoRouter);



app.use((error, req, res, next) => {
    console.log(error);
    const statusCode = error.statusCode;
    const message = error.message;

    res.status(statusCode).json({
        message: message
    })
})
//M:N realation
Student.belongsToMany(Subject, {
    through: 'subjectwrapper',
    foreignKey: 'studentid',
    otherKey: 'subjectid'

})

Subject.belongsToMany(Student, {
    through: 'subjectwrapper',
    otherKey: 'studentid',
    foreignKey: 'subjectid'

})

Student.belongsToMany(Sports, {
    through: 'sportswrapper',
    foreignKey: 'studentid',
    otherKey: 'sportid'
});

Sports.belongsToMany(Student, {

    through: 'sportswrapper',
    otherKey: 'studentid',
    foreignKey: 'sportid'
})


//1:1 
Subject.belongsTo(Teacher);
Student.belongsTo(Class);
Teacher.belongsTo(Class);
Class.hasOne(Teacher);
Result.belongsTo(Subject);
Student.hasMany(Result);
ResultSummary.belongsTo(Student, { foreignKey: '_id', foreignKeyConstraint: true })
Leave.belongsTo(Teacher);
Teacher.hasMany(Leave);
NonAcademic.hasMany(Leave);
Student.hasMany(StudentAttendence);
Student.hasMany(Winning);
Teacher.hasMany(Notification);
Student.hasMany(Notification);


// Teacher.hasMany(Subject, { foreignKey: 'subjectid', targetKey: 'id' });


sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {

        const server = app.listen(3000);

        const io = require('./webSocket');

        io.init(server).on('connection', socket => {

            io.useSocket = socket;



            console.log('client connected');

            socket.on("getYear", data => {
                socketHandler.getYear(data);

            })

            socket.on("getGrades", data => {
                socketHandler.getClass(data);
            })
            socket.on("getSubjects", data => {          //get subject for chart1
                socketHandler.getSubjectForChart1(data);
            })
        })



        console.log("Connection success");

        // StudentAttendence.bulkCreate(attendenceDumy.getData);

        // Result.bulkCreate(resultDumy.getData)
        //     .then(re => {
        //         console.log("success");
        //     })
        //     .catch(err => {
        //         console.log("err", err)

        //     })


        // Student.bulkCreate(studentDumy.getData).then(re => {
        //     console.log("Student Data Added");
        // }).catch(error => {
        //     console.log(error)
        // })

        // Teacher.bulkCreate(teacherDumy.getData).then(re => {
        //     console.log('teacher success')
        // }).catch(error => {
        //     console.log(error)
        // })

        // Subject.bulkCreate(subjectDumy.getData)
        //     .then(re => {
        //         console.log("subject added");
        //     }).catch(erro => {
        //         console.log(error);
        //     })
        // Class.bulkCreate(classDumy.getData);



        // Admin.create({
        //     adminid: "AD_1",
        //     surname: "Damith",

        //     password: "$2a$12$uSJ54j06KEDFbQ1QIouOzOx.nqeTi3dJ/iTeA9byBN.zKkym74n9W",
        //     email: "damith@gamil.com",

        // }).then(re => {
        //     console.log('admin success')
        // }).catch(error => {
        //     console.log(error)
        // })

        // NonAcademic.create({
        //     nonacademicid: "NAC_1",
        //     surname: "Damith",

        //     password: "$2a$12$uSJ54j06KEDFbQ1QIouOzOx.nqeTi3dJ/iTeA9byBN.zKkym74n9W",
        //     email: "damith@gamil.com",

        // }).then(re => {
        //     console.log('non success')
        // }).catch(error => {
        //     console.log(error)
        // })

    })
    .catch(error => {
        console.log(error)
    })


























