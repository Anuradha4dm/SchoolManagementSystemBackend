const { DataTypes } = require('sequelize');

const sequelize = require('../util/databaseConnection');

const PermissionAvanceLevel = sequelize.define('permissionadvancelevel', {


    requestid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    stream: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    allcount: {
        type: DataTypes.BOOLEAN,
    },
    mathresult: {
        type: DataTypes.BOOLEAN,
    },
    sinhalaresult: {
        type: DataTypes.BOOLEAN
    }

});

module.exports = PermissionAvanceLevel;

