const userController = require("../../controllers/userController");
const GraphQLError = require("graphql").GraphQLError;

const publicResolvers = {
  Query: {
    UserLogin: async (_, args, contextValue) => {
      const { email, enteredPassword } = args;
      console.log(contextValue);
      let isUserValid = null;
      try {
        isUserValid = await userController.userLogin(email, enteredPassword);
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      console.log(isUserValid);

      if (isUserValid.error) {
        console.log("lll");
      } else if (isUserValid.user) {
        console.log(isUserValid);
        return isUserValid.user;
      }
    },
  },
};

module.exports = {
  publicResolvers,
};
