const express = require('express')
const router = express.Router()
const {registerUser, getMe, loginUser} = require('../controllers/userContrller')
const { protect } = require('../middlewares/authMiddleware')

router.post('/', registerUser)
router.post('/me', protect, getMe)
router.post('/login', loginUser)


module.exports = router