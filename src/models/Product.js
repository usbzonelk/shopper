/*
Product creation method:
 1. create new productType by giving its exclusive field values
 2. when adding new product of that product type, inject the common values 
    when adding the new product
*/

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

/////

/* productSchema.methods.speak = function speak() {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}; */

const Product = mongoose.model("Product", productSchema);

await laptopSchema.save();

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
  const productSchema = new mongoose.Schema(newProductProperties);
  const Product = mongoose.model("Product", productSchema);
  const newProduct = new Product(productDetails);
  await newProduct.save();
};

module.exports = saveNewProductType;
module.exports = saveNewProduct;
