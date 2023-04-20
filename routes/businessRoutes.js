const express = require('express')
const router = express.Router()
const { getBusinesses, addBusiness, deleteBusiness, updateBusiness, getBusiness }  = require('../controllers/businessController')
const { protect } = require('../middlewares/authMiddleware')
const { businessSchema } = require('../model/schemaModel')
const { validateParams } = require('../middlewares/validatorMiddleware')


router.route('/').get(protect, getBusinesses).post(protect, validateParams(businessSchema), addBusiness)
router.route('/:id').put(protect, updateBusiness).delete(protect, deleteBusiness).get(protect, getBusiness) 

module.exports = router