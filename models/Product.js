const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  ref: { type: Number, required: true },
  size: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ["men", "women", "kids"] },
  // id_tags: [{ type: Schema.Types.ObjectId, ref: "tag" }],
  image: { type: String, default: "/medias/img/shoe.png" }
});

const sneakerModele = mongoose.model("sneaker", productSchema);
module.exports = sneakerModele;
