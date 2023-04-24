const express = require('express')
const router = express.Router()
const { getAppartments, addAppartment, deleteAppartment, updateAppartment, getAppartment }  = require('../controllers/appartmentController')
const {appartmentSchema} = require('../model/schemaModel')
const { validateParams } = require('../middlewares/validatorMiddleware')

router.route('/').get(getAppartments).post(validateParams(appartmentSchema), addAppartment)
router.route('/:id').put(updateAppartment).delete(deleteAppartment).get(getAppartment) 

module.exports = router