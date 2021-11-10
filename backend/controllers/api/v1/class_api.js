require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Class = require("../../../models/Class");
const User = require("../../../models/User");

//  CONTROLLER: createClass
//  DESC.: This method creates new class with the given parameters by the user
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

//  CONTROLLER: fetchClasses
//  DESC.: This method returns all the classes the user has created and joined
module.exports.fetchClasses = async (req, res) => {
  try {
    //fetching all the classes user has created/joined and populating required

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

//  CONTROLLER: joinClass
//  DESC.: This method after performing validations allows the user to join the requested classroom
module.exports.joinClass = async (req, res) => {
  try {
    const requestedClassId = req.body.classId;
    const requestedClass = await Class.findById(requestedClassId);

    //if requested class does not exist
    if (!requestedClass) {
      throw new Error("No class with that class code!");
    }

    //check if the request is being made by the classroom's owner
    if (requestedClass.createdBy == req.user.id) {
      throw new Error("Error! You are the owner of this classroom");
    }

    const currentUser = await User.findById(req.user.id);

    //check if user has already joined the clasroom
    if (currentUser.joinedClasses.includes(requestedClassId)) {
      throw new Error("You have already joined this classroom");
    }

    //all checks are performed, now user can join the classroom
    currentUser.joinedClasses.push(requestedClass);
    currentUser.save();

    res.json({
      joinedClass: requestedClass,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
