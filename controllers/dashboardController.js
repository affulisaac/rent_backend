const asyncHandler = require("express-async-handler");
const Property = require("../model/propertyModel");
const Tenant = require('../model/tenantModel')
const Payment = require('../model/paymentModel')
const Apartment = require('../model/apartmentModel')


const getSummary = asyncHandler(async (req, res) => {
  let dashboard = {}
  Promise.all([
    Property.countDocuments(),
    Tenant.countDocuments(),
    Payment.aggregate([
      { $group: { _id: null, amount: { $sum: '$amount' }}},
    ]),
    Apartment.countDocuments()
  ]).then(([property, tenant, payment, apartment])=>{
    dashboard = {
      property, tenant, payment: payment[0]?.amount || 0, apartment
    }
   res.status(200).json(dashboard)
  })
 
});


module.exports = { getSummary };
