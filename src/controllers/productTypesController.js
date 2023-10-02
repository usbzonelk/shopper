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
        throw new Error((message = "Product type doesn't exist"));
      }

      const fullSavedProduct = await ProductTypes.productTypes.saveNewAttribute(
        productType,
        productTypeAttributes
      );

      outputMsg.productType = fullSavedProduct;
      outputMsg.success = true;
      outputMsg.message = "Successfully saved the product attributes";
    } catch (err) {
      throw err;
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
        if (productTypeExists.error) {
          throw new Error(productTypeExists.error);
        }
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

  editAttribute: async function (type, usersAttributeName, newInfo) {
    let editedAttribute = null;
    const outputMsg = {};

    try {
      editedAttribute = await ProductTypes.productTypes.editOneAttribute(
        type,
        {
          attributeName: usersAttributeName,
        },
        newInfo
      );
      outputMsg.editedAttribute = editedAttribute;
      outputMsg.productType = type;
      outputMsg.success = true;
      outputMsg.message = `Successfully edited the attribute ${usersAttributeName}`;
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }
    return outputMsg;
  },

  deleteAttribute: async function (type, usersAttributeName) {
    let deletedAttribute = null;
    const outputMsg = {};

    try {
      deletedAttribute = await ProductTypes.productTypes.deleteOneAttribute(
        type,
        {
          attributeName: usersAttributeName,
        }
      );
      outputMsg.deletedAttribute = deletedAttribute;
      outputMsg.productType = type;
      outputMsg.success = true;
      outputMsg.message = `Successfully deleted the attribute ${usersAttributeName}`;
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }
    return outputMsg;
  },

  getAllQualitativeAttributes: async function (type) {
    let serachPositiveAttributes = null;
    const outputMsg = {};

    try {
      serachPositiveAttributes =
        await ProductTypes.productTypes.getManyAttributes(
          type,
          {
            qualitative: true,
          },
          { attributeName: 1, _id: 0 }
        );
      outputMsg.attributes = serachPositiveAttributes;
      outputMsg.productType = type;
      outputMsg.success = true;
      outputMsg.message = `Successfully retrieved all qualitative attributes`;
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }
    return outputMsg;
  },

  getAllQuantitativeAttributes: async function (type) {
    let serachPositiveAttributes = null;
    const outputMsg = {};

    try {
      serachPositiveAttributes =
        await ProductTypes.productTypes.getManyAttributes(
          type,
          {
            qualitative: false,
          },
          { attributeName: 1, _id: 0 }
        );
      outputMsg.attributes = serachPositiveAttributes;
      outputMsg.productType = type;
      outputMsg.success = true;
      outputMsg.message = `Successfully retrieved all quantitative attributes`;
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }
    return outputMsg;
  },

  getAllSearchPositiveAttributes: async function (type) {
    let serachPositiveAttributes = null;
    const outputMsg = {};

    try {
      serachPositiveAttributes =
        await ProductTypes.productTypes.getManyAttributes(
          type,
          {
            search: true,
          },
          { attributeName: 1, _id: 0 }
        );
      outputMsg.attributes = serachPositiveAttributes;
      outputMsg.productType = type;
      outputMsg.success = true;
      outputMsg.message = `Successfully retrieved all search positive attributes`;
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }
    return outputMsg;
  },

  getAllSortableAttributes: async function (type) {
    let serachPositiveAttributes = null;
    const outputMsg = {};

    try {
      serachPositiveAttributes =
        await ProductTypes.productTypes.getManyAttributes(
          type,
          {
            sort: true,
          },
          { attributeName: 1, _id: 0 }
        );
      outputMsg.attributes = serachPositiveAttributes;
      outputMsg.productType = type;
      outputMsg.success = true;
      outputMsg.message = `Successfully retrieved all sortable attributes`;
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }
    return outputMsg;
  },

  getValuesOfAnAtrribute: async function (type, attributeName) {
    let attributeValues = null;
    const outputMsg = {};

    try {
      attributeValues = await ProductTypes.productTypes.getOneAttribute(
        type,
        {
          attributeName: attributeName,
        },
        { attributeName: 1, _id: 0, values: 1 }
      );
      outputMsg.attribute = attributeValues;
      outputMsg.productType = type;
      outputMsg.success = true;
      outputMsg.message = `Successfully retrieved all values of the given attribute`;
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }
    return outputMsg;
  },

  addValsToAttribute: async function (type, usersAttributeName, newVals) {
    let editedAttribute = null;
    const outputMsg = {};

    try {
      editedAttribute = await ProductTypes.productTypes.editAttributeArrays(
        type,
        usersAttributeName,
        { $addToSet: { values: { $each: newVals } } }
      );
      outputMsg.editedAttribute = editedAttribute;
      outputMsg.productType = type;
      outputMsg.success = true;
      outputMsg.message = `Successfully added new values to the attribute ${usersAttributeName}`;
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }
    return outputMsg;
  },

  removeValsFromAttributes: async function (
    type,
    usersAttributeName,
    valsToRemove
  ) {
    let editedAttribute = null;
    const outputMsg = {};

    try {
      editedAttribute = await ProductTypes.productTypes.editAttributeArrays(
        type,
        usersAttributeName,
        { $pull: { values: { $in: valsToRemove } } }
      );
      outputMsg.editedAttribute = editedAttribute;
      outputMsg.productType = type;
      outputMsg.success = true;
      outputMsg.message = `Successfully removed the values from the attribute ${usersAttributeName}`;
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }
    return outputMsg;
  },
};

module.exports = { productTypes };
