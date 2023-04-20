const asyncHandler = require("express-async-handler");
const Property = require("../model/propertyModel");

const getProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find().populate("user", "name email _id");
  res.status(200).json(properties);
});

const addProperty = asyncHandler(async (req, res) => {
  const property = await Property.create(req.body);
  res.status(200).json(property);
});

const updateProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    res.status(400);
    throw new Error("Property not found");
  }
  const updateProperty = Property.updateOne({ _id: req.params.id }, req.body);
  res.status(200).json(updateProperty);
});

const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    res.status(400);
    throw new Error();
  }
  await Property.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id, message: "Deleted successfully" });
});

const getProperty = asyncHandler(async (res, req) => {
  res.status(200).json({ id: res?.id });
});

module.exports = {
  getProperties,
  addProperty,
  deleteProperty,
  updateProperty,
  getProperty,
};
