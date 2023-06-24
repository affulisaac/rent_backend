const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const crypto = require("crypto");
const { sendMessage } = require("../services/arkesel-sms");
const { sendEmail } = require("../services/mailer");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
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
      throw new Error("Email or password is not correct");
    }
  } catch (error) {
    res.status(400).json({ message: error?.message });
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
  const { email, password, name } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: `The email has already been used` });
      // throw new Error("The email has already been used");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const clientID = crypto.randomBytes(8).toString("hex");
    console.log(clientID);
    req.body.password = hashPassword;
    req.body.client_id =
      req.body.is_client === "Yes" ? clientID : req.body?.client;
    delete req.body?._id;

    const user = await User.create(req.body);
    if (user) {
      const firsName = req.body?.name?.split(" ")[0];
      sendMessage(
        [req.body?.contact_number + ""],
        `Hello ${firsName}, Your account has been created on mikirent.com. Login with the email: ${req.body?.email} and password: ${password} at mikirent.com`
      );
      await sendEmail(
        email,
        "Welcome to Miki Rent",
        "../../templates/login-credentials.ejs",
        { email, password, name }
      );
      delete user?._doc?.password;
      res.status(201).json(user?._doc);
    } else {
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .select(`-password`)
    .populate("business");
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
    res.status(200).json({
      id: req.params.id,
      status: 0,
      message: "User has been deactivated",
    });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  console.log(req.body)
  const users = await User.find({ $or: [{ user: req.body.user }, {_id: req.body.user}] 
  })
    .select("-password, -business_name")
    .populate("user", "-password")
    .populate("business");
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

const updateUser = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }
    const emails = await User.find({ email, _id: { $ne: id } });
    if (emails.length > 0) {
      throw new Error("Email has already been taken");
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body);

    if (updatedUser) {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

module.exports = {
  registerUser,
  updateUser,
  deleteUser,
  deactivateUser,
  loginUser,
  getMe,
  getUsers,
  deactivateUser,
};
