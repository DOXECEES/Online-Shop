const db = require('./MainDBRequester');

function getDeviceById(brandId, callback) {
    db.query('SELECT * FROM devices WHERE brandId = ?', [brandId], callback);
}

module.exports = { getDeviceById };
