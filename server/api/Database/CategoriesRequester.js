const db = require('./MainDBRequester');

function getCategories(callback) {
    db.query('SELECT * FROM products', callback);
}

module.exports = { getCategories };
