const Product = require("../models/Product");
const productManager = Product.newProductManager;
const productTypeManager = Product.newProductTypeManager;

const products = {
  saveNewProduct: async function (productType, productDetails) {
    savedProduct = null;
    const outputMsg = {};
    const productTypeName = productType;

    try {
      let productType = await productTypeManager.getOneProductType({
        slugtype: productTypeName,
      });
      let productTypeAttributes = null;

      if (productType) {
        productTypeAttributes = productType.fields;
      } else {
        return new Error((message = "Invalid Product type"));
      }

      savedProduct = await productManager.saveNewProduct(
        productTypeAttributes,
        productDetails
      );

      outputMsg.cart = savedProduct;
      outputMsg.success = true;
      outputMsg.message = "Successfully updated the cart";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }

    return outputMsg;
  },
};

const productTypes = {};

module.exports = { products, productTypes };
