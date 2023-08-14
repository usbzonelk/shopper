const mongoose = require("mongoose");

const settingsManager = {
  settingsModelGenerated: null,

  settingsSchema: function () {
    return new mongoose.Schema({
      setting: { type: String, required: true, index: true, unique: true },
      value: mongoose.Schema.Types.Mixed,
    });
  },

  settingsModel: function () {
    !this.settingsModelGenerated
      ? (this.settingsModelGenerated = mongoose.model(
          "settings",
          this.settingsSchema()
        ))
      : null;
    return this.settingsModelGenerated;
  },

  saveSetting: async function (
    settingName,
    value,
    schema = this.settingsModel.bind(settingsManager)
  ) {
    try {
      const Setting = schema();

      const settingSchema = new Setting({ setting: settingName, value: value });

      const savedSetting = await settingSchema.save();

      return savedSetting;
    } catch (e) {
      return e;
    }
  },

  getAllSettings: async function (
    selection = null,
    schema = this.settingsModel.bind(settingsManager)
  ) {
    try {
      const settingsSchema = schema();
      let allSettings = null;
      if (!selection) {
        allSettings = await settingsSchema.find({});
      } else {
        allSettings = await settingsSchema.find({}).select(selection);
      }
      return allSettings;
    } catch (err) {
      return err;
    }
  },

  getOneSetting: async function (
    params,
    schema = this.settingsModel.bind(settingsManager)
  ) {
    try {
      const settingsSchema = schema();
      const getMatchedSetting = await settingsSchema.findOne(params);
      return getMatchedSetting;
    } catch (e) {
      return e;
    }
  },

  getManySettings: async function (
    params,
    schema = this.settingsModel.bind(settingsManager)
  ) {
    try {
      const settingsSchema = schema();
      const getMatchedSettings = await settingsSchema.find(params);
      return getMatchedSettings;
    } catch (e) {
      return e;
    }
  },

  editOneSetting: async function (
    settingName,
    newValue,
    schema = this.settingsModel.bind(settingsManager)
  ) {
    try {
      const settingsSchema = schema();
      const updatedSetting = await settingsSchema.findOneAndUpdate(
        settingName,
        newValue,
        {
          new: true,
        }
      );

      return updatedSetting;
    } catch (e) {
      return e;
    }
  },
  deleteOneSetting: async function (
    params,
    schema = this.settingsModel.bind(settingsManager)
  ) {
    try {
      const settingsSchema = schema();
      const deletedSetting = await settingsSchema.deleteOne(params);
      return deletedSetting;
    } catch (e) {
      return e;
    }
  },

  deleteManySettings: async function (
    params,
    schema = this.settingsModel.bind(settingsManager)
  ) {
    try {
      const settingsSchema = schema();
      const deletedSetting = await settingsSchema.deleteMany(params);
      return deletedSetting;
    } catch (e) {
      return e;
    }
  },
};

module.exports = {
  settingsManager,
};
