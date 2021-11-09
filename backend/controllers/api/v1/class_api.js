require("dotenv").config();
const jwt = require("jsonwebtoken");

const Class = require("../../../models/Class");
const User = require("../../../models/User");

module.exports.createClass = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const { className, subject, room } = req.body;

    //search if a class already exists with the given class name
    const exisitingClass = await Class.findOne({
      className,
    });
    if (exisitingClass) {
      throw new Error(
        `Class with name ${className} already exists. Please try with a different name`
      );
    }
    const newClass = await Class.create({
      createdBy: req.user._id,
      className,
      subject,
      room,
    });
    // once the user creates the class, also save it in their createdClasses
    const user = await User.findById(req.user._id);

    user.createdClasses.push(newClass);
    await user.save();

    res.status(200).json({
      message: {
        class: newClass,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.fetchClasses = async (req, res) => {
  try {
    //fetching all the classes user has created/joined and only selecting part of it

    const userClasses = await User.findById(
      req.user.id,
      "createdClasses joinedClasses"
    )
      .sort({ createdAt: "desc" })
      .populate("createdClasses", "subject className room")
      .populate("joinedClasses", "subject className room");
    res.json({
      classes: userClasses,
    });
  } catch (err) {
    res.statusCode = 500;
    res.json({
      message: err.message,
    });
  }
};
