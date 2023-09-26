const cartController = require("../../controllers/cartController");
const GraphQLError = require("graphql").GraphQLError;

const userResolvers = {
  Query: {
    GetFullCart: async (_, args, context) => {
      const token = context.token;
      if (token) {
        const email = JSON.parse(
          Buffer.from(token.split(".")[1], "base64").toString()
        ).email;
        const fullCart = await cartController.renderTheCart(email);
        return fullCart.cart;
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
        try {
          await cartController.addItemsToCart(email, cartItems);
          const cartInfo = await cartController.renderTheCart(email);
          console.log(cartInfo.cart);
          return { items: cartInfo.cart };
        } catch (err) {
          throw new GraphQLError(err.message, {
            extensions: { code: "SERVER_ERROR" },
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
  userResolvers,
};
