const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const PurcahseGroupSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: false },
    group_name: { type: String, required: true }
});

module.exports = mongoose.model("purchasegroups", PurcahseGroupSchema);
