const connectToDatabase = require("./config/database");
const Product = require("./models/Product");

console.log("Server fired up!");

connectToDatabase();

async function dd() {
  return await Product.newProductManager.getAllProducts();
}

async function zz() {
  const yy = await dd();
  console.log(yy);
}

zz();
