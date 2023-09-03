const mongoose = require("mongoose");
const bcrypt = require("../utils/bcrypt");
const md5 = require("../utils/md5").hashMD5;

const usersManager = {
  generatedUserModel: null,

  userSchema: function () {
    return new mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
      },
      password: {
        type: String,
        required: true,
      },
      fullName: {
        type: String,
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
      verificationCode: {
        type: String,
        trim: true,
      },
      accessToken: { type: String, default: "" },
      refreshToken: { type: String, default: "" },
    });
  },

  userModel: function () {
    if (!this.generatedUserModel) {
      this.generatedUserModel = mongoose.model("users", this.userSchema());
    }
    return this.generatedUserModel;
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

    const docID = savedUser._id;

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { verificationCode: md5(docID) },
      {
        new: true,
      }
    );

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

  getOneUserInfo: async function (params, selectionInput = null) {
    const userModel = this.userModel();
    let getMatchedUser = null;
    if (selectionInput) {
      getMatchedUser = await userModel.findOne(params).select("email");
    } else {
      getMatchedUser = await userModel.findOne(params);
    }
    return getMatchedUser;
  },

  getUserInfoSelected: async function (params, selection) {
    const userModel = this.userModel();
    let getMatchedUserFullInfo = await userModel
      .findOne(params)
      .select(selection);
    return getMatchedUserFullInfo;
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
