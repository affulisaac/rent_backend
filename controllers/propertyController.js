const asyncHandler = require("express-async-handler");
const Property = require("../model/propertyModel")

const getProperties = asyncHandler(async (req, res) => {
  const property = await Property.find()
  res.status(200).json(property);
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
  const updatedProperty = Property.findByIdAndUpdate(req.params.id, req.body).populate('user');
  console.log(updatedProperty)
  res.status(200).json(updatedProperty._update);
});

const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    res.status(400);
    throw new Error(`Could not find property with ID ${req.params.id}`);
  }
  await Property.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id, message: "Deleted successfully" });
});

const getProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id).catch((err) => {
    res.status(400);
    throw new Error("Property not found");
  });
  res.status(200).json(property);
});

module.exports = {
  getProperties, addProperty, deleteProperty, updateProperty, getProperty
};
