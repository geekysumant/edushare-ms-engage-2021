require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("successfully connected to db!");
  })
  .catch((e) => {
    console.log(e);
  });
