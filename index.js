const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Userdata = require("./db/User");
const ListItems = require("./db/ListItems");
const PurchaseGroups = require("./db/PurchaseGroups");
const PurchaseList = require("./db/PurchaseList");

// const User = require("./db/User");

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
  if (req.body.name && req.body.email && req.body.password) {
    let user = await Userdata.findOne(req.body).select("-password");
    if (user) {
      res.send({ status: "0xuserexisted" });
    }
    else {
      let newUserData = new Userdata(req.body);
      let result = await newUserData.save();
      result = result.toObject();
      delete result.password;
      res.send({ status: "0xsucess" });
      console.log(result);
    }
  } else {
    res.send({ status: "0xallfield" });
  }
  res.end();
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await Userdata.findOne(req.body).select("-password");
    if (user) {
      res.send({ status: "0xsucess", userId: user._id, userName: user.name, img_url: user.img_url });
      console.log(user);
    } else {
      res.send({ status: "0xloginfailed" });
    }
  } else {
    res.send({ status: "0xallfield" });
  }
  res.end();
});

app.post("/dashboard/purcahsegroups", async (req, res) => {
  console.log("Create group api called" + ": " + req.body.user_id + ": " + req.body.group_name);
  if (req.body.user_id && req.body.group_name) {

    let newPurchaseGroupData = new PurchaseGroups(req.body);
    let result = await newPurchaseGroupData.save();

    // const newPurchaseGroupDat = await PurchaseGroups.create(req.body);
    res.send(result);
    console.log(result);
  } else {
    res.send({ status: "0xallfield" });
  }
  res.end();
});

app.post("/dashboard/purcahselist", async (req, res) => {
  console.log("Create list api called" + ": " + req.body.group_id + ": " + req.body.item_name);
  if (req.body.group_id && req.body.item_name) {

    let newPurchaseListData = new PurchaseList(req.body);
    let result = await newPurchaseListData.save();

    // const newPurchaseGroupDat = await PurchaseGroups.create(req.body);
    res.send(result);
    console.log(result);
  } else {
    res.send({ status: "0xallfield" });
  }
  res.end();
});



app.get("/dashboard/listitems", async (req, res) => {
  let itemListArray = await ListItems.find({});
  console.log(itemListArray);
  res.send(itemListArray);
  res.end();
});

app.get("/dashboard/purcahsegroups/:userid", async (req, res) => {
  let purchaseGroupArray = await PurchaseGroups.find({ user_id: req.params.userid });
  console.log(purchaseGroupArray);
  res.send(purchaseGroupArray);
  res.end();
});


app.get("/dashboard/purcahselist/:groupid", async (req, res) => {
  let purchaseListArray = await PurchaseList.find({ group_id: req.params.groupid });
  console.log(purchaseListArray);
  res.send(purchaseListArray);
  res.end();
});


app.put("/dashboard/purcahsegroups", async (req, res) => {

  let groupToUpdate = await PurchaseGroups.findById(req.body.group_id);
  console.log(groupToUpdate);
  groupToUpdate.group_name = req.body.group_name;
  result = await groupToUpdate.save();
  res.send(result);
  res.end();
});




app.put("/dashboard/purcahselist", async (req, res) => {

  let listToUpdate = await PurchaseList.findById(req.body.id);
  console.log(listToUpdate);
  listToUpdate.item_name = req.body.name;
  listToUpdate.completed = req.body.checked;
  result = await listToUpdate.save();
  res.send(result);
  res.end();
});



app.delete("/dashboard/purcahsegroups/:group_Id", async (req, res) => {


  let deletedPurcahseList = await PurchaseList.deleteMany({ group_id: req.params.group_Id });
  console.log(deletedPurcahseList);
  let deletedGroup = await PurchaseGroups.findByIdAndDelete(req.params.group_Id);
  console.log(deletedGroup);
  res.send(deletedGroup);
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
