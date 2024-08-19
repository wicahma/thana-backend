const SuperDao = require('./SuperDao');
const models = require('../models');

const Skpd = models.skpd;

class SkpdDao extends SuperDao {
    constructor() {
        super(Skpd);
    }
}

module.exports = SkpdDao;
