const { DataTypes } = require('sequelize');

const sequelize = require('../util/databaseConnection');


const Sports = sequelize.define('sport', {

    sportid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    sportname: {
        type: DataTypes.STRING,
        allowNull: false
    },


})

module.exports = Sports;