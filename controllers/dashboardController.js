const asyncHandler = require("express-async-handler");
const Property = require("../model/propertyModel");
const Tenant = require("../model/tenantModel");
const Payment = require("../model/paymentModel");
const Apartment = require("../model/apartmentModel");

const getSummary = asyncHandler(async (req, res) => {
  try {
    let dashboard = {};
    Promise.all([
      Property.countDocuments(req.filterObj),
      Tenant.countDocuments(req.filterObj),
      Payment.aggregate([
        {
          $match: req.filterObj,
        },
        {
          $group: {
            _id: null,
            amount: { $sum: "$amount" },
          },
        },
      ]),
      Apartment.countDocuments(req.filterObj),
    ]).then(([property, tenant, payment, apartment]) => {
      dashboard = {
        property,
        tenant,
        payment: payment[0]?.amount || 0,
        apartment,
      };
      res.status(200).json(dashboard);
    });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

module.exports = { getSummary };
