const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../util/databaseConnection');

const Admin = sequelize.define('admin', {
    adminid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    publicemail: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    resetToken: {
        type: DataTypes.STRING
    },
    resetTokenExpire: {
        type: DataTypes.DATE
    }


})


module.exports = Admin;