const express = require('express')
const router = express.Router()
const { getAllTenants, addTenant, deleteTenant, updateTenant, getTenant }  = require('../controllers/tenantController')
const { protect } = require('../middlewares/authMiddleware')

router.route('/').get( getAllTenants).post( addTenant)
router.route('/:id').put( updateTenant).delete( deleteTenant).get( getTenant)

module.exports = router