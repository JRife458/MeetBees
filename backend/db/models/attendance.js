'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Attendance.init({
    eventId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: 'Events',
        key: "id"
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: 'Users',
        key: "id"
      }
    },
    status: DataTypes.ENUM('member', 'waitlist', 'pending')
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};
