const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdClasses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        unique: true,
      },
    ],
    joinedClasses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        unique: true,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
