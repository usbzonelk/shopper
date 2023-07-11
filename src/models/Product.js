const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
});

const Product = mongoose.model("Product", productSchema);

/* productSchema.methods.speak = function speak() {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};
 */
const laptop = new Product({ name: "Laptop" });

await laptop.save();
