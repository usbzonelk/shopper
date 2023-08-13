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

  getAllProductsSummery: async function () {
    let productInfo = null;
    const outputMsg = {};

    try {
      productInfo = await productManager.getAllProducts(
        (selection = {
          title: 1,
          slug: 1,
          price: 1,
          discount: 1,
          instock: 1,
          type: 1,
          coverPhoto: 1,
        })
      );

      outputMsg.products = productInfo;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the products";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
      return outputMsg;
    }

    return outputMsg;
  },

  slugCheck: async function (slug) {
    let productInfo = null;
    const outputMsg = {};

    try {
      productInfo = await productManager.getOneProduct({ slug: slug });

      if (!productInfo) {
        outputMsg.valid = false;
      } else {
        outputMsg.valid = true;
      }

      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the validity of slug.";
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
