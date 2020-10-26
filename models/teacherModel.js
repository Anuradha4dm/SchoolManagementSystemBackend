const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/databaseConnection');

const serquelize = require('../util/databaseConnection');

const Teacher = sequelize.define("teacher", {
    teacherid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true

    },
    surname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imagepath: {
        type: DataTypes.STRING,
        allowNull: true
    },
    age: {
        type: DataTypes.INTEGER
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true
    },
    timetablepath: {
        type: DataTypes.STRING,
        allowNull: true
    },
    qualifications: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }


})


module.exports = Teacher;

