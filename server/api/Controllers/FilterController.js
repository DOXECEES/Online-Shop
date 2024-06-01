
const filter = require('./../Database/FilterRequester');

class FilterController {
    async getAll(req, res) {
        return filter.getAll((error, results) => {
            if (error) throw error;
            res.json(results);
        });
    }
}

module.exports = new FilterController();