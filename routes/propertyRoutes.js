const express = require('express')
const router = express.Router()
const { getProperties, addProperty, deleteProperty, updateProperty }  = require('../controllers/propertyController')
const {propertySchema} = require('../model/schemaModel')
const { validateParams } = require('../middlewares/validatorMiddleware')

router.route('/').get(getProperties).post(validateParams(propertySchema), addProperty)
router.route('/:id').put(updateProperty).delete(deleteProperty) 

module.exports = router