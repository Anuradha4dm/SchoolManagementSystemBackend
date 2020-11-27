const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/databaseConnection');


const Teacher = sequelize.define("teacher", {
    teacherid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true

    },
    surname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imagepath: {
        type: DataTypes.STRING,
        allowNull: true
    },
    startyear: {
        type: DataTypes.INTEGER
    },
    age: {
        type: DataTypes.INTEGER
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },

    addressline1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addressline2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addressline3: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true
    },
    subjects: {
        type: DataTypes.STRING
    },
    timetablepath: {
        type: DataTypes.STRING,
        allowNull: true
    },
    qualifications: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mobile: {
        type: DataTypes.STRING
    },
    numberofleaves: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 44.0
    },
    resetToken: {
        type: DataTypes.STRING
    },
    resetTokenExpire: {
        type: DataTypes.DATE
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    macaddress: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "12:E3:22:4D"
    }




})


module.exports = Teacher;

