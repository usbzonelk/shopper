const connectToDatabase = require("./config/database");
const carty = require("./models/Cart");
const sett = require("./controllers/settingsController");
const set1 = require("./models/Settings");
const prod = require("./models/Product");
const pordC = require("./controllers/productController");
const sringss = require("./utils/stringValidators");
const user = require("./controllers/userController");
const cartctrl = require("./controllers/cartController");
const jwt = require("./utils/auth");
const newProdType = require("./models/ProductTypes").productTypes;
const newProdTypeCt =
  require("./controllers/productTypesController").productTypes;

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
  const yy = await newProdTypeCt.saveNewAttribute(
    "phones2",
    {
      attributeName: "brand",
      search: false,
      type: "String",
      qualitative: true,
    },
    "1"
  );
  /* ("laptops", {
    attributeName: "bran0d100",
    search: true,
    type: 'String',
    qualitative: true,
  }); */

  console.log(yy);
};
uu();
