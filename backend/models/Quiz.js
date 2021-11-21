const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    title: {
      type: String,
      required: true,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        options: [
          {
            option: {
              type: String,
              required: true,
            },
            optionNumber: {
              type: Number,
              required: true,
            },
          },
        ],
        incorrectMarks: {
          type: Number,
          required: true,
        },
        correctMarks: {
          type: Number,
          required: true,
        },
        correctOption: {
          type: Number,
          required: true,
        },
      },
    ],
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizSubmission",
      },
    ],
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
