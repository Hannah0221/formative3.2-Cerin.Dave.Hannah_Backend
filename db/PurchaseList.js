const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const PurcahseListSchema = new mongoose.Schema({
    group_id: { type: String, required: true },
    item_name: { type: String, required: true },
    item_category: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("purchaselist", PurcahseListSchema);
