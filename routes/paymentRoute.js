const express = require('express')
const router = express.Router()
const { getPayments, addPayment, deletePayment, updatePayment, getPayment }  = require('../controllers/paymentController')
const { protect } = require('../middleware/authMiddleware')
const { paymentSchema } = require('../model/schemaModel')
const { validateParams } = require('../middleware/validatorMiddleware')
const { filter } = require('../middleware/filter')


router.route('/').get(protect, filter,  getPayments).post( validateParams(paymentSchema), addPayment)
router.route('/:id').put(protect, updatePayment).delete(protect, deletePayment).get(protect, getPayment) 

module.exports = router