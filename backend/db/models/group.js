'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.hasMany(models.Event, { foreignKey: 'groupId', onDelete: 'cascade', hooks: true })
      Group.hasMany(models.GroupImage, {foreignKey: 'groupId', as: 'GroupMembers', onDelete: 'cascade', hooks: true })
      Group.belongsToMany(models.User, { through: 'Memberships', foreignKey: 'groupId' })
      Group.belongsTo(models.User, {foreignKey: 'organizerId'})
      Group.hasMany(models.Venue, {foreignKey: 'groupId', onDelete: 'cascade', hooks: true})
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [1, 60]
      }
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [50, 3000]
      }
    },
    type: {
      type: DataTypes.ENUM('Online','In person'),
      allowNull: false,
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
