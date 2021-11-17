require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

//database connection
const db = require("./config/mongoose");

app.use(express.json());

app.use("/", require("./routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}
const PORT = process.env.PORT || 8080;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server up & running!");
  // console.log(require("dotenv").config());
});
