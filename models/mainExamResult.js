const { DataTypes } = require('sequelize');

const sequelize = require('../util/databaseConnection');


const MainExamResult = sequelize.define('mainexamresult', {

    resultid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    meyear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    metype: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    subjectid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    result: {
        type: DataTypes.STRING
    }
});

module.exports = MainExamResult;

