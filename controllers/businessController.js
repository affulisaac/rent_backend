const asyncHandler = require("express-async-handler");
const Business = require("../model/businessModel")

const getBusinesses = asyncHandler(async (req, res) => {
  const business = await Business.find().populate('user', 'name email _id');
  res.status(200).json(business);
});

const addBusiness = asyncHandler(async (req, res) => {
  const business = await Business.create(req.body);
  res.status(200).json(business);
});

const updateBusiness = asyncHandler(async (req, res) => {
  const business = await Business.findById(req.params.id);
  if (!business) {
    res.status(400);
    throw new Error("Business not found");
  }
  const updatedBusiness = Business.findByIdAndUpdate(req.params.id, req.body).populate('user');
  res.status(200).json(updatedBusiness._update);
});

const deleteBusiness = asyncHandler(async (req, res) => {
  const business = await Business.findById(req.params.id);
  if (!business) {
    res.status(400);
    throw new Error(`Could not find business with ID ${req.params.id}`);
  }
  await Business.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id, message: "Deleted successfully" });
});

const getBusiness = asyncHandler(async (req, res) => {
  const business = await Business.findById(req.params.id).catch((err) => {
    res.status(400);
    throw new Error("Business not found");
  });
  res.status(200).json(business);
});

module.exports = {
  getBusinesses, addBusiness, deleteBusiness, updateBusiness, getBusiness
};
