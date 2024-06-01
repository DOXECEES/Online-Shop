const db = require('./MainDBRequester');

function getTypesByCategoryId(categoryId, callback) {
    db.query('SELECT * FROM types WHERE category_id = ?', [categoryId], callback);
}

module.exports = { getTypesByCategoryId };
