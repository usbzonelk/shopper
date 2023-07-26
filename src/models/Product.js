const mongoose = require("mongoose");

const productTypesSchema = new mongoose.Schema({
  slugtype: String,
  adminId: String,
  fields: [
    {
      name: { type: String, required: true },
      value: { type: mongoose.Schema.Types.Mixed, required: true },
    },
  ],
});

const ProductType = mongoose.model("producttypes", productTypesSchema);

const saveNewProductType = async (adminId, typeName, newTypeProperties) => {
  console.log({
    adminId: adminId,
    slugtype: typeName,
    fields: newTypeProperties,
  });

  const savedType = await ProductType.create({
    adminId: adminId,
    slugtype: typeName,
    fields: newTypeProperties,
  });

  console.log(savedType);
};

const newProductManager = {
  newProductProperties: {
    title: String,
    slug: String,
    price: Number,
    discount: Number,
    instock: Number,
    description: String,
    warrantyMonths: Number,
    type: String,
    coverPhoto: String,
    photos: [String],
  },

  productSchema: function () {
    return new mongoose.Schema(this.newProductProperties);
  },

  productModel: function () {
    return mongoose.model("Product", this.productSchema());
  },

  saveNewProduct: async function (productTypeAttributes, productDetails) {
    const additionalAttributes = productTypeAttributes.fields;
    if (additionalAttributes) {
      for (const attribute of additionalAttributes) {
        this.newProductProperties[attribute["name"]] = [attribute["value"]];
      }
    }

    const Product = this.productModel();

    const newProduct = new Product(productDetails);

    const savedProduct = await newProduct.save();

    console.log(savedProduct);
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

module.exports = { saveNewProductType, newProductManager };
