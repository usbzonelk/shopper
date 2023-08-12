const connectToDatabase = require("./config/database");
const carty = require("./models/Cart");
const carts = require("./controllers/cartController");
const prod = require("./models/Product");
console.log("Server fired up!");

connectToDatabase();

const uu = async () => {
  const yy = await prod.newProductManager.saveNewProduct(
    [{ name: "asd", value: "String" }],
    {
      title: "454",
      slug: "656565kk",
      price: 34,
      discount: 34,
      instock: 34,
      description: "String",
      warrantyMonths: 4,
      type: "String",
      coverPhoto: "String",
      photos: ["String"],
      asd: "444",
    }
  );
  console.log(yy);
};

uu();
