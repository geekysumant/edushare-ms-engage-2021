const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");

const FILE_UPLOAD_PATH = path.join("/uploads/submissions");
const assignmentSubmissionSchema = mongoose.Schema(
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
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    submission: {
      type: "String",
      required: true,
    },
    grade: {
      type: Number,
    },
  },
  { timestamps: true }
);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", FILE_UPLOAD_PATH));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
assignmentSubmissionSchema.statics.uploadedFile = multer({
  storage: storage,
}).single("file");
assignmentSubmissionSchema.statics.filePath = FILE_UPLOAD_PATH;

const AssignmentSubmission = mongoose.model(
  "AssignmentSubmission",
  assignmentSubmissionSchema
);
module.exports = AssignmentSubmission;
