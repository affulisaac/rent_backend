const asyncHandler = require("express-async-handler");
const Tenant = require("../model/tenantModel");
const { sendSMS } = require("../services/hubtel-sms");

const getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find()
      .populate("user", "name email _id")
      .populate("appartment");
    res.status(200).json(tenants);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getTenant = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id)
    .populate("appartment")
    .catch((err) => {
      res.status(400);
      throw new Error("Tenant not found");
    });
  res.status(200).json(tenant);
});

const addTenant = async (req, res) => {
  const tenant  = new Tenant(req.body)
  try {
    const newTenant = await tenant.save()
    res.status(200).json(newTenant);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const updateTenant = async (req, res) => {
  const tenant = await Tenant.findById(req.params.id);
  if (!tenant) {
    res.status(400);
    throw new Error("Tenant not found");
  }
  const updatedTenant = await Tenant.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  console.log(updatedTenant);
  res.status(200).json(updatedTenant?._update);
};

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
