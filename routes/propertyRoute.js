const express = require('express')
const router = express.Router()
const { getProperties, addProperty, deleteProperty, updateProperty, getProperty }  = require('../controllers/propertyController')
const { protect } = require('../middleware/authMiddleware')
const { propertySchema } = require('../model/schemaModel')
const { validateParams } = require('../middleware/validatorMiddleware')
const { filter } = require('../middleware/filter')


router.route('/').get(protect, filter, getProperties).post(protect, validateParams(propertySchema), addProperty)
router.route('/:id').put(protect, updateProperty).delete(protect, deleteProperty).get(protect, getProperty) 

module.exports = router