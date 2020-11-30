const { DataTypes } = require('sequelize');

const sequelize = require('../util/databaseConnection');


const QRData = sequelize.define('qrdata', {

    qrid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    randomcode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiredtime: {
        type: DataTypes.BIGINT,
        allowNull: false,

    }
})


module.exports = QRData


