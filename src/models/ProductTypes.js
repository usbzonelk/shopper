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

  saveNewAttribute: async function (
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

  getAllAttributes: async function (
    collectionName,
    selection,
    schema = this.productTypeModel.bind(productTypes, collectionName)
  ) {
    try {
      const productTypeSchema = schema();
      const allAttributes = await productTypeSchema.find({}).select(selection);
      return allAttributes;
    } catch (err) {
      return err;
    }
  },

  getOneAttribute: async function (
    collectionName,
    params,
    selection,
    schema = this.productTypeModel.bind(productTypes, collectionName)
  ) {
    try {
      const productTypeSchema = schema();
      const getMatchedProduct = await productTypeSchema
        .findOne(params)
        .select(selection);
      return getMatchedProduct;
    } catch (e) {
      return e;
    }
  },

  getManyAttributes: async function (
    collectionName,
    params,
    selection,
    schema = this.productTypeModel.bind(productTypes, collectionName)
  ) {
    try {
      const productTypeSchema = schema();
      const getMatchedAttributes = await productTypeSchema
        .find(params)
        .select(selection);
      return getMatchedAttributes;
    } catch (e) {
      return e;
    }
  },

  editOneAttribute: async function (
    collectionName,
    searchAttribute,
    newAttributeInfo,
    schema = this.productTypeModel.bind(productTypes, collectionName)
  ) {
    try {
      const productTypeSchema = schema();
      const updatedAttribute = await productTypeSchema.findOneAndUpdate(
        searchAttribute,
        newAttributeInfo,
        {
          new: true,
        }
      );

      return updatedAttribute;
    } catch (e) {
      return e;
    }
  },
  deleteOneAttribute: async function (
    collectionName,
    params,
    schema = this.productTypeModel.bind(productTypes, collectionName)
  ) {
    try {
      const productTypeSchema = schema();
      const deletedAttribute = await productTypeSchema.deleteOne(params);
      return deletedAttribute;
    } catch (e) {
      return e;
    }
  },

  deleteManyAttributes: async function (
    collectionName,
    params,
    schema = this.productTypeModel.bind(productTypes, collectionName)
  ) {
    try {
      const productTypeSchema = schema();
      const deletedAttributes = await productTypeSchema.deleteMany(params);
      return deletedAttributes;
    } catch (e) {
      return e;
    }
  },
};

module.exports = { productTypes };
