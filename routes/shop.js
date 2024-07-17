const express = require("express");

const {
  getProducts,
  getIndex,
  getCart,
  getOrders,
  getProductDetails,
  addProductToCart,
  deleteProductFromCart,
  createOrder,
} = require("../controllers/shop");

const router = express.Router();

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/products/:id", getProductDetails);

router.get("/cart", getCart);

router.post("/cart", addProductToCart);

router.post("/cart-delete", deleteProductFromCart);

router.post("/create-order", createOrder);

router.get("/orders", getOrders);

module.exports = router;
