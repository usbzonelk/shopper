const cartSchema = require("./cartSchema");
const productSchema = require("./productSchema");
const userSchema = require("./userSchema");

const publicSchemas =
  cartSchema.cartTypeDefs +
  productSchema.publicProductsTypeDef +
  userSchema.userTypeDefs;

const adminSchemas =
  cartSchema.cartTypeDefs +
  productSchema.adminProductsTypeDef +
  userSchema.userTypeDefs;

const userSchemas =
  cartSchema.cartTypeDefs +
  productSchema.userProductsTypeDef +
  userSchema.userTypeDefs;

module.exports = { publicSchemas, userSchemas, adminSchemas };
