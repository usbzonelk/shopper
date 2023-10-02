const mongoose = require("mongoose");
const bcrypt = require("../utils/bcrypt");

const adminsManager = {
  generatedAdminModel: null,

  adminSchema: function () {
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

      registrationDate: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        required: true,
        trim: true,
      },
      addedBy: {
        type: String,
        required: true,
        trim: true,
      },
      accessToken: { type: String, default: "" },
      refreshToken: { type: String, default: "" },
    });
  },

  adminModel: function () {
    if (!this.generatedAdminModel) {
      this.generatedAdminModel = mongoose.model("admins", this.adminSchema());
    }
    return this.generatedAdminModel;
  },

  createNewAdmin: async function (email, password, addedBy) {
    const getMatchedAdmin = await this.adminModel().findOne({ email: addedBy });
    if (!getMatchedAdmin) {
      throw new Error((message = "Invalid admin email"));
    }
    const hashedPass = await bcrypt.hashPassword(password);

    const adminInfo = {
      email: email,
      password: hashedPass.pass,
      registrationDate: new Date(),
      status: "unverified",
      addedBy: addedBy,
    };
    const admin = this.adminModel();

    const newAdmin = new admin(adminInfo);

    const savedAdmin = await newAdmin.save();
    return savedAdmin;
  },

  getAllAdmins: async function () {
    try {
      const adminModel = this.adminModel();
      const allAdmins = await adminModel
        .find({})
        .select([
          "email",
          "addedBy",
          "phoneNumber",
          "status",
          "registrationDate",
        ]);
      return allAdmins;
    } catch (err) {
      return err;
    }
  },

  getOneAdminInfo: async function (params) {
    const adminModel = this.adminModel();
    const getMatchedAdmin = await adminModel.findOne(params);
    return getMatchedAdmin;
  },

  getManyAdmins: async function (params) {
    const adminModel = this.adminModel();
    const getMatchedAdmins = await adminModel.find(params);
    return getMatchedAdmins;
  },

  editOneAdmin: async function (searchAdmin, newAdminInfo) {
    const adminModel = this.adminModel();
    const updatedAdmin = await adminModel.findOneAndUpdate(
      searchAdmin,
      newAdminInfo,
      {
        new: true,
      }
    );

    return updatedAdmin;
  },

  validateAdminPassword: async function (email, password) {
    const adminModel = this.adminModel();
    const getMatchedUser = await adminModel
      .findOne({ email: email })
      .select("password");
    const validity = await bcrypt.validateUser(
      password,
      getMatchedUser.password
    );
    return validity;
  },

  validateEmail: async function (email) {
    const adminModel = this.adminModel();
    const isEmailStored = await adminModel.find({ email: email });
    return !isEmailStored;
  },
};

module.exports = {
  adminsManager,
};
