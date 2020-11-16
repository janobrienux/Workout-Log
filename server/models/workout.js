const {DataTypes} = require('sequelize');
const db = require('../db');
const Workout = db.define('workout', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    definition: {
        type: DataTypes.STRING,
        allowNull: false
    },
    results: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = Workout
