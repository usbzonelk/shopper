const connectToDatabase = require("./config/database");
const carty = require("./models/Cart");

const carts = require("./controllers/cartController");
const prod = require("./models/Product");
console.log("Server fired up!");

connectToDatabase();

const uu = async () => {
  const yy = await carty.cartManager.isInTheCart("asd00@lk.lk", ["pk0y"]);
  console.log(yy);
};

uu();
