const mongoose = require("mongoose");

const newProductTypeManager = {
  productTypesModelGenerated: null,

  productTypesSchema: function () {
    return new mongoose.Schema({
      slugtype: { type: String, required: true, unique: true },
      adminId: String,
      fields: [
        {
          name: { type: String, required: true },
          value: { type: mongoose.Schema.Types.Mixed, required: true },
        },
      ],
    });
  },

  productTypeModel: function () {
    !this.productTypesModelGenerated
      ? (this.productTypesModelGenerated = mongoose.model(
          "producttypes",
          this.productTypesSchema()
        ))
      : null;
    return this.productTypesModelGenerated;
  },

  saveNewProductType: async function (
    adminId,
    typeName,
    newTypeProperties,
    schema = this.productTypeModel.bind(newProductTypeManager)
  ) {
    const productTypeInfo = {
      adminId: adminId,
      slugtype: typeName,
      fields: newTypeProperties,
    };
    const ProductType = schema();

    const newProductType = new ProductType(productTypeInfo);

    const savedProductType = await newProductType.save();

    return savedProductType;
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
    const productTypeSchema = schema();
    const getMatchedProduct = await productTypeSchema.findOne(params);
    return getMatchedProduct;
  },

  getManyProductTypes: async function (
    params,
    schema = this.productTypeModel.bind(newProductTypeManager)
  ) {
    const productTypeSchema = schema();
    const getMatchedProductTypes = await productTypeSchema.find(params);
    return getMatchedProductTypes;
  },

  editOneProductType: async function (
    searchProductType,
    newProductTypeInfo,
    schema = this.productTypeModel.bind(newProductTypeManager)
  ) {
    const productTypeSchema = schema();
    const updatedProductType = await productTypeSchema.findOneAndUpdate(
      searchProductType,
      newProductTypeInfo,
      {
        new: true,
      }
    );

    return updatedProductType;
  },
  deleteOneProductType: async function (
    params,
    schema = this.productTypeModel.bind(newProductTypeManager)
  ) {
    const productTypeSchema = schema();
    const deletedProductType = await productTypeSchema.deleteOne(params);
    return deletedProductType;
  },

  deleteManyProductTypes: async function (
    params,
    schema = this.productTypeModel.bind(newProductTypeManager)
  ) {
    const productTypeSchema = schema();
    const deletedProductTypes = await productTypeSchema.deleteMany(params);
    return deletedProductTypes;
  },
};

const newProductManager = {
  newProductProperties: {
    title: String,
    slug: { type: String, required: true, unique: true },
    price: Number,
    discount: Number,
    instock: Number,
    description: String,
    warrantyMonths: Number,
    type: String,
    coverPhoto: String,
    photos: [String],
  },

  productSchema: function (schema) {
    return new mongoose.Schema(schema);
  },

  productModel: function (schema = this.newProductProperties) {
    return mongoose.model("Product", this.productSchema(schema));
  },

  saveNewProduct: async function (
    productTypeAttributes,
    productDetails,
    schema = this.productModel.bind(newProductManager)
  ) {
    const newProductProperties = { ...this.newProductProperties };
    const additionalAttributes = productTypeAttributes;
    if (additionalAttributes) {
      for (const attribute of additionalAttributes) {
        if (attribute["value"] == "String") {
          newProductProperties[attribute["name"]] = String;
        } else if (attribute["value"] == "Number") {
          newProductProperties[attribute["name"]] = Number;
        }
      }
    }

    const Product = schema();

    const newProduct = new Product(productDetails);

    const savedProduct = await newProduct.save();

    return savedProduct;
  },

  getAllProducts: async function (
    schema = this.productModel.bind(newProductManager)
  ) {
    try {
      const productSchema = schema();
      const allProducts = await productSchema.find({});
      return allProducts;
    } catch (err) {
      return err;
    }
  },

  getOneProduct: async function (
    params,
    schema = this.productModel.bind(newProductManager)
  ) {
    const productSchema = schema();
    const getMatchedProduct = await productSchema.findOne(params);
    return getMatchedProduct;
  },

  getManyProducts: async function (
    params,
    schema = this.productModel.bind(newProductManager)
  ) {
    const productSchema = schema();
    const getMatchedProducts = await productSchema.find(params);
    return getMatchedProducts;
  },

  editOneProduct: async function (
    searchProduct,
    newProductInfo,
    schema = this.productModel.bind(newProductManager)
  ) {
    const productSchema = schema();
    const updatedProduct = await productSchema.findOneAndUpdate(
      searchProduct,
      newProductInfo,
      {
        new: true,
      }
    );

    return updatedProduct;
  },
  deleteOneProduct: async function (
    params,
    schema = this.productModel.bind(newProductManager)
  ) {
    const productSchema = schema();
    const deletedProduct = await productSchema.deleteOne(params);
    return deletedProduct;
  },

  deleteManyProducts: async function (
    params,
    schema = this.productModel.bind(newProductManager)
  ) {
    const productSchema = schema();
    const deletedProducts = await productSchema.deleteMany(params);
    return deletedProducts;
  },
};

module.exports = {
  newProductManager,
  newProductTypeManager,
};
