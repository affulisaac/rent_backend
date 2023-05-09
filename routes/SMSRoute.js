const express = require('express')
const router = express.Router()
const { initiateSMS } = require('../controllers/SMSController')
const { protect } = require('../middleware/authMiddleware')
const { SMSSchema } = require('../model/schemaModel')
const { validateParams } = require('../middleware/validatorMiddleware')

router.route('/').post(protect, validateParams(SMSSchema), initiateSMS)

module.exports = router