const userController = require("../../controllers/userController");
const GraphQLError = require("graphql").GraphQLError;

const publicResolvers = {
  Query: {
    UserLogin: async (_, args, contextValue) => {
      const { email, enteredPassword } = args;
      let isUserValid = null;
      try {
        isUserValid = await userController.userLogin(email, enteredPassword);
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      if (isUserValid.error) {
        throw new GraphQLError(isUserValid.error, {
          extensions: { code: "UNAUTHENTICATED" },
        });
      } else if (isUserValid.user) {
        return isUserValid.user;
      }
    },
    GetAccessToken: async (_, args, context) => {
      let accessToken = null;
      if (context) {
        let refreshToken = context.token.split("Bearer")[1];
        try {
          accessToken = userController.generateAccessToken(refreshToken);
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: { code: "UNAUTHENTICATED" },
          });
        }
      } else {
        throw new GraphQLError("Please enter the refresh token", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      return accessToken.user;
    },
  },
  Mutation: {
    RegisterUser: async (_, { email, password }) => {
      try {
        const tempUserCreation = await userController.createTempUser(
          email,
          password
        );
        if ("user" in tempUserCreation) {
          if (tempUserCreation.user) {
            return { success: true };
          } else {
            return { success: false };
          }
        } else {
          throw new GraphQLError("Failed to create", {
            extensions: { code: "FAILED" },
          });
        }
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "SERVER_ERROR" },
        });
      }
    },
  },
};

const userResolvers = {
  Query: {
    GetUserInfo: async (_, args, contextValue) => {
      if ("token" in contextValue && contextValue.token) {
        try {
          const email = JSON.parse(
            Buffer.from(contextValue.token.split(".")[1], "base64").toString()
          ).email;
          const userInfo = await userController.getFullUserInfo(email);
          if (userInfo) {
            return userInfo.user;
          } else {
            throw new GraphQLError("Invalid email", {
              extensions: { code: "UNAUTHENTICATED" },
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
    ChangeEmail: async (_, { newMail, password }, contextValue) => {
      if ("token" in contextValue && contextValue.token) {
        try {
          const oldEmail = JSON.parse(
            Buffer.from(contextValue.token.split(".")[1], "base64").toString()
          ).email;
          const userUpdateInfo = await userController.changeMail(
            oldEmail,
            newMail,
            password
          );
          if ("user" in userUpdateInfo) {
            if (userUpdateInfo.user) {
              return { success: true };
            } else {
              return { success: false };
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

    ChangePassword: async (_, { newPassword, oldPassword }, contextValue) => {
      if ("token" in contextValue && contextValue.token) {
        try {
          const email = JSON.parse(
            Buffer.from(contextValue.token.split(".")[1], "base64").toString()
          ).email;
          console.log(email);
          const userUpdateInfo = await userController.changePassword(
            email,
            oldPassword,
            newPassword
          );
          console.log(userUpdateInfo);
          if ("user" in userUpdateInfo) {
            if (userUpdateInfo.user) {
              return { success: true };
            } else {
              return { success: false };
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

    ChangePersonalInfo: async (
      _,
      { fullName, address, phone },
      contextValue
    ) => {
      if ("token" in contextValue && contextValue.token) {
        try {
          const email = JSON.parse(
            Buffer.from(contextValue.token.split(".")[1], "base64").toString()
          ).email;
          const userUpdateInfo = await userController.changePersonalInfo(
            email,
            fullName,
            address,
            phone
          );
          console.log(userUpdateInfo);
          if ("user" in userUpdateInfo) {
            if (userUpdateInfo.user) {
              return { success: true };
            } else {
              return { success: false };
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
  },
};

const adminResolvers = {
  Query: {
    GetUserInfo: async (_, { email }, contextValue) => {
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
    },
  },
  Mutation: {
    ChangeUserEmail: async (_, { newEmail, email }, contextValue) => {
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
    },
  },
};

module.exports = {
  publicResolvers,
  userResolvers,
  adminResolvers,
};
