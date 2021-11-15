const mongoose = require("mongoose");

const quizSubmissionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    submission: [
      {
        questionNumber: {
          type: Number,
        },
        option: {
          type: Number,
        },
        marksScored: {
          type: Number,
        },
      },
    ],
    totalScore: {
      type: Number,
    },
  },
  { timestamps: true }
);

const QuizSubmission = mongoose.model("QuizSubmission", quizSubmissionSchema);
module.exports = QuizSubmission;
