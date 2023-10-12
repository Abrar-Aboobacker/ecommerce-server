const productModel = require("../models/productModel");
const cartModel = require("../models/cartModel");
module.exports = {
  addProduct: async (req, res) => {
    try {
      const userId = req.userId;
      const { name, quantity, price, discription } = req.body;
      const images = req.files;
      const imagePaths = images.map((image) => {
        const imagePathWithSlash = image.path
          .replace(/\\/g, "/")
          .replace(/^public/, "");
        return imagePathWithSlash;
      });
      const product = new productModel({
        name: name,
        quantity: quantity,
        price: price,
        discription: discription,
        image: imagePaths,
        user: userId,
      });
      await product.save();
      res.status(200).send({
        message: "Product added successfully",
        success: true,
        data: product,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "something went wrong ", success: false, error });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const allProducts = await productModel.find();
      res.status(200).send({
        message: "product",
        success: true,
        data: allProducts,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error while fetching plans", success: false, error });
    }
  },
  singleProductDetails: async (req, res) => {
    try {
      id = req.params.id;
      const productDetail = await productModel.findById({ _id: id });
      if (productDetail) {
        res.status(200).send({
          success: true,
          message: "details fetched",
          data: productDetail,
        });
      } else {
        res.status(404).send({
          success: false,
          message: "error while fetching doctor details",
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ success: false, message: "internal server error" });
    }
  },
  addToCart: async (req, res) => {
    const productId = req.body.id;
    const count = req.body.count
    console.log(count);
    const product = await productModel.findById(productId);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }
    let shoppingCart = await cartModel.findOne();
    if (!shoppingCart) {
        shoppingCart = new cartModel({
            items: [{ product: productId, quantityAdded:count }],
        });
    } else {
        const cartItem = shoppingCart.items.find(
            (item) => item.product.toString() === productId
        );
        if (cartItem) {
            cartItem.quantity++;
        } else {
            shoppingCart.items.push({ product: productId, quantity: 1 });
        }
    }

    await shoppingCart.save();

    res.json({ message: "Product added to cart" });
},
getAllCart: async (req, res) => {
    try {
      const allCart = await cartModel
        .find()
        .populate({ path: 'items.product', model: 'Product' })
      res.status(200).send({
        message: "products",
        success: true,
        data: allCart,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Error while fetching cart", success: false, error });
    }
  },

};
