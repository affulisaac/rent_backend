const express = require('express')
const router = express.Router()
const {registerUser, getMe, loginUser, getUsers} = require('../controllers/userContrller')
const { protect } = require('../middlewares/authMiddleware')
const { userSchema } = require('../model/schemaModel')
const { validateParams } = require('../middlewares/validatorMiddleware')

router.route('/').get(getUsers).post(validateParams(userSchema), registerUser)
router.post('/me', protect, getMe)
router.post('/login', loginUser)


module.exports = router