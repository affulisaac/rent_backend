const asyncHandler = require("express-async-handler");
const Property = require("../model/propertyModel");
const Tenant = require('../model/tenantModel')
const Payment = require('../model/paymentModel')
const Appartment = require('../model/appartmentModel')


const getSummary = asyncHandler(async (req, res) => {
  let dasboard = {}
  Promise.all([
    Property.countDocuments(),
    Tenant.countDocuments(),
    Payment.aggregate([
      { $group: { _id: null, amount: { $sum: '$amount' }}},
    ]),
    Appartment.countDocuments()
  ]).then(([property, tenant, payment, appartment])=>{
    dasboard = {
      property, tenant, payment: payment[0].amount, appartment
    }
   res.status(200).json(dasboard)
  })
 
});


module.exports = { getSummary };
