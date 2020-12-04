const { DataTypes } = require('sequelize');

const sequelize = require('../util/databaseConnection');

const Class = sequelize.define('classes', {

    classid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    grade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numofstudents: {
        type: DataTypes.INTEGER
    },
    timetable: {
        type: DataTypes.STRING,
    }

})

module.exports = Class;