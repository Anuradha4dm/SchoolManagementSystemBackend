const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
require('dotenv').config()

//include the body to the parse
const app = express();

//these are the main routing modules
const studentRoute = require('./routes/studentRouter');
const sequelize = require('./util/databaseConnection');
const adminRouter = require('./routes/adminRoute');
const authenticationRouter = require('./routes/authenticationRoute');

//database modules
const Student = require('./models/studentModel');
const Teacher = require('./models/teacherModel');
const Admin = require('./models/adminModel');
const NonAcademic = require('./models/nonAcademicModel');
const Subject = require('./models/subjectModel');
const SUbjectWrapper = require('./models/subjectWrapper');

//data dumy
const studentDumy = require('./test/studentDumy');
const teacherDumy = require('./test/teacherDumy');
const subjectDumy = require('./test/subjectDataDummy');

//resolving CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '* ');
    res.setHeader('Access-Control-Allow-Method', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
})

//static serving files
app.use('/image', express.static(path.join(__dirname, 'image')));

//get the files 

//file storage configurations
const storageLocation = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'image');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }

});

//filefilter 

const filters = (req, file, callback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

app.use(multer({ fileFilter: filters, storage: storageLocation }).single('imageData'));


//include the body parser 
app.use(bodyParser.json());

app.use('/student', studentRoute);
app.use('/admin', adminRouter);
app.use('/auth', authenticationRouter)


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
//1:1 
Subject.belongsTo(Teacher);
// Teacher.hasMany(Subject, { foreignKey: 'subjectid', targetKey: 'id' });


sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        console.log("Connection success");



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




        app.listen(3000);
    })
    .catch(error => {
        console.log(error)
    })


























