const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Business = require("../model/businessModel");
const { use } = require("../routes/clientRoutes");
const loginUser = asyncHandler(async (req, res) => {
  console.log(res.body);
  const { email, password, business, business_id } = req.body;

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
  const { name, email, password, business_id, business } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  if (!business_id && !business) {
    res.status(400);
    throw new Error("Assign a business to this user");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("The email has already been used");
  }

  let newBusiness;
  if (business) {
    newBusiness = await Business.create(business).catch((err) => {
      res.status(400);
      throw new Error(JSON.stringify(err));
    });
  }

  console.log(newBusiness)

  //Hash password

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    business_id: req.body?.business_id ? req.body?.business_id : newBusiness?._id,
    business: req.body?.business_id ? req.body?.business_id : newBusiness?._id 
  }).populate('business', '-password');

  if (user) {
    res.status(201).json(
      {...user,  token: generateToken(user._id)}
     ,
    );
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate('business', '-password');
  res.status(200).json(user);
});

//Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate('business') .select('-password')
  console.log(users)
  res.status(200).json(users)
});

module.exports = { registerUser, loginUser, getMe , getUsers};
