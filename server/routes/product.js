const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const validateProduct = require("../middlewares/validateProduct");
router.get("/", productController.productList);
router.post("/", validateProduct, productController.newProduct);
router
  .route("/:id")
  .put(productController.updateProduct)
  .get(productController.getOneProduct);
module.exports = router;
