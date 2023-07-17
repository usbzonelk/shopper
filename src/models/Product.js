const mongoose = require("mongoose");

const productTypesSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  slug: { type: String, required: true },

  fields: [
    {
      name: { type: String, required: true },
      value: { type: mongoose.Schema.Types.Mixed, required: true },
    },
  ],
});

const ProductType = mongoose.model("producttypes", productTypesSchema);

/////

const productSchema = new mongoose.Schema({
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
});

productSchema.methods.speak = function speak() {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};

const Product = mongoose.model("Product", productSchema);

await laptopSchema.save();
