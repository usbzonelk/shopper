const cartSchema = require("./cartSchema");
const productSchema = require("./productSchema");
const userSchema = require("./userSchema");

const publicSchemas =
  productSchema.publicProductsTypeDef + userSchema.publicTypeDefs;

const adminSchemas =
  cartSchema.adminCartTypedefs +
  productSchema.adminProductsTypeDef +
  userSchema.adminTypeDefs;

const userSchemas =
  cartSchema.userCartTypeDefs +
  productSchema.userProductsTypeDef +
  userSchema.userTypeDefs;

module.exports = { publicSchemas, userSchemas, adminSchemas };
