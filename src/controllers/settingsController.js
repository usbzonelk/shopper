const Settings = require("../models/Settings");
const SettingsManager = Settings.settingsManager;

const settings = {
  saveNewSetting: async function (settingName, value) {
    let savedSetting = null;
    const outputMsg = {};
    const setting = settingName;
    try {
      const isSettingThere = await SettingsManager.getOneSetting({
        setting: setting,
      });
      if (isSettingThere) {
        throw new Error((message = "Setting already exists"));
      }
      savedSetting = await SettingsManager.saveSetting(setting, value);
      outputMsg.setting = savedSetting;
      outputMsg.success = true;
      outputMsg.message = "Successfully saved the setting";
    } catch (err) {
      throw err;
    }

    return outputMsg;
  },

  getSetting: async function (settingName) {
    let savedSetting = null;
    const outputMsg = {};

    try {
      savedSetting = await SettingsManager.getOneSetting({
        setting: settingName,
      });

      if (!savedSetting) {
        throw new Error((message = "Invalid setting name"));
      }

      outputMsg.setting = savedSetting;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the setting";
    } catch (err) {
      throw err;
    }

    return outputMsg;
  },

  getAllSettings: async function () {
    let savedSettings = null;
    const outputMsg = {};

    try {
      savedSettings = await SettingsManager.getAllSettings();

      outputMsg.settings = savedSettings;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the settings";
    } catch (err) {
      throw err;
    }

    return outputMsg;
  },

  editSetting: async function (settingName, newValue) {
    let editedSettings = null;
    const outputMsg = {};

    try {
      const isSettingThere = await SettingsManager.getOneSetting({
        setting: settingName,
      });
      if (!isSettingThere) {
        throw new Error((message = "There is no such a setting"));
      }

      editedSettings = await SettingsManager.editOneSetting(
        settingName,
        newValue
      );

      outputMsg.settings = editedSettings;
      outputMsg.success = true;
      outputMsg.message = "Successfully edited the setting";
    } catch (err) {
      throw err;
    }

    return outputMsg;
  },

  deleteSetting: async function (settingName) {
    let deletedSetting = null;
    const outputMsg = {};

    try {
      const isSettingThere = await SettingsManager.getOneSetting({
        setting: settingName,
      });
      if (!isSettingThere) {
        throw new Error((message = "There is no such a setting"));
      }

      deletedSetting = await SettingsManager.deleteOneSetting({
        setting: settingName,
      });

      outputMsg.deleted = deletedSetting;
      outputMsg.success = true;
      outputMsg.message = "Successfully deleted the setting";
    } catch (err) {
      throw err;
    }

    return outputMsg;
  },
};

module.exports = { settings };
