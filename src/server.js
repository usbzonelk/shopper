const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");
const auth = require("./utils/auth");

const connectToDatabase = require("./config/database").connectToDatabase;
const checkDBConnection = require("./config/database").dbCheckMiddleware;

const { publicServer } = require("./graphql/publicServer");
const { userServer } = require("./graphql/userServer");
const { adminServer } = require("./graphql/adminServer");

const PORT = 12345;

const app = express();

app.use(auth.authyMiddleware);

app.use(checkDBConnection);

const startServer = async () => {
  await userServer.start();
  await publicServer.start();
  await adminServer.start();

  app.use(
    "/public",
    cors(),
    json(),
    expressMiddleware(publicServer, {
      context: async ({ req, res }) => ({
        token: req.headers.authorization,
      }),
    })
  );

  app.use(
    "/user",
    cors(),
    json(),
    (req, res, next) => {
      /*     try {
        const accessToken = req.headers.authorization.split("Bearer ")[1];
        const tokenValidity = auth.jwtValidator(accessToken);
        if (tokenValidity) {
          if (!tokenValidity.access) {
            throw new Error((message = "Invalid access token"));
          }
        }
      } catch (e) {
        return res.status(403).send("Unauthorized");
      }
 */
    },
    expressMiddleware(userServer, {
      context: async ({ req, res }) => ({
        token: req.headers.authorization,
      }),
    })
  );

  app.use(
    "/admin",
    cors(),
    json(),
    expressMiddleware(adminServer, {
      context: async ({ req, res }) => ({
        token: req.headers.authorization,
      }),
    })
  );

  app.use((req, res) => {
    res.status(404).send("Not Found");
  });

  app.listen(PORT, () => {
    console.log(`Server fired up on port http://127.0.12.3:${PORT}/gq !`);
  });
};

connectToDatabase();
startServer();
