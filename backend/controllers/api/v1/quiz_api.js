require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const Quiz = require("../../../models/Quiz");
const Class = require("../../../models/Class");
const User = require("../../../models/User");
const QuizSubmission = require("../../../models/QuizSubmission");

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
      createdBy: quizzes.createdBy,
      quizzes: quizzes,
    });
  } catch (err) {
    res.status(400).send("Error!");
  }
};

module.exports.fetchQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;

    // also check is quiz id is valid object id

    const requestedQuiz = await Quiz.findById(quizId);
    if (!requestedQuiz) {
      throw new Error("Oops, no such quiz found!");
    }
    res.json({
      data: {
        createdBy: requestedQuiz.createdBy,
        questions: requestedQuiz.questions,
      },
    });
  } catch (err) {
    res.status(400).send("We've encountered an error, please try again");
  }
};

module.exports.submitQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const userSubmittedResponse = req.body.submission;
    // console.log(userSubmittedResponse);

    const isValidQuizId = mongoose.Types.ObjectId.isValid(quizId);

    if (!isValidQuizId) {
      throw new Error("No quiz found.");
    }
    const quiz = await Quiz.findById(quizId);

    //check if the quiz exists or not
    if (!quiz) {
      throw new Error("No quiz found.");
    }
    const usersSubmission = await QuizSubmission.findOne({
      quizId,
    });
    if (usersSubmission) {
      throw new Error("You have already taken the quiz.");
    }

    //all checks passed, now create a valid quiz submission
    const numberOfQuestions = quiz.questions.length;
    const submission = Array(numberOfQuestions).fill(-1);

    let totalScore = 0;
    quiz.questions.forEach((question, ind) => {
      let marksScored = 0;
      if (userSubmittedResponse[ind] === question.correctOption) {
        marksScored = question.correctMarks;
      } else if (
        userSubmittedResponse[ind] !== -1 &&
        userSubmittedResponse[ind] !== question.correctOption
      ) {
        marksScored = question.incorrectMarks;
      }
      totalScore = totalScore + marksScored;
      submission[ind] = {
        questionNumber: ind,
        option: userSubmittedResponse[ind],
        marksScored,
      };
    });

    const newSubmission = await QuizSubmission.create({
      createdBy: quiz.createdBy,
      classId: quiz.classId,
      quizId,
      submission: submission,
      totalScore,
    });

    await quiz.submissions.push(newSubmission);
    await quiz.save();

    res.json({
      data: {
        submission: newSubmission,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
