const express = require('express')
const router = express.Router()
const { getProperties, addProperty, deleteProperty, updateProperty, getProperty }  = require('../controllers/propertyController')
const { protect } = require('../middlewares/authMiddleware')
const { propertySchema } = require('../model/schemaModel')
const { validateParams } = require('../middlewares/validatorMiddleware')


router.route('/').get(protect, getProperties).post(protect, validateParams(propertySchema), addProperty)
router.route('/:id').put(protect, updateProperty).delete(protect, deleteProperty).get(protect, getProperty) 

module.exports = router