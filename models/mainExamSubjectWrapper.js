const { DataTypes } = require('sequelize');

const sequelize = require('../util/databaseConnection');

const MainExamSubjectWrapper = sequelize.define('mainexamsubjectwrapper', {
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    metype: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }

});


module.exports = MainExamSubjectWrapper;