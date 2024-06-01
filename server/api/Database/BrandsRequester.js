const db = require('./MainDBRequester');

function getBrandsByTypeId(typeId, callback) {
    db.query('SELECT * FROM brands WHERE type_id = ?', [typeId], callback);
}

module.exports = { getBrandsByTypeId };

// SELECT
// p.id,
// (SELECT count(s.id) FROM types s WHERE s.category_id = 1) AS max_quantity,
// (SELECT MAX(p.id) FROM types p) AS min_price
// FROM categories p