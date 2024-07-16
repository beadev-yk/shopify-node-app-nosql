const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-shopify-app", "root", "HeeraRam@12", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;