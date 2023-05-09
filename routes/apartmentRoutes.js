const express = require('express')
const router = express.Router()
const { getApartments, addApartment, deleteApartment, updateApartment, getApartment }  = require('../controllers/apartmentController')
const {apartmentSchema} = require('../model/schemaModel')
const { validateParams } = require('../middleware/validatorMiddleware')

router.route('/').get(getApartments).post(validateParams(apartmentSchema), addApartment)
router.route('/:id').put(updateApartment).delete(deleteApartment).get(getApartment) 

module.exports = router