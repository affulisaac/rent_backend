const express = require('express')
const router = express.Router()
const {registerUser, getMe, loginUser, getUsers} = require('../controllers/userContrller')
const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect, getUsers).post(registerUser)
router.post('/me', protect, getMe)
router.post('/login', loginUser)


module.exports = router