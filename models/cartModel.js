const mongoose = require("mongoose");
const product = require('./productModel')
const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: product },
  quantityAdded: {type:Number},
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
});

const ShoppingCart = mongoose.model("ShoppingCart", cartSchema);

module.exports = ShoppingCart;
