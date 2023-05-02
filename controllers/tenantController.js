const asyncHandler = require("express-async-handler");
const Tenant = require("../model/tenantModel");
const { sendSMS } = require('../services/hubtel-sms')

const getAllTenants = asyncHandler(async (req, res) => {
  const tenants = await Tenant.find().populate("user", "name email _id").populate("appartment");
  res.status(200).json(tenants);
});

const getTenant = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id)
  .populate('appartment')
  .catch((err) => {
    res.status(400);
    throw new Error("Tenant not found");
  });
  res.status(200).json(tenant);
});

const addTenant = asyncHandler(async (req, res) => {
  const property = await Tenant.create(req.body);
   res.status(200).json(property);
});

const updateTenant = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id);
  if (!tenant) {
    res.status(400);
    throw new Error("Tenant not found");
  }
  const updatedTenant = Tenant.updateOne({_id: req.params.id}, req.body);
  res.status(200).json(updatedTenant?._update);
});

const deleteTenant = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id);
  if (!tenant) {
    res.status(400);
    throw new Error();
  }
  await Tenant.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id, message: "Deleted successfully" });
});

module.exports = {
  getAllTenants,
  addTenant,
  deleteTenant,
  updateTenant,
  getTenant,
};
