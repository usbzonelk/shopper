const connectToDatabase = require("./config/database");
const carts = require("./controllers/cartController");

console.log("Server fired up!");

connectToDatabase();

const uu = async () => {
  const yy = await carts.generateNewCart("asd00@lk.lk", [
    {
      product: "45",
      quantity: 45,
    },
  ]);
  console.log(yy);
};

uu();
