const express = require('express')
const router = express.Router()
const { getPayment }  = require('../controllers/paymentController')

router.route('/:id').get(getPayment) 

module.exports = router