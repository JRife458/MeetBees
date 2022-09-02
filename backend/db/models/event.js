'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsToMany(models.User, { through: 'Attendance', as: 'eventId' })
      Event.hasMany(models.EventImage, { foreignKey: 'eventId' })
      Event.belongsTo(models.Group, { foreignKey: 'groupId'})
      Event.belongsTo(models.Venue, { foreignKey: 'venueId'})
    }
  }
  Event.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    venueId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE'
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Online', "In person"),
      allowNull: false
  },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // validate: {
      //   isAfter: new Date
      // }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // validate: {
      //   isAfter: this.startDate
      // }
    },
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
