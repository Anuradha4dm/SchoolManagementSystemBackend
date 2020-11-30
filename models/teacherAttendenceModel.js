const { DataTypes } = require('sequelize');

const sequelize = require('../util/databaseConnection');


const TeacherAttendence = sequelize.define('teacherattendence', {

    attendenceid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    present: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    day: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    month: {
        type: DataTypes.INTEGER,
        allowNull: false
    },




})

module.exports = TeacherAttendence;