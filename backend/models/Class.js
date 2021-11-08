const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  className: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  assignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
    },
  ],
});

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
