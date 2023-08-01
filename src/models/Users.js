const mongoose = require("mongoose");
const bcrypt = require("../utils/bcrypt");

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
      status: {
        type: String,
        required: true,
        trim: true,
      },
    });
  },

  userModel: function () {
    return mongoose.model("users", this.userSchema());
  },

  createNewUser: async function (email, password, fullName, phone, address) {
    const hashedPass = await bcrypt.hashPassword(password);
    const userInfo = {
      email: email,
      password: hashedPass.pass,
      fullName: fullName,
      phoneNumber: phone,
      registrationDate: new Date(),
      address: address,
      status: "unverified",
    };
    const User = this.userModel();

    const newUser = new User(userInfo);

    const savedUser = await newUser.save();

    return savedUser;
  },

  getAllUsers: async function () {
    try {
      const userModel = this.userModel();
      const allUsers = await userModel
        .find({})
        .select([
          "email",
          "fullName",
          "phoneNumber",
          "status",
          "registrationDate",
        ]);
      return allUsers;
    } catch (err) {
      return err;
    }
  },

  getOneUserInfo: async function (params) {
    const userModel = this.userModel();
    const getMatchedUser = await userModel.findOne(params);
    return getMatchedUser;
  },

  getManyUsers: async function (params) {
    const userModel = this.userModel();
    const getMatchedUsers = await userModel.find(params);
    return getMatchedUsers;
  },

  editOneUser: async function (searchUser, newUserInfo) {
    const userModel = this.userModel();
    const updatedUser = await userModel.findOneAndUpdate(
      searchUser,
      newUserInfo,
      {
        new: true,
      }
    );

    return updatedUser;
  },

  validateUserPassword: async function (email, password) {
    const userModel = this.userModel();
    const getMatchedUser = await userModel
      .findOne({ email: email })
      .select("password");
    const validity = await bcrypt.validateUser(
      password,
      getMatchedUser.password
    );
    return validity;
  },

  validateEmail: async function (email) {
    const userModel = this.userModel();
    const isEmailStored = await userModel.find({ email: email });
    return !isEmailStored;
  },
  
};

module.exports = {
  usersManager,
};
