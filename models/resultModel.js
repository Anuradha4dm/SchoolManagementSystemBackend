const { DataType, DataTypes } = require('sequelize');


const sequelize = require('../util/databaseConnection');

const Result = sequelize.define('result', {
    resultid: {
        type: DataTypes.STRING,
        autoIncreament: true,
    },
    year: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    term: {
        type: DataTypes.INTEGER,
        primaryKey: true
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








