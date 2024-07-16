const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const { Error404 } = require("./controllers/error");
const mongoConnect = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(Error404);

mongoConnect((client) => {
  
  app.listen(3000, () => console.log(`server running on 3000`));
});

