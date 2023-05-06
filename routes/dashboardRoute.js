const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/authMiddleware')
const { getSummary } = require('../controllers/dashboardController')

router.route('/').get(protect, getSummary)

module.exports = router