const mongoose = require("mongoose");

const usersManager = {
  userSchema: function () {
    return new mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
      },
      phoneNumber: {
        type: String,
        trim: true,
      },
      registrationDate: {
        type: Date,
        default: Date.now,
      },
    });
  },

  userModel: function () {
    return mongoose.model("users", this.userSchema());
  },

  createNewUser: async function (email, password, fullName, phone, address) {
    const userInfo = {
      email: email,
      password: password,
      fullName: fullName,
      phoneNumber: phone,
      registrationDate: new Date(),
      address: address,
    };
    const User = this.userModel();

    const newUser = new User(userInfo);

    const savedUser = await newUser.save();

    return savedUser;
  },

  getAllProductTypes: async function () {
    try {
      const productTypeSchema = this.productTypeModel();
      const allProductTypes = await productTypeSchema.find({});
      return allProductTypes;
    } catch (err) {
      return err;
    }
  },

  getOneProductType: async function (params) {
    const productTypeSchema = this.productTypeModel();
    const getMatchedProduct = await productTypeSchema.findOne(params);
    return getMatchedProduct;
  },

  getManyProductTypes: async function (params) {
    const productTypeSchema = this.productTypeModel();
    const getMatchedProductTypes = await productTypeSchema.find(params);
    return getMatchedProductTypes;
  },

  editOneProductType: async function (searchProductType, newProductTypeInfo) {
    const productTypeSchema = this.productTypeModel();
    const updatedProductType = await productTypeSchema.findOneAndUpdate(
      searchProductType,
      newProductTypeInfo,
      {
        new: true,
      }
    );

    return updatedProductType;
  },
  deleteOneProductType: async function (params) {
    const productTypeSchema = this.productTypeModel();
    const deletedProductType = await productTypeSchema.deleteOne(params);
    return deletedProductType;
  },

  deleteManyProductTypes: async function (params) {
    const productTypeSchema = this.productTypeModel();
    const deletedProductTypes = await productTypeSchema.deleteMany(params);
    return deletedProductTypes;
  },
};

module.exports = {
  usersManager,
};
