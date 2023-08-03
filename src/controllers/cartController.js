const Cart = require("../models/Cart");
const cartManager = Cart.cartManager;

const generateNewCart = async (email, products = {}) => {
  const cartSchema = await cartManager.cartModel.bind(cartManager);

  const isCartCreated = await cartManager.getOneCart(
    { email: email },
    cartSchema
  );
  if (!isCartCreated) {
    const newCart = await cartManager.createNewCart(
      email,
      products,
      cartSchema
    );
    return newCart;
  } else {
    return isCartCreated;
  }
};

module.exports = { generateNewCart };
