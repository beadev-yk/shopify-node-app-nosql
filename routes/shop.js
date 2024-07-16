const express = require("express");

const {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProductDetails,
  addProductToCart,
  deleteProductFromCart,
  createOrder,
} = require("../controllers/shop");

const router = express.Router();

router.get("/");

router.get("/products");

router.get("/products/:id");

router.get("/cart");

router.post("/cart");

router.post("/cart-delete");

router.post("/create-order");

router.get("/orders");

module.exports = router;
