require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");

const Quiz = require("../../../models/Quiz");
const Class = require("../../../models/Class");
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
  QUIZ_CREATED,
  INTERNAL_SERVER_ERROR,
  INVALID_QUIZ_ID,
  QUIZ_ALREADY_ATTEMPTED,
  QUIZ_NOT_ALLOWED,
  NO_SUBMISSION_ATTACHED,
  SUBMISSION_ATTACHED,
} = require("../../../utils/Constants");

//  CONTROLLER: createQuiz
//  DESC.:  This controller creates an MCQ Quiz upon succesful validations
module.exports.createQuiz = async (req, res) => {
  try {
    const { classId, questions, title } = req.body;
    const user = req.user.id;

    const requestedClassByUser = await Class.findById(classId);

    //Don't allow anyone other than the creator of classroom to create the Quiz
    if (requestedClassByUser.createdBy != user) {
      const error = new Error(NOT_AUTHORISED);
      error.code = 401;
      throw error;
    }
    const createdQuiz = await Quiz.create({
      title,
      createdBy: req.user._id,
      classId,
      questions,
    });

    //Once quiz is created, also save it into the classes' quizzes array
    await requestedClassByUser.quizzes.push(createdQuiz);
    await requestedClassByUser.save();

    res.json({
      message: QUIZ_CREATED,
    });
  } catch (err) {
    if (err.code) res.status(err.code).send(err.message);
    else res.status(400).send(err.message);
  }
};

//  CONTROLLER: fetchTasks
//  DESC.:  This controller fetches all the MCQ Quizzes and Assignments in that class
module.exports.fetchTasks = async (req, res) => {
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

    if (!allAssignments) {
      const error = new Error(INVALID_CLASS_ID);
      error.code = 404;
      throw error;
    }

    //sort the tasks in descending order by their creation date
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
    } else res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};

//  CONTROLLER: fetchQuiz
//  DESC.:  This controller fetches a particular MCQ Quiz along with the students submission
//  on the same
module.exports.fetchQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const isValidQuizId = mongoose.Types.ObjectId.isValid(quizId);

    if (!isValidQuizId) {
      const error = new Error(INVALID_QUIZ_ID);
      error.code = 404;
      throw error;
    }
    //find quiz by its id
    const requestedQuiz = await Quiz.findById(quizId);
    if (!requestedQuiz) {
      const error = new Error(INVALID_QUIZ_ID);
      error.code = 404;
      throw error;
    }

    //find the students submission on this quiz
    const quizSubmissionOfUser = await QuizSubmission.findOne({
      user: req.user._id,
      quizId: quizId,
    });

    let hasSubmitted = false;
    if (quizSubmissionOfUser) {
      hasSubmitted = true;
    }

    //calculate the students score in this quiz (auto-grading)
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
    if (err.code) {
      res.status(err.code).send(err.message);
    } else res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};

//  CONTROLLER: fetchPendingQuizzes
//  DESC.:  This controller fetches all the unsubmitted MCQ quizzes by the student
module.exports.fetchPendingQuizzes = async (req, res) => {
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
      "_id title"
    );
    const allSubmissions = await QuizSubmission.find(
      {
        classId,
      },
      "quizId"
    );
    if (!allQuizzes) {
      const error = new Error(INVALID_CLASS_ID);
      err.code = 404;
      throw error;
    }

    let pendingQuizzes = [];
    allQuizzes.forEach((quiz) => {
      if (!allSubmissions.find((sub) => sub.quizId.equals(quiz._id)))
        pendingQuizzes.push(quiz);
    });
    res.json({
      data: {
        pendingQuizzes,
      },
    });
  } catch (err) {
    if (err.code) {
      res.status(error.code).send(err.message);
    } else {
      res.status(500).send(INTERNAL_SERVER_ERROR);
    }
  }
};

//  CONTROLLER: fetchPendingAssignments
//  DESC.:  This controller fetches all the unsubmitted assignments by the student
module.exports.fetchPendingAssignments = async (req, res) => {
  try {
    const classId = req.params.classId;
    const isValidClassId = mongoose.Types.ObjectId.isValid(classId);

    if (!isValidClassId) {
      const error = new Error(INVALID_CLASS_ID);
      err.code = 404;
      throw error;
    }

    const allAssignments = await Assignment.find(
      {
        classId,
      },
      "_id title"
    );
    const allSubmissions = await AssignmentSubmission.find(
      {
        classId,
      },
      "assignmentId"
    );
    if (!allAssignments) {
      const error = new Error(INVALID_CLASS_ID);
      err.code = 404;
      throw error;
    }

    let pendingAssignments = [];
    allAssignments.forEach((assignment) => {
      if (
        !allSubmissions.find((sub) => sub.assignmentId.equals(assignment._id))
      )
        pendingAssignments.push(assignment);
    });
    res.json({
      data: {
        pendingAssignments,
      },
    });
  } catch (err) {
    if (err.code) {
      res.status(error.code).send(err.message);
    } else {
      res.status(500).send(INTERNAL_SERVER_ERROR);
    }
  }
};

