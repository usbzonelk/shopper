const cartSchema = require("./cartSchema");
const productSchema = require("./productSchema");
const userSchema = require("./userSchema");

const publicSchemas = productSchema.publicProductsTypeDef;

const adminSchemas =
  cartSchema.userCartTypeDefs +
  productSchema.adminProductsTypeDef +
  userSchema.adminUserTypeDefs;

const userSchemas =
  cartSchema.userCartTypeDefs +
  productSchema.userProductsTypeDef +
  userSchema.userUserTypeDefs;

module.exports = { publicSchemas, userSchemas, adminSchemas };
