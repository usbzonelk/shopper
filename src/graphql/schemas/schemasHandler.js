const cartSchema = require("./cartSchema");
const productSchema = require("./productSchema");
const userSchema = require("./userSchema");
const adminSchema = require("./adminSchema");
const settingsSchema = require("./settingsSchema");

const publicSchemas =
  productSchema.publicProductsTypeDef +
  userSchema.publicTypeDefs +
  adminSchema.publicTypeDef +
  settingsSchema.publicTypeDefs;

const adminSchemas =
  cartSchema.adminCartTypedefs +
  productSchema.adminProductsTypeDef +
  userSchema.adminTypeDefs +
  adminSchema.adminTypeDef;

const userSchemas =
  cartSchema.userCartTypeDefs +
  productSchema.userProductsTypeDef +
  userSchema.userTypeDefs;

module.exports = { publicSchemas, userSchemas, adminSchemas };
