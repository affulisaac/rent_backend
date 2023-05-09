const asyncHandler = require("express-async-handler");
const Rent = require("../model/rentModel");
const Tenant = require("../model/tenantModel");
const { sendMessage } = require("../services/arkesel-sms");

const getAllRent = async (req, res) => {
  try {
    const rents = await Rent.find()
      .populate("user", "name email _id")
      .populate("apartment");
    res.status(200).json(rents);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getRent = asyncHandler(async (req, res) => {
  const rent = await Rent.findById(req.params.id)
    .populate("apartment")
    .catch((err) => {
      res.status(400);
      throw new Error("Rent not found");
    });
  res.status(200).json(rent);
});

const addRent = async (req, res) => {
  const body = req.body
  delete body?._id
  const rent = new Rent(req.body);
  try {
    const newRent = await rent.save();
    if (newRent) {
     const tenant = await Tenant.findOne({_id: body.tenant})
    if(tenant){
      tenant.rents.push(rent?._id)
      const updatedTenant = await Tenant.findByIdAndUpdate({_id: tenant?._id}, tenant)
      console.log(updatedTenant)
    }
      // sendMessage([res.body.contact_number], 'Your data has been captured')
      res.status(200).json(newRent);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateRent = async (req, res) => {
  const rent = await Rent.findById(req.params.id);
  if (!rent) {
    res.status(400);
    throw new Error("Rent not found");
  }
  const updatedRent = await Rent.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  console.log(updatedRent);
  res.status(200).json(updatedRent?._update);
};

const deleteRent = asyncHandler(async (req, res) => {
  const rent = await Rent.findById(req.params.id);
  if (!rent) {
    res.status(400);
    throw new Error();
  }
  await Rent.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id, message: "Deleted successfully" });
});

module.exports = {
  getAllRent,
  addRent,
  deleteRent,
  updateRent,
  getRent,
};
