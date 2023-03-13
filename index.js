const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Userdata = require("./db/User");
const User = require("./db/User");

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send(req.body);
  res.end();
});

app.post("/register", async (req, res) => {
  let newUserData = new Userdata(req.body);
  let result = await newUserData.save();
  res.send(result);
  console.log(req.body);
  res.end();
});

app.post("/login", async (req, res) => {
  if (req.body.name && req.body.email && req.body.password) {
    let user = await Userdata.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
      console.log(user);
    } else {
      res.send({ result: "No User found" });
    }
  } else {
    res.send({ result: "Enter all field" });
  }
  res.end();
});

mongoose.connect(process.env.DB_URL).catch((error) => {
  console.log(error);
});

mongoose.connection.on("connected", () => {
  console.log("DB connected");
  app.listen(port, () => {
    console.log("server listening on http://localhost:" + port);
  });
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});
