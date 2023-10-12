const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  discount: Number,
  image: Array,
});

module.exports = mongoose.model("Product", productSchema);
