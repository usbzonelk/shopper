const Cart = require("../models/Cart");
const cartManager = Cart.cartManager;

const generateNewCart = async (email, products = {}) => {
  const isCartCreated = await cartManager.getOneCart({ email: email });
  if (!isCartCreated) {
    const newCart = await cartManager.createNewCart(email, products);
    return newCart;
  } else {
    return isCartCreated;
  }
};

module.exports = { generateNewCart };
