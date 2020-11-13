const { DataTypes } = require('sequelize');

const sequelize = require('../util/databaseConnection');

const Notification = sequelize.define('notification', {
    notificationid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: true
    },
    from: {
        type: DataTypes.STRING
    },
    expire: {
        type: DataTypes.DATE,

    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publisher: {
        type: DataTypes.STRING,
    },
    to: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING
    },
    attachmentpath: {
        type: DataTypes.STRING
    }
});

module.exports = Notification;