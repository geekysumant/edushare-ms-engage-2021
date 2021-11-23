require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const fs = require("fs");

const Quiz = require("../../../models/Quiz");
const Class = require("../../../models/Class");
const User = require("../../../models/User");
const QuizSubmission = require("../../../models/QuizSubmission");
const Assignment = require("../../../models/Assignment.js");
const path = require("path");
const AssignmentSubmission = require("../../../models/AssignmentSubmission");
const { uploadFile, downloadFile } = require("../../../config/s3");
const {
  INVALID_CLASS_ID,
  INVALID_ASSIGNMENT_ID,
  NO_SUBMISSION_FOUND,
  ASSIGNMENT_GRADED,
  NOT_AUTHORISED,
  INVALID_GRADE,
} = require("../../../utils/Constants");

module.exports.createQuiz = async (req, res) => {
  try {
    const { classId, questions, title } = req.body;
    console.log(questions);
    const user = req.user.id;

    const whichClass = await Class.findById(classId);
    if (whichClass.createdBy != user) {
      throw new Error("You are not authorised to perform this action.");
    }
    const createdQuiz = await Quiz.create({
      title,
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

    const isValidClassId = mongoose.Types.ObjectId.isValid(classId);
    if (!isValidClassId) {
      const error = new Error(INVALID_CLASS_ID);
      error.code = 404;
      throw error;
    }
    const allAssignments = await Class.findById(classId).populate(
      "quizzes assignments"
    );

    allAssignments.quizzes.sort((a, b) => {
      if (
        new Date(a.createdAt).toISOString() >
        new Date(b.createdAt).toISOString()
      )
        return -1;
      else return 1;
    });
    allAssignments.assignments.sort((a, b) => {
      if (
        new Date(a.createdAt).toISOString() >
        new Date(b.createdAt).toISOString()
      )
        return -1;
      else return 1;
    });

    res.json({
      data: {
        createdBy: allAssignments.createdBy,
        quizzes: allAssignments.quizzes,
        assignments: allAssignments.assignments,
      },
    });
  } catch (err) {
    if (err.code) {
      res.status(err.code).send(err.message);
    } else res.status(400).send("Error!");
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
    const quizSubmissionOfUser = await QuizSubmission.findOne({
      user: req.user._id,
      quizId: quizId,
    });

    let hasSubmitted = false;
    if (quizSubmissionOfUser) {
      hasSubmitted = true;
    }
    let totalQuizScore = 0;
    requestedQuiz.questions.forEach(
      (ques) => (totalQuizScore = totalQuizScore + ques.correctMarks)
    );
    res.json({
      data: {
        totalQuizScore,
        totalUserScore: hasSubmitted ? quizSubmissionOfUser.totalScore : 0,
        hasSubmitted,
        title: requestedQuiz.title,
        createdBy: requestedQuiz.createdBy,
        questions: requestedQuiz.questions,
        submission: quizSubmissionOfUser ? quizSubmissionOfUser : [],
      },
    });
  } catch (err) {
    res.status(400).send("We've encountered an error, please try again");
  }
};
module.exports.fetchPendingAssignments = async (req, res) => {
  try {
    const classId = req.params.classId;
    const isValidClassId = mongoose.Types.ObjectId.isValid(classId);

    if (!isValidClassId) {
      const error = new Error(INVALID_CLASS_ID);
      err.code = 404;
      throw error;
    }

    const allQuizzes = await Quiz.find(
      {
        classId,
      },
      "_id"
    );
    const allSubmissions = await QuizSubmission.find(
      {
        classId,
      },
      "user"
    );

    if (!allQuizzes) {
      const error = new Error(INVALID_CLASS_ID);
      err.code = 404;
      throw error;
    }

    let pendingQuizzes = [];
    allQuizzes.forEach((quiz) => {
      console.log(quiz);
      if (!allSubmissions.find((sub) => sub.quizId.equals(quiz._id))) {
        pendingQuizzes.push(quiz.id);
      }
      // if (
      //   !allSubmissions.find(
      //     (quizSubmission) =>
      //       quizSubmission.quizId.equals(quiz._id) &&
      //       quizSubmission.user.equals(req.user._id)
      //   )
      // ) {
      //   pendingQuizzes.push(quiz);
      // }
    });
    console.log(pendingQuizzes);

    res.json({
      data: {
        pendingQuizzes,
      },
    });
  } catch (err) {}
};

module.exports.fetchAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;

    // also check is quiz id is valid object id
    if (!assignmentId) {
      throw new Error("Invalid assignment");
    }
    const isValidAssignmentId = mongoose.Types.ObjectId.isValid(assignmentId);

    if (!isValidAssignmentId) {
      throw new Error("Oops, no such quiz found!");
    }

    const requestedAssignment = await Assignment.findById(assignmentId);

    if (!requestedAssignment) {
      throw new Error("Oops, no such quiz found!");
    }
    const usersAssignmentSubmission = await AssignmentSubmission.findOne({
      assignmentId,
      userId: req.user._id,
    });

    let hasSubmitted = false;
    if (usersAssignmentSubmission) {
      hasSubmitted = true;
    }

    res.json({
      data: {
        assignment: requestedAssignment,
        createdBy: requestedAssignment.createdBy,
        hasSubmitted,
      },
    });
    // const quizSubmissionOfUser = await QuizSubmission.findOne({
    //   user: req.user._id,
    //   quizId: quizId,
    // });

    // let hasSubmitted = false;
    // if (quizSubmissionOfUser) {
    //   hasSubmitted = true;
    // }
    // let totalQuizScore = 0;
    // requestedQuiz.questions.forEach(
    //   (ques) => (totalQuizScore = totalQuizScore + ques.correctMarks)
    // );
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.submitQuiz = async (req, res) => {
  try {
    const quizId = req.body.quizId;
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
    if (quiz.createdBy === req.user._id) {
      throw new Error("You can't give the quiz.");
    }
    const usersSubmission = await QuizSubmission.findOne({
      user: req.user._id,
      quizId: quizId,
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
      user: req.user._id,
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
    res.status(400).send(error.message);
  }
};

module.exports.fetchQuizSubmissions = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const isValidQuizId = mongoose.Types.ObjectId.isValid(quizId);

    if (!isValidQuizId) {
      throw new Error("No quiz found!");
    }

    //if the user that is hitting this api is not the creator of quiz, return them error

    const quiz = await Quiz.findById(quizId).populate([
      {
        path: "submissions",
        populate: { path: "user", select: "id name email picture" },
      },
      // { path: "joinedClasses", populate: { path: "quizzes" } },
    ]);

    if (!quiz.createdBy.equals(req.user._id)) {
      throw new Error("Not authorised!");
    }

    if (!quiz) {
      throw new Error("No quiz found!");
    }

    res.json({
      data: {
        submissions: quiz.submissions,
      },
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
};
module.exports.fetchAssignmentSubmissions = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    const isValidgnmentAssiId = mongoose.Types.ObjectId.isValid(assignmentId);

    if (!isValidgnmentAssiId) {
      throw new Error("No assignment found!");
    }

    //if the user that is hitting this api is not the creator of quiz, return them error

    const assignment = await Assignment.findById(assignmentId).populate([
      {
        path: "submissions",
        select: "user createdBy assignmentId submission createdAt",
        populate: { path: "user", select: "id name email picture" },
      },
      // { path: "joinedClasses", populate: { path: "quizzes" } },
    ]);
    if (!assignment) {
      throw new Error("No assignment found!");
    }

    if (!assignment.createdBy.equals(req.user._id)) {
      throw new Error("Not authorised!");
    }

    res.json({
      data: {
        submissions: assignment.submissions,
      },
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
};
module.exports.fetchUsersQuizSubmission = async (req, res) => {
  try {
    const quizId = req.query.quizId;
    const userId = req.query.userId;

    const isValidQuizId = mongoose.Types.ObjectId.isValid(quizId);

    if (!isValidQuizId) {
      throw new Error("No quiz found!");
    }

    const quizSubmission = await QuizSubmission.findOne({
      quizId,
      user: userId,
    }).populate("user", "name email");

    if (!quizSubmission) {
      throw new Error("No submission found!");
    }
    //if the user that is hitting this api is not the creator of quiz, return them error
    if (!quizSubmission.createdBy.equals(req.user._id)) {
      throw new Error("Not authorised!");
    }

    res.json({
      data: {
        submission: quizSubmission,
      },
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
};
module.exports.fetchUsersAssignmentSubmission = async (req, res) => {
  try {
    const assignmentId = req.query.assignmentId;
    const userId = req.query.userId;

    const isValidAssignmentId = mongoose.Types.ObjectId.isValid(assignmentId);

    if (!isValidAssignmentId) {
      throw new Error("No quiz found!");
    }

    const assignmentSubmission = await AssignmentSubmission.findOne({
      assignmentId,
      user: userId,
    }).populate("user", "name email");

    if (!assignmentSubmission) {
      throw new Error("No submission found!");
    }
    //if the user that is hitting this api is not the creator of quiz, return them error
    if (
      !assignmentSubmission.createdBy.equals(req.user._id) &&
      !assignmentSubmission.user.equals(req.user._id)
    ) {
      throw new Error("Not authorised!");
    }

    res.json({
      data: {
        submission: assignmentSubmission,
      },
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports.createAssignment = async (req, res) => {
  Assignment.uploadedFile(req, res, async (err) => {
    try {
      if (err) {
        console.log(err);
        throw new Error("Some error occurred");
      }
      let fileKeyInS3 = null;
      if (req.file) {
        const fileUpload = await uploadFile(req.file);
        fileKeyInS3 = fileUpload.Key;
        console.log(fileUpload);
        fs.unlinkSync(path.normalize(req.file.path));
      }
      const classId = req.body.classId;
      const { title, instructions, marks } = req.body;

      const requestedClass = await Class.findById(classId);
      if (!requestedClass) {
        throw new Error("No class found");
      }

      if (!requestedClass.createdBy.equals(req.user._id)) {
        throw new Error("Not authorised!");
      }

      const newAssignment = await Assignment.create({
        createdBy: req.user._id,
        classId,
        title,
        instructions,
        marks,
      });

      if (req.file) {
        newAssignment.file = fileKeyInS3;
        await newAssignment.save();
      }
      requestedClass.assignments.push(newAssignment);
      await requestedClass.save();

      res.json({
        data: {
          createdAssignment: newAssignment,
        },
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};

module.exports.getFileExtensionAssignment = async (req, res) => {
  const assignmentId = req.params.assignmentId;
  const isValidAssignmentId = mongoose.Types.ObjectId.isValid(assignmentId);

  if (!isValidAssignmentId) {
    throw new Error("No assignment found");
  }
  const requestedAssignment = await Assignment.findById(assignmentId);

  if (!requestedAssignment) {
    throw new Error("No assignment found");
  }
  const fileExtension = path.extname(requestedAssignment.file);

  res.json({
    data: {
      fileExtension,
    },
  });
};

module.exports.getFileExtensionAssignmentSubmission = async (req, res) => {
  let userId;

  if (req.query && req.query.userId) {
    userId = req.query.userId;
  } else userId = req.user._id;
  const assignmentId = req.params.assignmentId;

  const isValidAssignmentId = mongoose.Types.ObjectId.isValid(assignmentId);

  if (!isValidAssignmentId) {
    throw new Error("No assignment found");
  }
  const usersAssignmentSubmission = await AssignmentSubmission.findOne({
    assignmentId,
    user: userId,
  });

  if (
    !usersAssignmentSubmission.user.equals(req.user._id) &&
    !usersAssignmentSubmission.createdBy.equals(req.user._id)
  ) {
    throw new Error("Not authorised!");
  }

  if (!usersAssignmentSubmission) {
    throw new Error("No assignment found");
  }
  const fileExtension = path.extname(usersAssignmentSubmission.submission);

  res.json({
    data: {
      fileExtension,
    },
  });
};

module.exports.downloadAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    const isValidAssignmentId = mongoose.Types.ObjectId.isValid(assignmentId);

    if (!isValidAssignmentId) {
      throw new Error("No assignment found");
    }
    const requestedAssignment = await Assignment.findById(assignmentId);

    if (!requestedAssignment) {
      throw new Error("No assignment found");
    }
    const fileKeyInS3 = requestedAssignment.file;
    const readStream = downloadFile(fileKeyInS3);
    readStream.pipe(res);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
module.exports.downloadAssignmentSubmission = async (req, res) => {
  try {
    let userId;

    if (req.query && req.query.userId) {
      userId = req.query.userId;
    } else userId = req.user._id;

    const assignmentId = req.params.assignmentId;
    const isValidAssignmentId = mongoose.Types.ObjectId.isValid(assignmentId);

    if (!isValidAssignmentId) {
      throw new Error("No assignment found");
    }
    const requestedAssignment = await Assignment.findById(assignmentId);

    if (!requestedAssignment) {
      throw new Error("No assignment found");
    }
    const usersAssignmentSubmission = await AssignmentSubmission.findOne({
      assignmentId,
      user: userId,
    });

    if (
      !usersAssignmentSubmission.user.equals(req.user._id) &&
      !usersAssignmentSubmission.createdBy.equals(req.user._id)
    ) {
      throw new Error("Not authorised!");
    }

    const fileKeyInS3 = usersAssignmentSubmission.submission;
    const readStream = downloadFile(fileKeyInS3);
    readStream.pipe(res);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.uploadAssignmentSubmission = async (req, res) => {
  AssignmentSubmission.uploadedFile(req, res, async (err) => {
    try {
      if (err) {
        throw new Error("Some error occurred");
      }

      const { classId, assignmentId } = req.body;
      if (!classId) {
        throw new Error("No class found!");
      }
      const isValidClassId = mongoose.Types.ObjectId.isValid(classId);
      if (!isValidClassId) {
        throw new Error("No class found!");
      }

      const requestedClass = await Class.findById(classId);
      if (!requestedClass) {
        throw new Error("No class found");
      }

      if (requestedClass.createdBy.equals(req.user._id)) {
        throw new Error("Error, you created the assignment.");
      }

      console.log(assignmentId);
      const requestedAssignment = await Assignment.findById(assignmentId);
      if (!requestedAssignment) {
        throw new Error("No assignment found");
      }

      if (!req.file) {
        throw new Error("No submission attached!");
      }

      const fileUpload = await uploadFile(req.file);
      fileKeyInS3 = fileUpload.Key;
      fs.unlinkSync(path.normalize(req.file.path));
      const hasSubmitted = await AssignmentSubmission.findOne({
        user: req.user._id,
        assignmentId,
      });

      if (hasSubmitted) {
        throw new Error("You have already submitted the assignment!");
      }

      const newUserSubmission = await AssignmentSubmission.create({
        user: req.user._id,
        createdBy: requestedClass.createdBy,
        classId: classId,
        assignmentId,
        submission: fileKeyInS3,
      });

      requestedAssignment.submissions.push(newUserSubmission);
      await requestedAssignment.save();

      res.json({
        message: "Submission successful",
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};

module.exports.gradeAssignment = async (req, res) => {
  try {
    const { userId, assignmentId, grade } = req.body;

    const usersSubmission = await AssignmentSubmission.findOne({
      assignmentId,
      user: userId,
    });

    if (!usersSubmission.createdBy.equals(req.user._id)) {
      const error = new Error(NOT_AUTHORISED);
      error.code = 401;
      throw error;
    }

    if (!usersSubmission) {
      const error = new Error(NO_SUBMISSION_FOUND);
      error.code = 404;
      throw error;
    }
    if (usersSubmission.grade) {
      const error = new Error(ASSIGNMENT_GRADED);
      error.code = 400;
      throw error;
    }
    const requestedAssignment = await Assignment.findById(assignmentId);
    if (grade > requestedAssignment.marks) {
      const error = new Error(INVALID_GRADE);
      error.code = 400;
      throw error;
    }

    usersSubmission.grade = grade;
    await usersSubmission.save();

    res.json({
      message: "SUCCESS",
    });
  } catch (error) {
    if (error.code) res.status(error.code).send(error.message);
    else res.status(500).send(error.message);
  }
};
