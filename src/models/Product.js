const mongoose = require("mongoose");

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

const Product = mongoose.model("Product", productSchema);

/* productSchema.methods.speak = function speak() {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};
 */
const laptop = new Product({ title: "Laptop" });

await laptop.save();
