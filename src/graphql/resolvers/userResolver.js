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
  },
};
module.exports = {
  publicResolvers,
  userResolvers,
};
