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

      outputMsg.product = savedProduct;
      outputMsg.success = true;
      outputMsg.message = "Successfully saved the product";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }

    return outputMsg;
  },

  getFullProduct: async function (slug) {
    let productInfo = null;
    const outputMsg = {};

    try {
      productInfo = await productManager.getOneProduct({ slug: slug });

      if (!productInfo) {
        return new Error((message = "Invalid slug"));
      }

      outputMsg.product = productInfo;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the product";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
      return outputMsg;

    }

    return outputMsg;
  },
};

const productTypes = {};

module.exports = { products, productTypes };
