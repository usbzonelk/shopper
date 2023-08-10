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

const addItemsToCart = async (email, products) => {
  const cartSchema = await cartManager.cartModel.bind(cartManager);
  let addItem = null;
  const outputMsg = {};

  try {
    addItem = await cartManager.addProductsToCart(email, products, cartSchema);
    outputMsg.cart = addItem;
    outputMsg.success = true;
    outputMsg.message = "Successfully updated the cart";
  } catch (err) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = err.message;
  }

  return outputMsg;
};

const removeItems = async (email, removedProducts) => {
  const cartSchema = await cartManager.cartModel.bind(cartManager);
  let removedItem = null;
  const outputMsg = {};

  try {
    removedItem = await cartManager.removeItemsFromCart(
      email,
      removedProducts,
      cartSchema
    );
    outputMsg.cart = removedItem;
    outputMsg.success = true;
    outputMsg.message = "Successfully updated the cart";
  } catch (err) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = err.message;
  }

  return outputMsg;
};

const changeQty = async (email, item, newQty) => {
  const cartSchema = await cartManager.cartModel.bind(cartManager);
  let changedQty = null;
  const outputMsg = {};

  try {
    changedQty = await cartManager.changeQty(email, item, newQty, cartSchema);
    outputMsg.cart = changedQty;
    outputMsg.success = true;
    outputMsg.message = "Successfully updated the cart";
  } catch (err) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = err.message;
  }

  return outputMsg;
};

module.exports = { generateNewCart, addItemsToCart, removeItems, changeQty,  };
