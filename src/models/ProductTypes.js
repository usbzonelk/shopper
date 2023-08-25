const mongoose = require("mongoose");

const productTypes = {
  productTypeGenerated: null,

  productTypeSchema: function () {
    return new mongoose.Schema({
      attributeName: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      search: { type: Boolean, default: false },
      type: { type: mongoose.Schema.Types.Mixed, required: true },
      qualitative: { type: Boolean, default: true },
      minValue: { type: Number },
      maxValue: { type: Number },
      defaultValue: { type: mongoose.Schema.Types.Mixed, default: false },
    });
  },

  productTypeModel: function (collectionName) {
    if (!collectionName) {
      return new Error((message = "Collection name is invalid"));
    }
    !this.productTypesModelGenerated
      ? (this.productTypesModelGenerated = mongoose.model(
          `type-${collectionName}`,
          this.productTypeSchema()
        ))
      : null;
    return this.productTypesModelGenerated;
  },

  saveNewProductType: async function (
    collectionName,
    productTypeData,
    schema = this.productTypeModel.bind(productTypes, collectionName)
  ) {
    try {
      const productTypeInfo = productTypeData;
      const ProductType = schema();

      const newProductType = new ProductType(productTypeInfo);

      const savedProductType = await newProductType.save();

      return savedProductType;
    } catch (e) {
      return e;
    }
  },

  getAllProductTypes: async function (
    schema = this.productTypeModel.bind(newProductTypeManager)
  ) {
    try {
      const productTypeSchema = schema();
      const allProductTypes = await productTypeSchema.find({});
      return allProductTypes;
    } catch (err) {
      return err;
    }
  },

  getOneProductType: async function (
    params,
    schema = this.productTypeModel.bind(newProductTypeManager)
  ) {
    try {
      const productTypeSchema = schema();
      const getMatchedProduct = await productTypeSchema.findOne(params);
      return getMatchedProduct;
    } catch (e) {
      return e;
    }
  },

  getManyProductTypes: async function (
    params,
    schema = this.productTypeModel.bind(newProductTypeManager)
  ) {
    try {
      const productTypeSchema = schema();
      const getMatchedProductTypes = await productTypeSchema.find(params);
      return getMatchedProductTypes;
    } catch (e) {
      return e;
    }
  },

  editOneProductType: async function (
    searchProductType,
    newProductTypeInfo,
    schema = this.productTypeModel.bind(newProductTypeManager)
  ) {
    try {
      const productTypeSchema = schema();
      const updatedProductType = await productTypeSchema.findOneAndUpdate(
        searchProductType,
        newProductTypeInfo,
        {
          new: true,
        }
      );

      return updatedProductType;
    } catch (e) {
      return e;
    }
  },
  deleteOneProductType: async function (
    params,
    schema = this.productTypeModel.bind(newProductTypeManager)
  ) {
    try {
      const productTypeSchema = schema();
      const deletedProductType = await productTypeSchema.deleteOne(params);
      return deletedProductType;
    } catch (e) {
      return e;
    }
  },

  deleteManyProductTypes: async function (
    params,
    schema = this.productTypeModel.bind(newProductTypeManager)
  ) {
    try {
      const productTypeSchema = schema();
      const deletedProductTypes = await productTypeSchema.deleteMany(params);
      return deletedProductTypes;
    } catch (e) {
      return e;
    }
  },
};

module.exports = { productTypes };
