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
  Mutation: {
    AddToCart: async (_, args, context) => {
      const cartItems = args.items;
      const token = context.token;
      if (token) {
        const email = JSON.parse(
          Buffer.from(token.split(".")[1], "base64").toString()
        ).email;
        return await cartController.addItemsToCart(email, cartItems);
      }
      return null;
    },
  },
};

module.exports = {
  cartResolvers,
};
