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

const Student = require('./models/studentModel');
const Teacher = require('./models/teacherModel');
const Admin = require('./models/adminModel');
const NonAcademic = require('./models/nonAcademicModel');


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


sequelize.sync({ force: true })
    .then(result => {
        console.log("Connection success");

        // Student.create({
        //     _id: "ST_1",
        //     surname: "Damith",
        //     firstname: "Anuradha",
        //     lastname: "Amarasena",
        //     username: "@_Damith",
        //     password: "$2a$12$uSJ54j06KEDFbQ1QIouOzOx.nqeTi3dJ/iTeA9byBN.zKkym74n9W",
        //     email: "damith@gamil.com",
        //     age: 23,
        //     startyear: 2000,
        //     imagepath: "image\ST_1.jpg",
        //     birthdate: "2020-10-21 00:00:00",
        //     gender: "male",
        //     addressline1: "5D 53",
        //     addressline2: "Natianal housing scheme",
        //     addressline3: "raddolugama",
        //     city: "seeduwa",
        //     mobile: "0771346601",
        // }).then(re => {
        //     console.log('student success')
        // }).catch(error => {
        //     console.log(error)
        // })

        // Teacher.create({
        //     teacherid: "AC_1",
        //     surname: "Damith",

        //     password: "$2a$12$uSJ54j06KEDFbQ1QIouOzOx.nqeTi3dJ/iTeA9byBN.zKkym74n9W",
        //     email: "damith@gamil.com",

        // }).then(re => {
        //     console.log('teacher success')
        // }).catch(error => {
        //     console.log(error)
        // })

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


























