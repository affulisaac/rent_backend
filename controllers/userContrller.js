const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Business = require("../model/businessModel");
const crypto = require("crypto");
const { sendSMS } = require("../services/hubtel-sms");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Provide a valid email and password ");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Email or password is not correct");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("The email has already been used");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const clientID = crypto.randomBytes(8).toString("hex");
  req.body.password = hashPassword;
  req.body.client_id = clientID;
  //create user
  const user = await User.create(req.body);
  if (user) {
    sendSMS("233547469379", "New user has been registered");
    res.status(201).json({
      ...user,
      //token: generateToken(user._id)//
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate(
    "business",
    "-password"
  );
  res.status(200).json(user);
});

//Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

const deactivateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error();
  }
  const deactivateUser = await User.findByIdAndUpdate(req.params.id, {
    status: 0,
  });
  if (deactivateUser) {
    res
      .status(200)
      .json({
        id: req.params.id,
        status: 0,
        message: "User has been deactivated",
      });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate("business").select("-password");
  res.status(200).json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error(`Could not find user with ID ${req.params.id}`);
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id, message: "Deleted successfully" });
});

module.exports = { registerUser, deleteUser, deactivateUser, loginUser, getMe, getUsers, deactivateUser };
