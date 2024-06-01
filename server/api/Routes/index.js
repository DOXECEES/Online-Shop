const Router = require('express')
const router = new Router()
const categoriesRouter = require('./CategoriesRouter')
const typeRouter = require('./TypeRouter')
const brandsRouter = require('./BrandsRouter')
const deviceRouter = require('./DeviceRouter')
const filterRouter = require('./FiltersRouter')
const basketRouter = require('./BasketRouter')

router.use('/categories', categoriesRouter)
router.use('/types', typeRouter)
router.use('/brands', brandsRouter)
router.use('/products', deviceRouter)
router.use('/filters', filterRouter)
//router.use('/basket', basketRouter)

module.exports = router

