const express = require('express')
const router = express.Router()
const { getPayments, addPayment, deletePayment, updatePayment, getPayment }  = require('../controllers/paymentController')
const { protect } = require('../middlewares/authMiddleware')
const { paymentSchema } = require('../model/schemaModel')
const { validateParams } = require('../middlewares/validatorMiddleware')


router.route('/').get(getPayments).post( validateParams(paymentSchema), addPayment)
router.route('/:id').put(protect, updatePayment).delete(protect, deletePayment).get(protect, getPayment) 

module.exports = router