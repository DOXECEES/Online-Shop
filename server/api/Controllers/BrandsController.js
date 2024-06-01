const brands = require('./../Database/BrandsRequester');


class BrandsController {
    async getAll(req, res) {
        return brands.getBrandsByTypeId(req.query.id, (error, results) => {
            if (error) throw error;
            res.json(results);
        });
    }
}

module.exports = new BrandsController();