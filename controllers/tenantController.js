const asyncHandler = require("express-async-handler");
const Tenant = require("../model/tenantModel");

const getAllTenants = asyncHandler(async (req, res) => {
  const tenants = await Tenant.find();
  res.status(200).json(tenants);
});

const getTenant = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id);
  if (!tenant) {
    res.status(400);
    throw new Error("Tenant not found");
  }
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
    amount_per_month,
    occupation,
    appartment_id,
    appartment_number,
    emergency_contact,
    nationality,
    contact_number,
  });
  res.status(200).json(property);
});

const updateTenant = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id);
  if (!tenant) {
    res.status(400);
    throw new Error("Tenant not found");
  }
  const updatedTenant = Tenant.findByIdAndUpdate(req.params.id, req.body)
  console.log(JSON.stringify(updatedTenant))
  res.status(200).json(updatedTenant);
});

const deleteTenant = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id);
  if (!tenant) {
    res.status(400);
    throw new Error();
  }
  await Tenant.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id, message: "Deleted successfuly" });
});

module.exports = {
  getAllTenants,
  addTenant,
  deleteTenant,
  updateTenant,
  getTenant,
};
