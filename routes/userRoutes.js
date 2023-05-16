const express = require('express')
const router = express.Router()
const {registerUser, updateUser, deleteUser, deactivateUser, getMe, loginUser, getUsers} = require('../controllers/userContrller')
const { protect } = require('../middleware/authMiddleware')
const { userSchema, userUpdateSchema } = require('../model/schemaModel')
const { validateParams } = require('../middleware/validatorMiddleware')
const { filter } = require('../middleware/filter')

router.route('/').get(protect, filter, getUsers).post(protect, validateParams(userSchema), registerUser)
router.route('/:id').put(protect, validateParams(userUpdateSchema), updateUser)
router.post('/me', protect, getMe)
router.delete('/delete/:id', protect, deleteUser)
router.post('/login', loginUser)
router.put('/deactivate/:id', deactivateUser)

module.exports = router