const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get user from token

      const user = await User.findById(decoded.id).select("-password");
      req.user = user;
      if (req.body) {
        req.body.user = user._id;
        req.body.client_id = user.client_id;
        if (!req.body.business) {
          req.body.business = user?.business?._id;
        }
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authourized");
    }

    if (!token) {
      res.status(401);
      throw new Error("Token not present");
    }
  } else {
    res.status(401);
    throw new Error("Token not present");
  }
});

module.exports = { protect };
