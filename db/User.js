const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img_url: { type: String, required: false },
});

module.exports = mongoose.model("Userdatas", userSchema);
