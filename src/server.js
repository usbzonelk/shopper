const express = require("express");
const graphQLServer = require("./graphql/graphqlServer");
const cors = require("cors");
const { json } = require("body-parser");

const connectToDatabase = require("./config/database");
const app = express();

const startServer = async () => {
  await graphQLServer.server.start();

  app.use("/expressOnly", (req, res) => {
    res.send("Hello from my custom endpoint!");
  });

  app.use(
    "/gq",
    cors(),
    json(),
    graphQLServer.expressMiddleware(graphQLServer.server)
  );

  app.listen(12345, () => {
    console.log(`Server fired up!`);
  });
};
connectToDatabase();
startServer();

/* const yy = await pordC.products.saveNewProduct("dvdv", {
    title: "454",
    slug: "hash0_node_op",
    price: 34,
    discount: 34,
    instock: 34,
    description: "String",
    warrantyMonths: 10,
    type: "String",
    coverPhoto: "String",
    photos: ["String"],
    bfbfb: "444",
  });
  console.log(yy); */
/* const yy = await newProdTypeCt.removeValsFromAttributes(
    "laptops",
    "udeshXX",
    ["kkk", "pp"]
  ); */
/* const yy = await cartctrl.renderTheCart("jkb@k.kl");
  console.log(yy.cart); */
