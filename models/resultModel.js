const { DataType, DataTypes } = require('sequelize');


const sequelize = require('../util/databaseConnection');

const Result = sequelize.define('result', {
    resultid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    term: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    grade: {
        type: DataTypes.STRING
    }
    ,
    marks: {
        type: DataTypes.INTEGER
    }

})


module.exports = Result;








