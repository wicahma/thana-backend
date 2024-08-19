const SuperDao = require('./SuperDao');
const models = require('../models');

const Kecamatan = models.kecamatan;

class KecamatanDao extends SuperDao {
    constructor() {
        super(Kecamatan);
    }
}

module.exports = KecamatanDao;
