const express = require('express')
const router = express.Router()
const {registerUser, deleteUser, deactivateUser, getMe, loginUser, getUsers} = require('../controllers/userContrller')
const { protect } = require('../middlewares/authMiddleware')
const { userSchema } = require('../model/schemaModel')
const { validateParams } = require('../middlewares/validatorMiddleware')

router.route('/').get(getUsers).post(validateParams(userSchema), registerUser)
router.post('/me', protect, getMe)
router.delete('/delete/:id', protect, deleteUser)
router.post('/login', loginUser)
router.put('/deactivate/:id', deactivateUser)

module.exports = router