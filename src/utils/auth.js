const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const jwtSecretKey = process.env.JWT_KEY;

const jwtGenerator = (data) => {
  return jwt.sign(data, jwtSecretKey);
};

module.exports = { jwtGenerator };
