const { DataTypes } = require('sequelize');

const sequelize = require('../util/databaseConnection');


const StudentAttendence = sequelize.define('studentattendence', {

    attendenceid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    present: {
        type: DataTypes.BOOLEAN,

    },
    date: {
        type: DataTypes.DATE,

    },
    year: {
        type: DataTypes.INTEGER,

    },
    day: {
        type: DataTypes.INTEGER,

    },
    month: {
        type: DataTypes.INTEGER,

    },
    week: {
        type: DataTypes.INTEGER
    }



})

module.exports = StudentAttendence;