const express = require('express')
const router = express.Router()
const { initiateSMS } = require('../controllers/SMSController')
const { protect } = require('../middlewares/authMiddleware')
const { SMSSchema } = require('../model/schemaModel')
const { validateParams } = require('../middlewares/validatorMiddleware')

router.route('/').post(protect, validateParams(SMSSchema), initiateSMS)

module.exports = router