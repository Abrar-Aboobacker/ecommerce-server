const express = require("express");
const { handleUpload } = require("../middleware/multer");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  singleProductDetails,
  addToCart,
  getAllCart
} = require("../controller/ProductController");

router.post("/addProduct", handleUpload("file"), addProduct);
router.get("/getAllProduct", getAllProducts);
router.get('/singleProductDetails/:id',singleProductDetails)
router.post('/addToCart',addToCart)
router.get('/getAllCart',getAllCart)
module.exports = router;
