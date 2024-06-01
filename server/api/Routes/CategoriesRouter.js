const Router = require('express')
const router = new Router()
const categoriesController = require('../Controllers/CategoriesController')

router.get('/', categoriesController.getAll)

module.exports = router