const express = require('express')
const router = express.Router()
const { getAllTenants, addTenant, deleteTenant, updateTenant, getTenant }  = require('../controllers/tenantController')
const { protect } = require('../middleware/authMiddleware')
const { filter } = require('../middleware/filter')
const { validateParams } = require('../middleware/validatorMiddleware')
const { tenantSchema } = require('../model/schemaModel')

router.route('/').get(protect, filter, getAllTenants).post( protect, validateParams(tenantSchema), addTenant)
router.route('/:id').put( protect, validateParams(tenantSchema), updateTenant).delete( protect, deleteTenant).get(protect, getTenant)

module.exports = router