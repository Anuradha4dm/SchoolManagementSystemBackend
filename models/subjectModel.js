const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require('../util/databaseConnection');


const Subject = sequelize.define('subject', {
    subjectid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subjectname: {
        type: DataTypes.STRING
    },
    grade: {
        type: DataTypes.STRING
    },
    subjectinfo: {
        type: DataTypes.STRING
    },

    mandatory: {
        type: DataTypes.BOOLEAN,
        allowNnull: false
    },
    teacherTeacherid: {
        type: DataTypes.STRING
    }


})

module.exports = Subject;