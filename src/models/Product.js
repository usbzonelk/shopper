const mongoose = require("mongoose");

const productTypesSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  slugtype: { type: String, required: true },
  fields: [
    {
      name: { type: String, required: true },
      value: { type: mongoose.Schema.Types.Mixed, required: true },
    },
  ],
});

const ProductType = mongoose.model("producttypes", productTypesSchema);

const saveNewProductType = async (adminID, typeName, newTypeProperties) => {
  const newType = new ProductType({
    adminID: adminID,
    slugtype: typeName,
    fields: newTypeProperties,
  });
  await newType.save();
};

const saveNewProduct = async (productTypeAttributes, productDetails) => {
  const newProductProperties = {
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
  };

  const additionalAttributes = productTypeAttributes.fields;
  if (additionalAttributes) {
    for (const attribute of additionalAttributes) {
      newProductProperties[attribute["name"]] = [attribute["value"]];
    }
  }

  const productSchema = new mongoose.Schema(newProductProperties);
  const Product = mongoose.model("Product", productSchema);

  const newProduct = new Product(productDetails);
  await newProduct.save();
};

module.exports = saveNewProductType;
module.exports = saveNewProduct;
