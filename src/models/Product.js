const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  slug: String,
  price: Float32Array,
  discount: Float32Array,
  instock: Int16Array,
  description: String,
  warrantyMonths: Int16Array,
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
