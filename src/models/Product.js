const mongoose = require("mongoose");

const newProductTypeManager = {
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
    return mongoose.model("producttypes", this.productTypesSchema());
  },

  saveNewProductType: async function (adminId, typeName, newTypeProperties) {
    const productTypeInfo = {
      adminId: adminId,
      slugtype: typeName,
      fields: newTypeProperties,
    };
    const ProductType = this.productTypeModel(productTypeInfo);

    const newProductType = new ProductType(productTypeInfo);

    const savedProductType = await newProductType.save();

    return savedProductType;
  },

  getAllProductTypes: async function () {
    try {
      const productTypeSchema = this.productTypeModel();
      const allProductTypes = await productTypeSchema.find({});
      return allProductTypes;
    } catch (err) {
      return err;
    }
  },

  getOneProductType: async function (params) {
    const productTypeSchema = this.productTypeModel();
    const getMatchedProduct = await productTypeSchema.findOne(params);
    return getMatchedProduct;
  },

  getManyProductTypes: async function (params) {
    const productTypeSchema = this.productTypeModel();
    const getMatchedProductTypes = await productTypeSchema.find(params);
    return getMatchedProductTypes;
  },

  editOneProductType: async function (searchProductType, newProductTypeInfo) {
    const productTypeSchema = this.productTypeModel();
    const updatedProductType = await productTypeSchema.findOneAndUpdate(
      searchProductType,
      newProductTypeInfo,
      {
        new: true,
      }
    );

    return updatedProductType;
  },
  deleteOneProductType: async function (params) {
    const productTypeSchema = this.productTypeModel();
    const deletedProductType = await productTypeSchema.deleteOne(params);
    return deletedProductType;
  },

  deleteManyProductTypes: async function (params) {
    const productTypeSchema = this.productTypeModel();
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

  saveNewProduct: async function (productTypeAttributes, productDetails) {
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

    const Product = this.productModel(newProductProperties);

    const newProduct = new Product(productDetails);

    const savedProduct = await newProduct.save();

    return savedProduct;
  },

  getAllProducts: async function () {
    try {
      const productSchema = this.productModel();
      const allProducts = await productSchema.find({});
      return allProducts;
    } catch (err) {
      return err;
    }
  },

  getOneProduct: async function (params) {
    const productSchema = this.productModel();
    const getMatchedProduct = await productSchema.findOne(params);
    return getMatchedProduct;
  },

  getManyProducts: async function (params) {
    const productSchema = this.productModel();
    const getMatchedProducts = await productSchema.find(params);
    return getMatchedProducts;
  },

  editOneProduct: async function (searchProduct, newProductInfo) {
    const productSchema = this.productModel();
    const updatedProduct = await productSchema.findOneAndUpdate(
      searchProduct,
      newProductInfo,
      {
        new: true,
      }
    );

    return updatedProduct;
  },
  deleteOneProduct: async function (params) {
    const productSchema = this.productModel();
    const deletedProduct = await productSchema.deleteOne(params);
    return deletedProduct;
  },

  deleteManyProducts: async function (params) {
    const productSchema = this.productModel();
    const deletedProducts = await productSchema.deleteMany(params);
    return deletedProducts;
  },
};

module.exports = {
  newProductManager,
  newProductTypeManager,
};