//  CONTROLLER: fetchAssignment
//  DESC.:  This controller fetches a particular MCQ Quiz along with the students submission
//  on the same
module.exports.fetchAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;

    const isValidAssignmentId = mongoose.Types.ObjectId.isValid(assignmentId);

    if (!isValidAssignmentId || !assignmentId) {
      const error = new Error(INVALID_ASSIGNMENT_ID);
      err.code = 404;
      throw error;
    }

    const requestedAssignment = await Assignment.findById(assignmentId);

    if (!requestedAssignment) {
      const error = new Error(INVALID_ASSIGNMENT_ID);
      err.code = 404;
      throw error;
    }

    //fetch the students submission on this assignment
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
  } catch (err) {
    if (err.code) {
      res.status(err.code).send(err.message);
    } else res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};

//  CONTROLLER: submitQuiz
//  DESC.:  This controller takes in a students submission and auto grades them according to
// the correct options set by the instructor
module.exports.submitQuiz = async (req, res) => {
  try {
    const quizId = req.body.quizId;
    const userSubmittedResponse = req.body.submission;

    const isValidQuizId = mongoose.Types.ObjectId.isValid(quizId);

    if (!isValidQuizId) {
      const error = new Error(INVALID_QUIZ_ID);
      err.code = 404;
      throw error;
    }
    const quiz = await Quiz.findById(quizId);

    //check if the quiz exists or not
    if (!quiz) {
      const error = new Error(INVALID_QUIZ_ID);
      err.code = 404;
      throw error;
    }

    //the creator of the quiz can't make a submission
    if (quiz.createdBy === req.user._id) {
      const error = new Error(QUIZ_NOT_ALLOWED);
      err.code = 400;
      throw error;
    }
    const usersSubmission = await QuizSubmission.findOne({
      user: req.user._id,
      quizId: quizId,
    });
    if (usersSubmission) {
      const error = new Error(QUIZ_ALREADY_ATTEMPTED);
      err.code = 400;
      throw error;
    }

    //all checks passed, now create a valid quiz submission
    const numberOfQuestions = quiz.questions.length;
    const submission = Array(numberOfQuestions).fill(-1);

    //auto grading of the received submission
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
    if (error.code) res.status(error.code).send(error.message);
    else res.status(500).send(INTERNAL_SERVER_ERROR);
  }
};

//  CONTROLLER: fetchQuizSubmissions
//  DESC.:  This controller fetches each student's MCQ Quiz submission for the teacher to view
module.exports.fetchQuizSubmissions = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const isValidQuizId = mongoose.Types.ObjectId.isValid(quizId);

    if (!isValidQuizId) {
      const error = new Error(INVALID_QUIZ_ID);
      error.code = 404;
      throw error;
    }

    //if the user that is hitting this api is not the creator of quiz, return them error
    const quiz = await Quiz.findById(quizId).populate([
      {
        path: "submissions",
        populate: { path: "user", select: "id name email picture" },
      },
    ]);

    if (!quiz) {
      const error = new Error(INVALID_QUIZ_ID);
      error.code = 404;
      throw error;
    }

    if (!quiz.createdBy.equals(req.user._id)) {
      const error = new Error(NOT_AUTHORISED);
      error.code = 401;
      throw error;
    }

    res.json({
      data: {
        submissions: quiz.submissions,
      },
    });
  } catch (error) {
    if (error.code) {
      res.status(error.code).send(error.message);
    } else {
      res.status(500).send(INTERNAL_SERVER_ERROR);
    }
  }
};

