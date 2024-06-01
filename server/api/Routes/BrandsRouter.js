const Router = require('express')
const router = new Router()
const BrandsController = require('../Controllers/BrandsController')

router.get('/', BrandsController.getAll)

module.exports = router