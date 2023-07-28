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

    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

module.exports = connectToDatabase;
