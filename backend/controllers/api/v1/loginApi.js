require("dotenv").config();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto");
const User = require("../../../models/User");

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);
module.exports.loginUser = async (req, res) => {
  const { token } = req.body;
  try {
    const response = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const { email, name, picture, email_verified } = response.payload;

    if (!email_verified) {
      res.statusCode(401).json({
        message: "Invalid credentials, please try again.",
      });
    }

    //search if user exists or not in db
    const user = await User.findOne({
      email,
    });

    if (!user) {
      //user does not exist;

      const randomPassword = crypto.randomBytes(20).toString("hex");
      console.log(randomPassword);
      const newUser = await User.create({
        name: name,
        email: email,
        password: randomPassword,
        picture,
      });
      const newToken = jwt.sign({ id: newUser.id }, JWT_SECRET);
      res.json({
        message: {
          id: newUser._id,
          email,
          name,
          picture,
          token: newToken,
        },
      });
    } else {
      const newToken = jwt.sign({ id: user.id }, JWT_SECRET);
      console.log(newToken);
      res.json({
        message: {
          id: user._id,
          email,
          name,
          picture,
          token: newToken,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.checkAuthentication = async (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      res.json({
        message: "OK",
      });
    } catch (error) {
      res.status(401).send("Not authorised");
    }
  } else {
    res.status(401).send("Not authorised");
    // throw new Error("Not Authorized");
  }
};
