const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const randomUserAPI = require("./routes/randomUser.route");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// random user api
app.use("/user", randomUserAPI);

const PORT = 5000;
app.get("/", (req, res) => {
  res.send("Server running");
});
app.all("*", (req, res) => {
  res.send("Routes not found");
});
app.listen(PORT, () => {
  console.log("Server Started Successfully");
});
