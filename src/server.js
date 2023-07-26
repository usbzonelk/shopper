const connectToDatabase = require("./config/database");
const Product = require("./models/Product");

console.log("Server fired up!");

connectToDatabase();

