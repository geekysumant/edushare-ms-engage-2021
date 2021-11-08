const express = require("express");
const app = express();

app.use(express.json());

app.use("/", require("./routes"));

app.listen(8080, (err) => {
  if (err) console.log(err);
  console.log("Server up & running!");
});
