const connectToDatabase = require("./config/database");
const carty = require("./models/Cart");
const carts = require("./controllers/cartController");
const prod = require("./models/Product");
const pordC = require("./controllers/productController");
const sringss = require("./utils/stringValidators");

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

  const yy = await pordC.products.getAllProductsSummery();

  /*   const yy = await prod.newProductManager.getAllProducts();
   */ console.log(yy);
};

uu();
