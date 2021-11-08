require("dotenv").config();
const mongoose = require("mongoose");

console.log(process.env.MONGO_URI);
const connect = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(conn.connection.host);
};
connect();

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to db"));

db.once("on", () => {
  console.log("successfully connected to db!");
});