//  CONTROLLER: fetchAssignmentSubmissions
//  DESC.:  This controller fetches each student's Assignment submission for the teacher to view
module.exports.fetchAssignmentSubmissions = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    const isValidAssignmentId = mongoose.Types.ObjectId.isValid(assignmentId);

    if (!isValidAssignmentId) {
      const error = new Error(INVALID_ASSIGNMENT_ID);
      error.code = 404;
      throw error;
    }

    const assignment = await Assignment.findById(assignmentId).populate([
      {
        path: "submissions",
        select: "user createdBy assignmentId submission createdAt",
        populate: { path: "user", select: "id name email picture" },
      },
    ]);
    if (!assignment) {
      const error = new Error(INVALID_ASSIGNMENT_ID);
      error.code = 404;
      throw error;
    }

    //if the user that is hitting this api is not the creator of this assignment, return them error
    if (!assignment.createdBy.equals(req.user._id)) {
      const error = new Error(NOT_AUTHORISED);
      error.code = 401;
      throw error;
    }

    res.json({
      data: {
        submissions: assignment.submissions,
      },
    });
  } catch (error) {
    if (error.code) {
      res.status(error.code).send(error.message);
    } else {
      res.status(500).send(INTERNAL_SERVER_ERROR);
    }
  }
};

//  CONTROLLER: fetchUsersQuizSubmission
//  DESC.:  This controller fetches a particular student's MCQ Quiz submission for the teacher to view
module.exports.fetchUsersQuizSubmission = async (req, res) => {
  try {
    const quizId = req.query.quizId;
    const userId = req.query.userId;

    const isValidQuizId = mongoose.Types.ObjectId.isValid(quizId);

    if (!isValidQuizId) {
      const error = new Error(INVALID_QUIZ_ID);
      error.code = 404;
      throw error;
    }

    const quizSubmission = await QuizSubmission.findOne({
      quizId,
      user: userId,
    }).populate("user", "name email");

    if (!quizSubmission) {
      const error = new Error(INVALID_QUIZ_ID);
      error.code = 404;
      throw error;
    }

    //if the user that is hitting this api is not the creator of quiz, return them error
    if (!quizSubmission.createdBy.equals(req.user._id)) {
      const error = new Error(NOT_AUTHORISED);
      error.code = 401;
      throw error;
    }

    res.json({
      data: {
        submission: quizSubmission,
      },
    });
  } catch (error) {
    if (error.code) {
      res.status(error.code).send(error.message);
    } else {
      res.status(500).send(INTERNAL_SERVER_ERROR);
    }
  }
};

//  CONTROLLER: fetchUsersAssignmentSubmission
//  DESC.:  This controller fetches a particular student's Assignment submission for the teacher to view
module.exports.fetchUsersAssignmentSubmission = async (req, res) => {
  try {
    const assignmentId = req.query.assignmentId;
    const userId = req.query.userId;

    const isValidAssignmentId = mongoose.Types.ObjectId.isValid(assignmentId);

    if (!isValidAssignmentId) {
      const error = new Error(INVALID_ASSIGNMENT_ID);
      error.code = 404;
      throw error;
    }

    //find users assignment submission
    const assignmentSubmission = await AssignmentSubmission.findOne({
      assignmentId,
      user: userId,
    }).populate("user", "name email");

    if (!assignmentSubmission) {
      const error = new Error(INVALID_ASSIGNMENT_ID);
      error.code = 404;
      throw error;
    }
    //if the user that is hitting this api is not the creator of assignment or if the student is
    //trying to view other student's assignment, return them unauthorised
    if (
      !assignmentSubmission.createdBy.equals(req.user._id) &&
      !assignmentSubmission.user.equals(req.user._id)
    ) {
      const error = new Error(NOT_AUTHORISED);
      error.code = 401;
      throw error;
    }

    res.json({
      data: {
        submission: assignmentSubmission,
      },
    });
  } catch (error) {
    if (error.code) {
      res.status(error.code).send(error.message);
    } else {
      res.status(500).send(INTERNAL_SERVER_ERROR);
    }
  }
};

//  CONTROLLER: createAssignment
//  DESC.:  This controller creates a file based assignment
module.exports.createAssignment = async (req, res) => {
  Assignment.uploadedFile(req, res, async (err) => {
    try {
      if (err) {
        const error = new Error(INTERNAL_SERVER_ERROR);
        error.code = 500;
        throw error;
      }

      let fileKeyInS3 = null;

      //if the assignment has any attached file, upload it to AWS S3
      if (req.file) {
        const fileUpload = await uploadFile(req.file);
        fileKeyInS3 = fileUpload.Key;
        fs.unlinkSync(path.normalize(req.file.path));
      }

      const classId = req.body.classId;
      const { title, instructions, marks } = req.body;

      const isValidClassId = mongoose.Types.ObjectId.isValid(classId);

      if (!isValidClassId) {
        const error = new Error(INVALID_CLASS_ID);
        error.code = 404;
        throw error;
      }

      const requestedClass = await Class.findById(classId);
      if (!requestedClass) {
        const error = new Error(INVALID_CLASS_ID);
        error.code = 404;
        throw error;
      }

      if (!requestedClass.createdBy.equals(req.user._id)) {
        const error = new Error(NOT_AUTHORISED);
        error.code = 404;
        throw error;
      }

      // create the assignment & save the file key of the uploaded file in AWS S3 i
      //n the created assignment's file attribute
      const newAssignment = await Assignment.create({
        createdBy: req.user._id,
        classId,
        title,
        instructions,
        marks,
        file: fileKeyInS3,
      });

      requestedClass.assignments.push(newAssignment);
      await requestedClass.save();

      res.json({
        data: {
          createdAssignment: newAssignment,
        },
      });
    } catch (error) {
      if (error.code) {
        res.status(error.code).send(error.message);
      } else {
        res.status(500).send(INTERNAL_SERVER_ERROR);
      }
    }
  });
};

