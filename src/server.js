const connectToDatabase = require("./config/database");
const carty = require("./models/Cart");
const sett = require("./controllers/settingsController");
const set1 = require("./models/Settings");
const prod = require("./models/Product");
const pordC = require("./controllers/productController");
const sringss = require("./utils/stringValidators");
const user = require("./controllers/userController");
const jwt = require("./utils/auth");

console.log("Server fired up!");

connectToDatabase();

const uu = async () => {
  /* const yy = await pordC.products.saveNewProduct("dvdv", {
    title: "454",
    slug: "hash0_node_op",
    price: 34,
    discount: 34,
    instock: 34,
    description: "String",
    warrantyMonths: 10,
    type: "String",
    coverPhoto: "String",
    photos: ["String"],
    bfbfb: "444",
  });
  console.log(yy); */

  const yy = await user.userLogin("1@1.lk", "1");

  /*   const yy = await prod.newProductManager.getAllProducts();
   */ console.log(yy);
};

uu();
