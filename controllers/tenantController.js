const asyncHandler = require("express-async-handler");
const Tenant = require("../model/tenantModel");

const getAllTenants = asyncHandler(async (req, res) => {
  const tenants = await Tenant.find().populate("user", "name email _id");
  res.status(200).json(tenants);
});

const getTenant = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id)
  .populate('appartment_id')
  .catch((err) => {
    res.status(400);
    throw new Error("Tenant not found");
  });
  res.status(200).json(tenant);
});

const addTenant = asyncHandler(async (req, res) => {
  const {
    name,
    rent_start_date,
    rent_end_date,
    national_id,
    emergency_contact_name,
    phone,
    email,
    rooms,
    occupation,
    amount_per_month,
    appartment_id,
    appartment_number,
    emergency_contact,
    nationality,
    contact_number,
  } = req.body;
  const property = await Tenant.create({
    name,
    rent_start_date,
    rent_end_date,
    national_id,
    emergency_contact_name,
    phone,
    email,
    rooms,
    amount_per_month,
    occupation,
    appartment_id,
    appartment_number,
    emergency_contact,
    nationality,
    contact_number,
    user: req.user?._id,
  });
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
