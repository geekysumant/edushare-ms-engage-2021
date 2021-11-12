require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Quiz = require("../../../models/Quiz");
const Class = require("../../../models/Class");
const User = require("../../../models/User");

module.exports.createQuiz = async (req, res) => {
  try {
    const { classId, questions } = req.body;
    console.log(questions);
    const user = req.user.id;

    const whichClass = await Class.findById(classId);
    if (whichClass.createdBy != user) {
      throw new Error("You are not authorised to perform this action.");
    }
    const createdQuiz = await Quiz.create({
      createdBy: req.user._id,
      classId,
      questions,
    });

    //once quiz is created, also save it into the classes' quizzes array

    await whichClass.quizzes.push(createdQuiz);
    await whichClass.save();
    res.json({
      message: "Quiz successfully created!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
module.exports.fetchAssignments = async (req, res) => {
  try {
    const classId = req.params.classId;
    const quizzes = await Class.findById(classId).populate("quizzes");

    res.json({
      quizzes: quizzes,
    });
  } catch (err) {
    res.status(400).send("Error!");
  }
};
