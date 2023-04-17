const express = require('express')
const router = express.Router()
const { getProperties, addProperty, deleteProperty, updateProperty }  = require('../controllers/propertyController')

router.route('/').get(getProperties).post(addProperty)
router.route('/:id').put(updateProperty).delete(deleteProperty) 

module.exports = router