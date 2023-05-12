const asyncHandler = require("express-async-handler");
const Property = require("../model/propertyModel");

const getProperties = async (req, res) => {
  try {
      const property = await Property.find();
  res.status(200).json(property);
  } catch (error) {
    res.status(400).json({ message: error?.message });

  }

};

const addProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(200).json(property);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(400);
      throw new Error("Property not found");
    }
    const updatedProperty = Property.findByIdAndUpdate(
      req.params.id,
      req.body
    ).populate("user");
    res.status(200).json(updatedProperty._update);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      res.status(400);
      throw new Error(`Could not find property with ID ${req.params.id}`);
    }
    await Property.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ id: req.params.id, message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

const getProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id).catch((err) => {
    res.status(400);
    throw new Error("Property not found");
  });
  res.status(200).json(property);
});

module.exports = {
  getProperties,
  addProperty,
  deleteProperty,
  updateProperty,
  getProperty,
};
