const { DataTypes } = require('sequelize')

const sequelize = require('../util/databaseConnection');

const SportsWrapper = sequelize.define('sportswrapper', {


    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    allow: {
        type: DataTypes.BOOLEAN,
        default: false
    }

})

module.exports = SportsWrapper;


