const Products = require("../models/products");

exports.getProducts = (req, res, next) => {
  Products.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductDetails = (req, res, next) => {
  const prodId = req.params.id;
  Products.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        prods: product,
        pageTitle: product.title,
        path: `/products`,
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Products.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((cartProducts) => {
          res.render("shop/cart", {
            pageTitle: "Your Cart",
            path: "/cart",
            products: cartProducts,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.addProductToCart = (req, res, next) => {
  const prodId = req.body.productId;
  let cartData;
  req.user
    .getCart()
    .then((cart) => {
      cartData = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let newQuantity = 1;
      if (product) {
        newQuantity = product.cartItem.quantity + 1;
        return cartData.addProduct(product, {
          through: { quantity: newQuantity },
        });
      }
      return Products.findByPk(prodId)
        .then((product) => {
          return cartData.addProduct(product, {
            through: { quantity: newQuantity },
          });
        })
        .catch((err) => console.log(err));
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.deleteProductFromCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(([product]) => {
      return product.cartItem.destroy();
    })
    .then((response) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.createOrder = (req, res, next) => {
  let cartData;
  req.user
    .getCart()
    .then((cart) => {
      cartData = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((response) => {
      return cartData.setProducts(null);
    })
    .then((response) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
  res.redirect("/orders");
};

exports.getOrders = (req, res, next) => {
  console.log(req.user);
  req.user.getOrders({include:['products']})
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};
