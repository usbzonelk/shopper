const connectToDatabase = require("./config/database");
const carty = require("./models/Cart");

const carts = require("./controllers/cartController");
const prod = require("./models/Product");
console.log("Server fired up!");

connectToDatabase();

const uu = async () => {
  const yy = await carty.cartManager.addProductsToCart("asd00@lk.lk", [
    {
      product: {
        slug: "44",
        title: "444",
        photo: "",
      },
      quantity: 99,
    },
    {
      product: {
        slug: "asw",
        title: "dad4",
        photo: "",
      },
      quantity: 12,
    },
  ]);
  console.log(yy);
};

uu();
