const path = require("path");
const express = require("express");

const {
  getAddProduct,
  addNewProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct
} = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", getAddProduct);

router.get("/products", getProducts);

router.post("/add-product", addNewProduct);

router.get("/edit-product/:productId", getEditProduct);

router.post("/edit-product", postEditProduct);

router.post("/delete-product", postDeleteProduct);

module.exports = router;
