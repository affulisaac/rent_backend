const asyncHandler = require("express-async-handler");
const Appartment = require("../model/appartmentModel");
const Tenant = require("../model/tenantModel");

const getAppartments = asyncHandler(async (req, res) => {
  const appartment = await Appartment.find().populate("property");
  res.status(200).json(appartment);
});

const addAppartment = asyncHandler(async (req, res) => {
  const property = await Appartment.create(req.body);
  res.status(200).json(property);
});

const updateAppartment = asyncHandler(async (req, res) => {
  const property = await Appartment.findById(req.params.id);
  if (!property) {
    res.status(400);
    throw new Error("Appartment not found");
  }
  const updateAppartment = Appartment.updateOne(
    { _id: req.params.id },
    req.body
  ).catch((err) => {});
  res.status(200).json(updateAppartment);
});

const deleteAppartment = asyncHandler(async (req, res) => {
  const property = await Appartment.findById(req.params.id);
  if (!property) {
    res.status(400);
    throw new Error();
  }
  await Appartment.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id, message: "Deleted successfully" });
});

// const getAppartment = asyncHandler(async (res, req) => {
//   const appartment = await Appartment.findOne({_id: req.params?.id})
//   // if(appartment){
//   //   const tenant = await Tenant.find({appartment_id: req.params?.id})
//   //   appartment.tenant = tenant
//   // }
//   // console.log(appartment)
//   res.status(200).json(appartment);
// });

const getAppartment = asyncHandler(async (req, res) => {
  let appartment = await Appartment.findById(req.params.id).populate('property')
    // .populate("property")
    .catch((err) => {
      res.status(400);
      throw new Error("Appartment not found");
    });
  if (appartment) {
    const tenant = await Tenant.find({ appartment: req.params?.id });
    console.log(tenant);
    appartment.tenant = tenant;
  }
  res.status(200).json(appartment);
});

module.exports = {
  getAppartments,
  addAppartment,
  deleteAppartment,
  updateAppartment,
  getAppartment,
};
