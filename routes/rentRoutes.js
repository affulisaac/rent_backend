const express = require('express')
const router = express.Router()
const { getAllRent, addRent, deleteRent, updateRent, getRent }  = require('../controllers/rentController')
const { protect } = require('../middleware/authMiddleware')
const { validateParams } = require('../middleware/validatorMiddleware')
const { tenantSchema } = require('../model/schemaModel')

router.route('/').get(protect, getAllRent).post( protect, validateParams(tenantSchema), addRent)
router.route('/:id').put( protect, validateParams(tenantSchema), updateRent).delete( protect, deleteRent).get(protect, getRent)

module.exports = router