//  CONTROLLER: getFileExtensionAssignment
//  DESC.:  This controller fetches the file extension of the uploaded file in Assignment.
// This is done because in order to download a file, we need to first know its extension.
module.exports.getFileExtensionAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    const isValidAssignmentId = mongoose.Types.ObjectId.isValid(assignmentId);

    if (!isValidAssignmentId) {
      const error = new Error(INVALID_ASSIGNMENT_ID);
      error.code = 404;
      throw error;
    }
    const requestedAssignment = await Assignment.findById(assignmentId);

    if (!requestedAssignment) {
      const error = new Error(INVALID_ASSIGNMENT_ID);
      error.code = 404;
      throw error;
    }

    const fileExtension = path.extname(requestedAssignment.file);

    res.json({
      data: {
        fileExtension,
      },
    });
  } catch (error) {
    if (error.code) {
      res.status(error.code).send(error.message);
    } else {
      res.status(500).send(INTERNAL_SERVER_ERROR);
    }
  }
};

//  CONTROLLER: getFileExtensionAssignmentSubmission
//  DESC.:  This controller fetches the file extension of the uploaded file in an Assignment Submission.
// This is done in order to download a file, since we need to first know its extension.
module.exports.getFileExtensionAssignmentSubmission = async (req, res) => {
  try {
    let userId;

    if (req.query && req.query.userId) {
      userId = req.query.userId;
    } else userId = req.user._id;
    const assignmentId = req.params.assignmentId;

    const isValidAssignmentId = mongoose.Types.ObjectId.isValid(assignmentId);

    if (!isValidAssignmentId) {
      const error = new Error(INVALID_ASSIGNMENT_ID);
      error.code = 404;
      throw error;
    }
    const usersAssignmentSubmission = await AssignmentSubmission.findOne({
      assignmentId,
      user: userId,
    });

    if (!usersAssignmentSubmission) {
      const error = new Error(INVALID_ASSIGNMENT_ID);
      error.code = 404;
      throw error;
    }

    //if the user that is hitting this api is not the creator of assignment or if the student is
    //trying to fetch other student's assignment, return them unauthorised
    if (
      !usersAssignmentSubmission.user.equals(req.user._id) &&
      !usersAssignmentSubmission.createdBy.equals(req.user._id)
    ) {
      const error = new Error(NOT_AUTHORISED);
      error.code = 401;
      throw error;
    }

    const fileExtension = path.extname(usersAssignmentSubmission.submission);

    res.json({
      data: {
        fileExtension,
      },
    });
  } catch (error) {
    if (error.code) {
      res.status(error.code).send(error.message);
    } else {
      res.status(500).send(INTERNAL_SERVER_ERROR);
    }
  }
};

//  CONTROLLER: downloadAssignment
//  DESC.:  This controller allows the user to download the assignment file to their local machine from AWS S3
module.exports.downloadAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    const isValidAssignmentId = mongoose.Types.ObjectId.isValid(assignmentId);

    if (!isValidAssignmentId) {
      const error = new Error(INVALID_ASSIGNMENT_ID);
      error.code = 404;
      throw error;
    }
    const requestedAssignment = await Assignment.findById(assignmentId);

    if (!requestedAssignment) {
      const error = new Error(INVALID_ASSIGNMENT_ID);
      error.code = 404;
      throw error;
    }

    //the file key for AWS S3 is saved as the file attribute in the Assignment Schema
    const fileKeyInS3 = requestedAssignment.file;
    const readStream = downloadFile(fileKeyInS3);
    readStream.pipe(res);
  } catch (err) {
    if (error.code) {
      res.status(error.code).send(error.message);
    } else {
      res.status(500).send(INTERNAL_SERVER_ERROR);
    }
  }
};

