const express = require('express')
const router = express.Router()
const { getAllTenants, addTenant, deleteTenant, updateTenant, getTenant }  = require('../controllers/tenantController')
const { protect } = require('../middlewares/authMiddleware')
const { validateParams } = require('../middlewares/validatorMiddleware')
const { tenantSchema } = require('../model/schemaModel')

router.route('/').get(protect, getAllTenants).post( protect, validateParams(tenantSchema), addTenant)
router.route('/:id').put( protect, validateParams(tenantSchema), updateTenant).delete( protect, deleteTenant).get( getTenant)

module.exports = router