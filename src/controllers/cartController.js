const Cart = require("../models/Cart");
const cartManager = Cart.cartManager;
const userController = require("./userController");

const generateNewCart = async (email, products = {}) => {
  const outputMsg = {};
  let emailValidity = false;

  try {
    emailValidity = await userController.emailValidator(email);
  } catch (error) {
    return error.message;
  }

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
    outputMsg.success = true;
    outputMsg.message = "Successfully created the cart";
    outputMsg.cart = newCart;
  } else {
    outputMsg.success = true;
    outputMsg.message = "Successfully retrieved the cart";
    outputMsg.cart = isCartCreated;
  }
  return outputMsg;
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

const isInTheCart = async (email, item) => {
  const cartSchema = await cartManager.cartModel.bind(cartManager);
  let isInTheCart = null;
  const outputMsg = {};

  try {
    isInTheCart = await cartManager.isInTheCart(email, item, cartSchema);
    outputMsg.isInTheCart = isInTheCart;
    outputMsg.success = true;
    outputMsg.message = "Successfully updated the cart";
  } catch (err) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = err.message;
  }

  return outputMsg;
};

module.exports = {
  generateNewCart,
  addItemsToCart,
  removeItems,
  changeQty,
  isInTheCart,
};
