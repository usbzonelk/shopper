const settingsController =
  require("../../controllers/settingsController").settings;
const GraphQLError = require("graphql").GraphQLError;

const publicResolvers = {
  Query: {
    GetSetting: async (_, { settingName }, contextValue) => {
      try {
        const getSetting = await settingsController.getSetting(settingName);
        return getSetting.setting;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
    },
  },
};

const adminResolvers = {
  Query: {
    GetSetting: async (_, { settingName }, contextValue) => {
      if ("token" in contextValue && contextValue.token) {
        try {
          const tokenInfo = JSON.parse(
            Buffer.from(contextValue.token.split(".")[1], "base64").toString()
          );
          if (tokenInfo.role !== "admin") {
            throw new GraphQLError("Forbidden", {
              extensions: { code: "UNAUTHENTICATED" },
            });
          }

          const getSetting = await settingsController.getSetting(settingName);
          if (getSetting) {
            return getSetting.setting;
          } else {
            throw new GraphQLError("Invalid setting name", {
              extensions: { code: "NOT_FOUND" },
            });
          }
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
      } else {
        throw new GraphQLError("Invalid credentials", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
    },

    GetAllSettings: async (_, args, contextValue) => {
      if ("token" in contextValue && contextValue.token) {
        try {
          const tokenInfo = JSON.parse(
            Buffer.from(contextValue.token.split(".")[1], "base64").toString()
          );
          if (tokenInfo.role !== "admin") {
            throw new GraphQLError("Forbidden", {
              extensions: { code: "UNAUTHENTICATED" },
            });
          }

          const getAllSetting = await settingsController.getAllSettings();
          if (getAllSetting) {
            return getAllSetting.settings;
          } else {
            throw new GraphQLError("Not found settings", {
              extensions: { code: "NOT_FOUND" },
            });
          }
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
      } else {
        throw new GraphQLError("Invalid credentials", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
    },
  },
  Mutation: {
    AddSetting: async (_, { setting }, contextValue) => {
      const settingInput = setting;
      if ("token" in contextValue && contextValue.token) {
        try {
          const tokenInfo = JSON.parse(
            Buffer.from(contextValue.token.split(".")[1], "base64").toString()
          );
          if (tokenInfo.role !== "admin") {
            throw new GraphQLError("Forbidden", {
              extensions: { code: "UNAUTHENTICATED" },
            });
          }

          const addSetting = await settingsController.saveNewSetting(
            settingInput.setting,
            settingInput.value
          );
          if (addSetting) {
            return addSetting.setting;
          } else {
            throw new GraphQLError("Couldn't save the setting", {
              extensions: { code: "NOT_FOUND" },
            });
          }
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
      } else {
        throw new GraphQLError("Invalid credentials", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
    },

    editSetting: async (_, { settingName, newSetting }, contextValue) => {
      if ("token" in contextValue && contextValue.token) {
        try {
          const tokenInfo = JSON.parse(
            Buffer.from(contextValue.token.split(".")[1], "base64").toString()
          );
          if (tokenInfo.role !== "admin") {
            throw new GraphQLError("Forbidden", {
              extensions: { code: "UNAUTHENTICATED" },
            });
          }

          const updatedSetting = await settingsController.editSetting(
            settingName,
            newSetting
          );
          if (updatedSetting) {
            return updatedSetting.settings;
          } else {
            throw new GraphQLError("Couldn't save the setting", {
              extensions: { code: "NOT_FOUND" },
            });
          }
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
      } else {
        throw new GraphQLError("Invalid credentials", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
    },
  },
};

module.exports = {
  publicResolvers,
  adminResolvers,
};
