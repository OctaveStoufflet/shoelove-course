const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String },
  ref: { type: Number },
  size: { type: Number },
  description: { type: String },
  price: { type: Number },
  category: { type: String, enum: ["men", "women", "kids"] },
  // id_tags: [{ type: Schema.Types.ObjectId, ref: "tag" }],
  image: { type: String, default: "/medias/img/shoe.png" }
});

const sneakerModele = mongoose.model("sneaker", productSchema);
module.exports = sneakerModele;
