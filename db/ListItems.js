const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    item_id: { type: Number, required: true },
    name: { type: String, required: true },
    image_url: { type: String, required: true, unique: true },
    n_url: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("items", listSchema);
