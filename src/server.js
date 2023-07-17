const connectToDatabase = require("./config/database");

const mongoose = require("mongoose");

console.log("Server fired up!");

connectToDatabase();

