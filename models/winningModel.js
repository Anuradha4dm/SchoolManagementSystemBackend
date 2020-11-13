const { DataTypes } = require('sequelize');

const sequelize = require('../util/databaseConnection');

const Winning = sequelize.define('winning', {
    recodeid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    eventname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    place: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


module.exports = Winning;