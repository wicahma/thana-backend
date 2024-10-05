const SuperDao = require("./SuperDao");
const models = require("../models");

const MapLayer = models.map_layer;

class MapLayerDao extends SuperDao {
  constructor() {
    super(MapLayer);
  }
}

module.exports = MapLayerDao;
