const ProductTypes = require("../models/ProductTypes");
const ProductTypesDB = require("../models/Product");

const productTypesManager = ProductTypes.productTypes;
const productTypeDBManager = ProductTypesDB;

const productTypes = {
  saveNewAttribute: async function (productType, productTypeData, adminId) {
    let savedProduct = null;

    const outputMsg = {};
    const productTypeName = productType;
    try {
      let productTypeExists = await ProductTypesDB.newProductTypeManager.getOneProductType({
        slugtype: productTypeName,
      });
      let productTypeAttributes = productTypeData;
      if (productTypeExists) {
        return new Error((message = "Product type already exists"));
      }

      savedProduct = await ProductTypesDB.newProductTypeManager.saveNewProductType(
        adminId,
        productType
      );

      let fullSavedProduct = null;
      if (savedProduct) {
        fullSavedProduct = await productTypesManager.saveNewAttribute(
          productType,
          productTypeAttributes
        );
      }
      outputMsg.productType = fullSavedProduct;
      outputMsg.success = true;
      outputMsg.message = "Successfully saved the product";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }

    return outputMsg;
  },
};

module.exports = { productTypes };