//  CONTROLLER: downloadAssignmentSubmission
//  DESC.:  This controller allows the user to download the assignment submission
//  file made by the student to their local machine from AWS S3
module.exports.downloadAssignmentSubmission = async (req, res) => {
  try {
    let userId;

    if (req.query && req.query.userId) {
      userId = req.query.userId;
    } else userId = req.user._id;

    const assignmentId = req.params.assignmentId;
    const isValidAssignmentId = mongoose.Types.ObjectId.isValid(assignmentId);

    if (!isValidAssignmentId) {
      const error = new Error(INVALID_ASSIGNMENT_ID);
      error.code = 404;
      throw error;
    }
    const requestedAssignment = await Assignment.findById(assignmentId);

    if (!requestedAssignment) {
      const error = new Error(INVALID_ASSIGNMENT_ID);
      error.code = 404;
      throw error;
    }
    const usersAssignmentSubmission = await AssignmentSubmission.findOne({
      assignmentId,
      user: userId,
    });

    //if the user that is hitting this api is not the creator of assignment or if the student is
    //trying to fetch other student's assignment submission, return them unauthorised
    if (
      !usersAssignmentSubmission.user.equals(req.user._id) &&
      !usersAssignmentSubmission.createdBy.equals(req.user._id)
    ) {
      const error = new Error(NOT_AUTHORISED);
      error.code = 401;
      throw error;
    }

    const fileKeyInS3 = usersAssignmentSubmission.submission;
    const readStream = downloadFile(fileKeyInS3);
    readStream.pipe(res);
  } catch (error) {
    if (error.code) {
      res.status(error.code).send(error.message);
    } else {
      res.status(500).send(INTERNAL_SERVER_ERROR);
    }
  }
};

//  CONTROLLER: uploadAssignmentSubmission
//  DESC.:  This controller allows the student to upload their submission to a particular
//  assignment to AWS S3.
module.exports.uploadAssignmentSubmission = async (req, res) => {
  AssignmentSubmission.uploadedFile(req, res, async (err) => {
    try {
      if (err) {
        const error = new Error(INTERNAL_SERVER_ERROR);
        error.code = 500;
        throw error;
      }

      const { classId, assignmentId } = req.body;
      if (!classId) {
        const error = new Error(INVALID_CLASS_ID);
        error.code = 404;
        throw error;
      }
      const isValidClassId = mongoose.Types.ObjectId.isValid(classId);
      if (!isValidClassId) {
        const error = new Error(INVALID_CLASS_ID);
        error.code = 404;
        throw error;
      }

      const requestedClass = await Class.findById(classId);
      if (!requestedClass) {
        const error = new Error(INVALID_CLASS_ID);
        error.code = 404;
        throw error;
      }

      //The instructor who made the assignment cannot make a submission
      if (requestedClass.createdBy.equals(req.user._id)) {
        const error = new Error(ASSIGNMENT_NOT_ALLOWED);
        error.code = 400;
        throw error;
      }

      const requestedAssignment = await Assignment.findById(assignmentId);

      if (!requestedAssignment) {
        const error = new Error(INVALID_ASSIGNMENT_ID);
        error.code = 404;
        throw error;
      }

      if (!req.file) {
        const error = new Error(NO_SUBMISSION_ATTACHED);
        error.code = 400;
        throw error;
      }

      const hasSubmitted = await AssignmentSubmission.findOne({
        user: req.user._id,
        assignmentId,
      });

      if (hasSubmitted) {
        const error = new Error(SUBMISSION_ATTACHED);
        error.code = 400;
        throw error;
      }

      //upload the submission to AWS S3
      const fileUpload = await uploadFile(req.file);
      fileKeyInS3 = fileUpload.Key;
      fs.unlinkSync(path.normalize(req.file.path));

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
      if (error.code) {
        res.status(error.code).send(error.message);
      } else {
        res.status(500).send(INTERNAL_SERVER_ERROR);
      }
    }
  });
};

//  CONTROLLER: gradeAssignment
//  DESC.:  This controller allows the instructor to grade the assignment submission of
//  a particular student
module.exports.gradeAssignment = async (req, res) => {
  try {
    const { userId, assignmentId, grade } = req.body;

    const usersSubmission = await AssignmentSubmission.findOne({
      assignmentId,
      user: userId,
    });
    if (!usersSubmission) {
      const error = new Error(NO_SUBMISSION_FOUND);
      error.code = 404;
      throw error;
    }

    if (!usersSubmission.createdBy.equals(req.user._id)) {
      const error = new Error(NOT_AUTHORISED);
      error.code = 401;
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
    if (error.code) {
      res.status(error.code).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};
