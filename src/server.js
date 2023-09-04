const connectToDatabase = require("./config/database");
const carty = require("./models/Cart");
const sett = require("./controllers/settingsController");
const set1 = require("./models/Settings");
const prod = require("./models/Product");
const pordC = require("./controllers/productController").products;
const sringss = require("./utils/stringValidators");
const user = require("./controllers/userController");
const cartctrl = require("./controllers/cartController");
const newProdType = require("./models/ProductTypes").productTypes;
const newProdTypeCt =
  require("./controllers/productTypesController").productTypes;
const mailss = require("./utils/mail/mailer");

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
  /* const yy = await newProdTypeCt.removeValsFromAttributes(
    "laptops",
    "udeshXX",
    ["kkk", "pp"]
  ); */
  const yy = await cartctrl.generateNewCart("jkb@k.kl", [
    { product: { slug: "hash0_node_op" }, quantity: 1 },
    { product: { slug: "hash_node_op" }, quantity: 45 },
  ]);

};

uu();
