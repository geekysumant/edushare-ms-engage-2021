require("dotenv").config();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto");
const User = require("../../../models/User");
const { INVALID_CREDENTIALS } = require("../../../utils/Constants");

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

//  CONTROLLER: loginUser
//  DESC.: This method receives a token from Google Auth, then creates a new JWT token
// for the user.
module.exports.loginUser = async (req, res) => {
  const { token } = req.body;
  try {
    const response = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const { email, name, picture, email_verified } = response.payload;

    if (!email_verified) {
      const error = new Error(INVALID_CREDENTIALS);
      error.code = 401;
      throw error;
    }

    //search if user exists or not in db
    const user = await User.findOne({
      email,
    });

    if (!user) {
      //user does not exist;
      const randomPassword = crypto.randomBytes(20).toString("hex");
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
    if (err.code) {
      res.status(err.code).send(err.message);
    } else res.status(401).send(err.message);
  }
};
