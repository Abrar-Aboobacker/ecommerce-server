const express = require("express");
const { handleUpload } = require("../middleware/multer");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
} = require("../controller/ProductController");

router.post("/addProduct", handleUpload("file"), addProduct);
router.get("/getAllProduct", getAllProducts);
module.exports = router;
