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
    // submissions : []
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
