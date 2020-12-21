const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/databaseConnection');

const serquelize = require('../util/databaseConnection');

const NonAcademic = sequelize.define("nonacademic", {
    nonacademicid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true

    },
    surname: {
        type: DataTypes.STRING
    },
    firstname: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    mobile: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    imagepath: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    role: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addressline1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addressline2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addressline3: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qualifications: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
    ,
    resetToken: {
        type: DataTypes.STRING
    },
    resetTokenExpire: {
        type: DataTypes.DATE
    }



})


module.exports = NonAcademic;
