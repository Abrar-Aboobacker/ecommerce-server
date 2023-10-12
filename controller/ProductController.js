const productModel = require("../models/productModel");

module.exports = {
  addProduct: async (req, res) => {
    try {
      const userId = req.userId;
      const { name, quantity, price, discount } = req.body;
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
        discount: discount,
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
};
