const Router = require('express')
const router = new Router()
const deviceController = require('../Controllers/DeviceController')

router.get('/', deviceController.getAll)

module.exports = router