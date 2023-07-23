const connectToDatabase = require("./config/database");
const Product = require("./models/Product");

console.log("Server fired up!");

connectToDatabase();
Product.saveNewProduct("", {
  title: "String",
  slug: "String",
  price: 1,
  discount: 1,
  instock: 1,
  description: "String",
  warrantyMonths: 1,
  type: "String",
  coverPhoto: "String",
  photos: ["String"],
});
