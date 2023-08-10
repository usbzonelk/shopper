const connectToDatabase = require("./config/database");
const carty = require("./models/Cart");

const carts = require("./controllers/cartController");
const prod = require("./models/Product");
console.log("Server fired up!");

connectToDatabase();

const uu = async () => {
  const yy = await carts.changeQty("asd00@lk.lk", "asw", 145);
  console.log(yy);
};

uu();
