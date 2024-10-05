"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MapLayer extends Model {
    static associate(models) {}
  }
  MapLayer.init(
    {
      nama: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "map_layer",
    }
  );
  return MapLayer;
};
