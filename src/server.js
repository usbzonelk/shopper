const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");

const connectToDatabase = require("./config/database").connectToDatabase;
const checkDBConnection = require("./config/database").checkDbStatus;

const { publicServer } = require("./graphql/publicServer");

const PORT = 12345;

const app = express();

const startServer = async () => {
  await publicServer.start();

  app.use("/expressOnly", (req, res) => {
    res.send("Hello from my custom endpoint!");
  });

  app.use(
    "/public",
    cors(),
    json(),
    (req, res, next) => {
      if (!checkDBConnection().status) {
        res.send(checkDBConnection().message);
      } else {
        next();
      }
    },
    expressMiddleware(publicServer, {
      context: async ({ req, res }) => ({
        token: req.headers.authorization,
        dbConnecion: checkDBConnection(),
      }),
    })
  );

  app.listen(PORT, () => {
    console.log(`Server fired up on port http://127.0.12.3:${PORT}/gq !`);
  });
};

connectToDatabase();
startServer();
