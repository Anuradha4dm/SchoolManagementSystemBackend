const { DataTypes } = require('sequelize');


const sequelize = require('../util/databaseConnection');

const MainExamDetails = sequelize.define('mainexamdetails', {
    indexnumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    meyear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    metype: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    stream: {
        type: DataTypes.STRING,
    },
    zscore: {
        type: DataTypes.DECIMAL
    },

    districtrank: {
        type: DataTypes.INTEGER,

    },
    islandrank: {
        type: DataTypes.INTEGER
    },
    shy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    acount: {
        type: DataTypes.INTEGER
    },
    bcount: {
        type: DataTypes.INTEGER
    },
    ccount: {
        type: DataTypes.INTEGER
    },
    scount: {
        type: DataTypes.INTEGER
    },
    wcount: {
        type: DataTypes.INTEGER
    },
    addresultdone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    class: {
        type: DataTypes.STRING,
        allowNull: false

    }
})


module.exports = MainExamDetails;
