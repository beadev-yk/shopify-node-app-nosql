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

router.get("/add-product");

router.get("/products");

router.post("/add-product");

router.get("/edit-product/:productId");

router.post("/edit-product");

router.post("/delete-product");

module.exports = router;
