const cartController = require("../../controllers/cartController");

const cartResolvers = {
  Query: {
    GetFullCart: async (_, args, context) => {
      const token = context.token;
      if (token) {
        const email = JSON.parse(
          Buffer.from(token.split(".")[1], "base64").toString()
        ).email;
        return (fullCart = await cartController.renderTheCart(email));
      }
      return null;
    },
  },
};

module.exports = {
  cartResolvers,
};
