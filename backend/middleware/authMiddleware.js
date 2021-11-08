require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  } else {
    console.log("hereeeee***************");
    res.status(401).json({
      message: "Not Authorized!",
    });
    // throw new Error("Not Authorized");
  }
};
