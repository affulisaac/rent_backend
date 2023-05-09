const asyncHandler = require("express-async-handler");
const Apartment = require("../model/apartmentModel");
const Tenant = require("../model/tenantModel");

const getApartments = asyncHandler(async (req, res) => {
  const apartment = await Apartment.find().populate("property");
  res.status(200).json(apartment);
});

const addApartment = asyncHandler(async (req, res) => {
  const property = await Apartment.create(req.body);
  res.status(200).json(property);
});

const updateApartment = asyncHandler(async (req, res) => {
  const property = await Apartment.findById(req.params.id);
  if (!property) {
    res.status(400);
    throw new Error("Apartment not found");
  }
  const updateApartment = Apartment.updateOne(
    { _id: req.params.id },
    req.body
  ).catch((err) => {});
  res.status(200).json(updateApartment);
});

const deleteApartment = asyncHandler(async (req, res) => {
  const property = await Apartment.findById(req.params.id);
  if (!property) {
    res.status(400);
    throw new Error();
  }
  await Apartment.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id, message: "Deleted successfully" });
});

// const getApartment = asyncHandler(async (res, req) => {
//   const apartment = await Apartment.findOne({_id: req.params?.id})
//   // if(apartment){
//   //   const tenant = await Tenant.find({apartment_id: req.params?.id})
//   //   apartment.tenant = tenant
//   // }
//   // console.log(apartment)
//   res.status(200).json(apartment);
// });

const getApartment = asyncHandler(async (req, res) => {
  let apartment = await Apartment.findById(req.params.id).populate('property')
    // .populate("property")
    .catch((err) => {
      res.status(400);
      throw new Error("Apartment not found");
    });
  if (apartment) {
    const tenant = await Tenant.find({ apartment: req.params?.id });
    console.log(tenant);
    apartment.tenant = tenant;
  }
  res.status(200).json(apartment);
});

module.exports = {
  getApartments,
  addApartment,
  deleteApartment,
  updateApartment,
  getApartment,
};
