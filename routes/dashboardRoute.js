const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { getSummary } = require('../controllers/dashboardController')
const { filter } = require('../middleware/filter')

router.route('/').get(protect, filter, getSummary)

module.exports = router