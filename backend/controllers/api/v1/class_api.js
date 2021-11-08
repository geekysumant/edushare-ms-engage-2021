require("dotenv").config();
const jwt = require("jsonwebtoken");

const Class = require("../../../models/Class");

module.exports.createClass = async (req, res) => {
  const createdBy = req.user._id;
  const { className, subject, room } = req.body;

  const newClass = await Class.create({
    createdBy: req.user._id,
    className,
    subject,
    room,
  });

  res.status(200).json({
    message: {
      class: newClass,
    },
  });
};
