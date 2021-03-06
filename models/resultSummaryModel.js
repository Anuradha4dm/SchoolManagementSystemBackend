const { DataTypes, DATE } = require('sequelize');

const sequelize = require('../util/databaseConnection');

const ResultSummary = sequelize.define('resultsummary', {
    summaryid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    term: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    average: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
    ,
    grade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    place: {
        type: DataTypes.INTEGER
    },
    message: {
        type: DataTypes.STRING,
        default: "Your result is ok,But need to work hader"

    }

})

module.exports = ResultSummary;