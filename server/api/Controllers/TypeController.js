
const types = require('./../Database/TypeRequester');

class TypeController {
    async getAll(req, res) {
        return types.getTypesByCategoryId(req.query.id, (error, results) => {
            if (error) throw error;
            res.json(results);
        });
    }
}

module.exports = new TypeController();