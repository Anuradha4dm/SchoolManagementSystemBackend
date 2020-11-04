
const { DataTypes } = require('sequelize')

const sequelize = require('../util/databaseConnection');

const Leave = sequelize.define('leaverequest', {

    leaveid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    leavedate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    allow: {
        type: DataTypes.BOOLEAN
    }


})


module.exports = Leave;






