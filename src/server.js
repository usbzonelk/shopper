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