const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  discription: String,
  image: Array,
});

module.exports = mongoose.model("Product", productSchema);
