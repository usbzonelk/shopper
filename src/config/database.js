const mongoUSER = "bartyslr";
const mongoPass = "W4MZeyrsSEFJnilc";
const dbName = "shopper";
const collectionName = "shopperx";

const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect(
      `mongodb+srv://${mongoUSER}:${mongoPass}@cluster69.7tz3qnk.mongodb.net/${dbName}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      { collection: collectionName }
    );

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

    const laptopSchema = new mongoose.Schema({
      info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "night",
      },
    });

    const Laptop = mongoose.model("Laptop", laptopSchema);
    const Night = mongoose.model("night", productSchema);

    const proddf = new Night({
      title: "String",
      slug: "String",
      price: 1200,
      discount: 45,
      instock: 45.2,
      description: "String",
      warrantyMonths: 45,
      type: "String",
      coverPhoto: "String",
      photos: ["String"],
    });

    const laptop = new Laptop({
      info: proddf,
    });
    await proddf.save();
    await laptop.save();

    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

module.exports = connectToDatabase;
