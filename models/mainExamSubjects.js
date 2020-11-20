const { DataTypes } = require('sequelize');

const sequelize = require('../util/databaseConnection');

const MainExamSubject = sequelize.define('mainexamsubject', {

    mesubjectid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    mesubjectname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    metype: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    emmandatory: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }

})

module.exports = MainExamSubject;