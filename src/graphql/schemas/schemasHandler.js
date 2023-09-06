const cartSchema = require("./cartSchema");
const productSchema = require("./productSchema");
const userSchema = require("./userSchema");

const schemas =
  cartSchema.cartTypeDefs +
  productSchema.productsTypeDef +
  userSchema.userTypeDefs;

module.exports = { schemas };
