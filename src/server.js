const connectToDatabase = require("./config/database");
const carts = require("./controllers/cartController");
const prod = require("./models/Product");
console.log("Server fired up!");

connectToDatabase();

const uu = async () => {
  const yy = await prod.newProductTypeManager.getAllProductTypes();
  console.log(yy[0].fields);
};

uu();
