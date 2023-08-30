const ProductTypes = require("../models/ProductTypes");
const ProductTypesDB = require("../models/Product");

const productTypes = {
  saveNewAttribute: async function (productType, productTypeData) {
    const outputMsg = {};
    const productTypeName = productType;
    try {
      let productTypeExists =
        await ProductTypesDB.newProductTypeManager.getOneProductType({
          slugtype: productTypeName,
        });
      let productTypeAttributes = productTypeData;
      if (!productTypeExists) {
        console.log(productTypeExists);
        return new Error((message = "Product type doesn't exist"));
      }

      const fullSavedProduct = await ProductTypes.productTypes.saveNewAttribute(
        productType,
        productTypeAttributes
      );

      outputMsg.productType = fullSavedProduct;
      outputMsg.success = true;
      outputMsg.message = "Successfully saved the product attributes";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }

    return outputMsg;
  },
  saveNewProductType: async function (productType, adminId) {
    let savedProduct = null;

    const outputMsg = {};
    const productTypeName = productType;
    try {
      let productTypeExists =
        await ProductTypesDB.newProductTypeManager.getOneProductType({
          slugtype: productTypeName,
        });
      let productTypeAttributes = {};
      if (productTypeExists) {
        console.log(productTypeExists);
        return new Error((message = "Product type already exists"));
      }

      savedProduct =
        await ProductTypesDB.newProductTypeManager.saveNewProductType(
          adminId,
          productType
        );

      let fullSavedProduct = null;
      if (savedProduct) {
        fullSavedProduct = await ProductTypes.productTypes.saveNewAttribute(
          productType,
          productTypeAttributes
        );
      }
      outputMsg.productType = savedProduct;
      outputMsg.success = true;
      outputMsg.message = "Successfully saved new product type";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }

    return outputMsg;
  },

  getAllProductTypes: async function () {
    let allProducts = null;
    const outputMsg = {};

    try {
      allProducts =
        await ProductTypesDB.newProductTypeManager.getAllProductTypes();

      outputMsg.products = allProducts;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the product types";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }

    return outputMsg;
  },

  getAllAttributesOfaType: async function (type) {
    let allAttributes = null;
    const outputMsg = {};

    try {
      allAttributes = await ProductTypes.productTypes.getAllAttributes(type);
      outputMsg.allAttributes = allAttributes;
      outputMsg.productType = type;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the attributes";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }
    return outputMsg;
  },
};

module.exports = { productTypes };
