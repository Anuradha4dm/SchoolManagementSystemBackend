const { DataTypes } = require('sequelize');

const sequelize = require('../util/databaseConnection');

const AdvanceLevelGradeChange = sequelize.define('advancelevelgradechange', {

    requestid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    indexnumber: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    requeststream: {
        type: DataTypes.STRING,
        allowNull: false
    }

})


module.exports = AdvanceLevelGradeChange;




