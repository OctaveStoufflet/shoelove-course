const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  label: { type: Array }
});

const tagModel = mongoose.model("tag", tagSchema);
module.exports = tagModel;
