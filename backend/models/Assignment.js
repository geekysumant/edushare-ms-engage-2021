const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const FILE_UPLOAD_PATH = path.join("/uploads/assignments");
const assignmentSchema = mongoose.Schema(
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
    instructions: {
      type: String,
    },
    marks: {
      type: Number,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssignmentSubmission",
      },
    ],
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
assignmentSchema.statics.uploadedFile = multer({ storage: storage }).single(
  "file"
);
assignmentSchema.statics.filePath = FILE_UPLOAD_PATH;

const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
