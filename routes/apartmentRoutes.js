const express = require('express')
const router = express.Router()
const { getApartments, addApartment, deleteApartment, updateApartment, getApartment }  = require('../controllers/apartmentController')
const {apartmentSchema} = require('../model/schemaModel')
const { validateParams } = require('../middleware/validatorMiddleware')
const { protect } = require('../middleware/authMiddleware')
const { filter } = require('../middleware/filter')

router.route('/').get(protect, filter, getApartments).post(protect, validateParams(apartmentSchema), addApartment)
router.route('/:id').put(protect, updateApartment).delete(protect, deleteApartment).get(protect, getApartment) 

module.exports = router