const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require("../util/databaseConnection");

const DataModel = sequelize.define('datamodel', {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    studentid: {
        type: DataTypes.STRING
    },
    academic: {
        type: DataTypes.STRING
    }
    ,
    nonacademic: {
        type: DataTypes.STRING
    },
    admin: {
        type: DataTypes.STRING
    }
})

module.exports = DataModel;