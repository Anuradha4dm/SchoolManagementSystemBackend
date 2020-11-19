const { DataTypes } = require('sequelize');

const sequelize = require('../util/databaseConnection');


const MainExamResult = sequelize.define('mainexamresult', {

    resultid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    indexnumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    meyear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    metype: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    result: {
        type: DataTypes.STRING
    }
});

module.exports = MainExamResult;

