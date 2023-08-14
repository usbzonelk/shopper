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
        return new Error((message = "Setting already exists"));
      }
      savedSetting = await SettingsManager.saveSetting(setting, value);
      outputMsg.setting = savedSetting;
      outputMsg.success = true;
      outputMsg.message = "Successfully saved the setting";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }

    return outputMsg;
  },

  getSetting: async function (settingName) {
    let savedSetting = null;
    const outputMsg = {};

    try {
      savedSetting = await SettingsManager.getOneProduct({
        setting: settingName,
      });

      if (!savedSetting) {
        return new Error((message = "Invalid slug"));
      }

      outputMsg.setting = savedSetting;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the setting";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
      return outputMsg;
    }

    return outputMsg;
  },
};

module.exports = { settings };
