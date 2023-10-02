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
    /*  GetUserInfo: async (_, { email }, contextValue) => {
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

          const userInfo = await userController.getFullUserInfo(email);
          if (userInfo) {
            return userInfo.user;
          } else {
            throw new GraphQLError("Invalid user email", {
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
    GetAllUsers: async (_, args, contextValue) => {
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
          const usersInfo = await userController.getAllUsers();
          if (usersInfo) {
            return usersInfo.users;
          } else {
            throw new GraphQLError("No users found", {
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
    }, */
  },
  Mutation: {
    /* ChangeUserEmail: async (_, { newEmail, email }, contextValue) => {
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
          const adminEmail = tokenInfo.email;
          const userUpdateInfo = await userController.changeMailAdmin(
            email,
            newEmail,
            adminEmail
          );
          if ("user" in userUpdateInfo) {
            if (userUpdateInfo.user) {
              return true;
            } else {
              return false;
            }
          } else {
            throw new GraphQLError("Failed to update", {
              extensions: { code: "FAILED" },
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

    ChangeUserPassword: async (_, { newPassword, email }, contextValue) => {
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
          const adminEmail = tokenInfo.email;
          const userUpdateInfo = await userController.changePasswordAdmin(
            email,
            newPassword,
            adminEmail
          );
          if ("user" in userUpdateInfo) {
            if (userUpdateInfo.user) {
              return true;
            } else {
              return false;
            }
          } else {
            throw new GraphQLError("Failed to update", {
              extensions: { code: "FAILED" },
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

    ActivateUser: async (_, { email }, contextValue) => {
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
          const adminEmail = tokenInfo.email;

          const userUpdateInfo = userController.activateUserAdmin(
            email,
            adminEmail
          );

          if ("user" in userUpdateInfo) {
            if (userUpdateInfo.user) {
              return true;
            } else {
              return false;
            }
          } else {
            throw new GraphQLError("Failed to update", {
              extensions: { code: "FAILED" },
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

    DeactivateUser: async (_, { email }, contextValue) => {
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
          const adminEmail = tokenInfo.email;

          const userUpdateInfo = userController.deactivateUserAdmin(
            email,
            adminEmail
          );

          if ("user" in userUpdateInfo) {
            if (userUpdateInfo.user) {
              return true;
            } else {
              return false;
            }
          } else {
            throw new GraphQLError("Failed to update", {
              extensions: { code: "FAILED" },
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
    }, */
  },
};

module.exports = {
  publicResolvers,
  adminResolvers,
};
