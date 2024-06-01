const Router = require('express')
const router = new Router()
const typeController = require('../Controllers/TypeController')

router.get('/', typeController.getAll)

module.exports = router