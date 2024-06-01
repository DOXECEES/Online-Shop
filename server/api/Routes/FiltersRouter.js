const Router = require('express')
const router = new Router()
const filtersController = require('../Controllers/FilterController')

router.get('/', filtersController.getAll)

module.exports = router