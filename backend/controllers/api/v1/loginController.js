const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  "415689367589-nisg4jqf33c0c48rdq67np63d0m5gujk.apps.googleusercontent.com"
);
module.exports.loginUser = async (req, res) => {
  const { token } = req.body;
  try {
    const response = await client.verifyIdToken({
      idToken: token,
      audience:
        "415689367589-nisg4jqf33c0c48rdq67np63d0m5gujk.apps.googleusercontent.com",
    });
    const { email, name, picture, email_verified } = response.payload;
    res.json({
      email,
      name,
      picture,
    });
  } catch (err) {
    console.log(err);
  }
};
