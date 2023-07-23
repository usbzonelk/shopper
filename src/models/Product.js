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
  const savedProduct = await newProduct.save();
  
  console.log(savedProduct);
};

module.exports = { saveNewProductType, saveNewProduct };
