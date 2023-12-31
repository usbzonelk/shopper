const mongoose = require("mongoose");

const newProductTypeManager = {
  productTypesModelGenerated: null,

  productTypesSchema: function () {
    return new mongoose.Schema({
      slugtype: { type: String, required: true, unique: true, index: true },
      adminId: String,
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
    schema = this.productTypeModel.bind(newProductTypeManager)
  ) {
    try {
      const productTypeInfo = {
        adminId: adminId,
        slugtype: typeName,
      };
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

const newProductManager = {
  newProductProperties: {
    title: String,
    slug: { type: String, required: true, index: true, unique: true },
    price: Number,
    discount: Number,
    instock: Number,
    description: String,
    warrantyMonths: Number,
    coverPhoto: String,
    photos: [String],
    availability: { type: String, default: "In stock" },
    slugType: { type: String, required: true, index: true },
  },
  generatedProductModel: null,

  productSchema: function (schema) {
    const newSchema = new mongoose.Schema(schema);
    return newSchema;
  },

  productModel: function (schema = this.newProductProperties) {
    if (!this.generatedProductModel) {
      this.generatedProductModel = mongoose.model(
        "Product",
        this.productSchema(schema)
      );
    }
    return this.generatedProductModel;
  },

  saveNewProduct: async function (
    productTypeAttributes,
    productDetails,
    schema = this.productModel.bind(newProductManager)
  ) {
    try {
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
      const Product = schema(newProductProperties);

      const newProduct = new Product(productDetails);

      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (err) {
      return err;
    }
  },

  getAllProducts: async function (
    selection = null,
    schema = this.productModel.bind(newProductManager)
  ) {
    try {
      const productSchema = schema();
      let allProducts = null;
      if (!selection) {
        allProducts = await productSchema.find({});
      } else {
        allProducts = await productSchema.find({}).select(selection);
      }
      return allProducts;
    } catch (err) {
      return err;
    }
  },

  getOneProduct: async function (
    params,
    selection,
    schema = this.productModel.bind(newProductManager)
  ) {
    try {
      const productSchema = schema();
      const getMatchedProduct = await productSchema
        .findOne(params)
        .select(selection);
      return getMatchedProduct;
    } catch (e) {
      return e;
    }
  },

  getManyProducts: async function (
    params,
    selection,
    schema = this.productModel.bind(newProductManager)
  ) {
    try {
      const productSchema = schema();
      let getMatchedProducts = null;

      getMatchedProducts = await productSchema.find(params).select(selection);

      return getMatchedProducts;
    } catch (e) {
      return e;
    }
  },

  getManyProductsFromAnArray: async function (
    property,
    values = [],
    selection,
    schema = this.productModel.bind(newProductManager)
  ) {
    const query = {};
    query[property] = { $in: values };

    try {
      const productSchema = schema();
      let getMatchedProducts = null;

      getMatchedProducts = await productSchema.find(query).select(selection);

      return getMatchedProducts;
    } catch (e) {
      return e;
    }
  },

  editOneProduct: async function (
    searchProduct,
    newProductInfo,
    schema = this.productModel.bind(newProductManager)
  ) {
    try {
      const productSchema = schema();
      const updatedProduct = await productSchema.findOneAndUpdate(
        searchProduct,
        newProductInfo,
        {
          new: true,
        }
      );

      return updatedProduct;
    } catch (e) {
      return e;
    }
  },

  deleteOneProduct: async function (
    params,
    schema = this.productModel.bind(newProductManager)
  ) {
    try {
      const productSchema = schema();
      const deletedProduct = await productSchema.deleteOne(params);
      return deletedProduct;
    } catch (e) {
      return e;
    }
  },

  deleteManyProducts: async function (
    params,
    schema = this.productModel.bind(newProductManager)
  ) {
    try {
      const productSchema = schema();
      const deletedProducts = await productSchema.deleteMany(params);
      return deletedProducts;
    } catch (e) {
      return e;
    }
  },
};

module.exports = {
  newProductManager,
  newProductTypeManager,
};
