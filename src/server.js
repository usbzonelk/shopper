const connectToDatabase = require("./config/database");
const Product = require("./models/Product");

console.log("Server fired up!");

connectToDatabase();

async function dd() {
  return await Product.newProductManager.getAllProducts();
}

console.log(dd());
