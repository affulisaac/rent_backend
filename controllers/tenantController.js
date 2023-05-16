const asyncHandler = require("express-async-handler");
const Tenant = require("../model/tenantModel");
const { sendMessage } = require("../services/arkesel-sms");

const getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find(req.filterObj).populate('rents').populate("user", "name email _id");
    res.status(200).json(tenants);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getTenant = asyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id)
    .populate("user", "name email _id")
    .populate('rents')
    .populate('rents.apartment')
    .catch((err) => {
      res.status(400);
      throw new Error("Tenant not found");
    });
  res.status(200).json(tenant);
});

const addTenant = async (req, res) => {
  const body  = req.body
  delete body?._id
  const tenant = new Tenant(body);
  try {
    const newTenant = await tenant.save();
    if (newTenant) {
      console.log(newTenant)
      // sendMessage([res.body.contact_number], 'Your data has been captured')
      res.status(200).json(newTenant);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
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
