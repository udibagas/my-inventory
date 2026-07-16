"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsTo(models.Building);
    }
  }

  Room.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      description: DataTypes.STRING,
      BuildingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Room",
    },
  );

  return Room;
};
