const db = require('./MainDBRequester');

function getAll(callback) {
    db.query('SELECT * FROM filters', callback);
}

module.exports = { getAll };
