const dotenv = require("dotenv").config();

const mongoUSER = process.env.MONGOUSER;
const mongoPass = process.env.MONGOPASS;
const dbName = process.env.DBNAME;
const collectionName = process.env.COLLECTIONNAME;

let dbConnectionStatus = false;

const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect(
      `mongodb+srv://${mongoUSER}:${mongoPass}@cluster69.7tz3qnk.mongodb.net/${dbName}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      { collection: collectionName }
    );
    dbConnectionStatus = true;
    console.log("Connected to the database");
  } catch (error) {
    dbConnectionStatus = false;
    console.error("Error connecting to the database:", error.message);
  }
}

function checkDbStatus() {
  if (mongoose.connection.readyState == 1) {
    return { status: true, message: "Connected to database" };
  } else {
    return { status: false, message: "Database connection error" };
  }
}

function dbCheckMiddleware(req, res, next) {
  const dbStatus = checkDbStatus();
  if (!dbStatus.status) {
    res.status(500).send(dbStatus.message);
  } else {
    next();
  }
}

module.exports = { connectToDatabase, checkDbStatus, dbCheckMiddleware };
