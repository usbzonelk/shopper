const connectToDatabase = require("./config/database");
const carty = require("./models/Cart");

const carts = require("./controllers/cartController");
const prod = require("./models/Product");
console.log("Server fired up!");

connectToDatabase();

const uu = async () => {
  const yy = await carts.addItemsToCart("asd00@lk.lk", [
    {
      product: {
        slug: "pky",
        title: "444",
        photo: "[]",
      },
    },
  ]);
  console.log(yy.cart.items);
};

uu();
