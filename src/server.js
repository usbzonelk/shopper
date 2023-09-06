const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");

const cartctr = require("./controllers/cartController");

const graphQLServer = require("./graphql/graphqlServer");
const connectToDatabase = require("./config/database");

const PORT = 12345;

const app = express();

const startServer = async () => {
  await graphQLServer.server.start();

  const tyyy = await cartctr.renderTheCart("jkb@k.kl");

  console.log(tyyy.cart);

  app.use("/expressOnly", (req, res) => {
    res.send("Hello from my custom endpoint!");
  });

  app.use(
    "/gq",
    cors(),
    json(),
    graphQLServer.expressMiddleware(graphQLServer.server)
  );

  app.listen(PORT, () => {
    console.log(`Server fired up on port http://127.0.12.3:${PORT}/gq !`);
  });
};
connectToDatabase();
startServer();
