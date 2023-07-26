const connectToDatabase = require("./config/database");
const Product = require("./models/Product");

console.log("Server fired up!");

connectToDatabase();

const uu = async () => {
  const yy = await Product.newProductManager.getManyProducts({
    title: "String",
    slug: "String",
  });
  console.log(yy);
};

uu();
