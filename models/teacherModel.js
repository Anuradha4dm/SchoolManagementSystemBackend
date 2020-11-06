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
    }



})


module.exports = Teacher;

