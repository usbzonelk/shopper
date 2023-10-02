const adminController = require("../../controllers/adminController");
const GraphQLError = require("graphql").GraphQLError;

const adminResolvers = {
  Mutation: {
    CreateAdmin: async (_, { password, email }, contextValue) => {
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
          const newAdminInfo = await adminController.adminRegister(
            email,
            password,
            adminEmail
          );
          if ("admin" in newAdminInfo) {
            if (newAdminInfo.admin) {
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

    VerifyAdmin: async (_, { password, email }, contextValue) => {
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
          const newAdminInfo = await adminController.verifyAdmin(
            email,
            adminEmail
          );
          if ("admin" in newAdminInfo) {
            if (newAdminInfo.admin) {
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

const publicResolvers = {
  Query: {
    AdminLogin: async (_, args) => {
      const { email, enteredPassword } = args;
      let isAdminValid = null;
      try {
        isUserValid = await adminController.adminLogin(email, enteredPassword);
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
  },
};

module.exports = {
  publicResolvers,
  adminResolvers,
};
