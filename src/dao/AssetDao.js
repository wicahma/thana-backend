const SuperDao = require('./SuperDao');
const models = require('../models');

const Asset = models.asset;

class AssetDao extends SuperDao {
    constructor() {
        super(Asset);
    }
}

module.exports = AssetDao;
