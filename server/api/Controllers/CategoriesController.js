const categories = require('./../Database/CategoriesRequester');


class CategoriesController {
    async getAll(req, res) {
        return categories.getCategories((error, results) => {
            if (error) throw error;
            res.json(results);
        });
    }
}

module.exports = new CategoriesController();