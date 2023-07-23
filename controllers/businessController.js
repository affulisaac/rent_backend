const asyncHandler = require("express-async-handler");
const Business = require("../model/businessModel");

const getBusinesses = asyncHandler(async (req, res) => {
  console.log({ _id: req?.body?.business }, { owner: req.body.user })
  const business = await Business.find({
    $or: [{ _id: req?.body?.business }, { user: req.body.user }],
  })
    .populate("user", "name email _id")
    .populate("owner", "name contact_number _id");
  res.status(200).json(business);
});

const getBusinessesByUser = asyncHandler(async (req, res) => {
  const { user } = req.body;
  const business = await Business.find({ owner: user?._id }).populate();
  res.status(200).json(business);
});

const addBusiness = async (req, res) => {
  try {
    const business = await Business.create(req.body);
    res.status(200).json(business);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

const updateBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      res.status(400);
      throw new Error("Business not found");
    }
    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    console.log(updatedBusiness);
    res.status(200).json(updatedBusiness);
  } catch (error) {
    res.status(400).json(error?.message);
  }
};

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
  getBusinesses,
  getBusinessesByUser,
  addBusiness,
  deleteBusiness,
  updateBusiness,
  getBusiness,
};
