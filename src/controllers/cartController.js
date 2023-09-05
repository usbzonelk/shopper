const Cart = require("../models/Cart");
const cartManager = Cart.cartManager;
const userController = require("./userController");
const productController = require("./productController");

const generateNewCart = async (email, products = []) => {
  const userAddedSlugs = [];
  const userAddedProducts = [...products];

  products.forEach((productInfo) => {
    userAddedSlugs.push(productInfo.product.slug);
  });

  const outputMsg = {};
  let userID;
  try {
    let userDetails = await userController.getUserID(email);

    if (!userDetails.userID) {
      if (userDetails.error) {
        return userDetails.error;
      }
      return new Error((message = "Invalid Email"));
    } else {
      userID = userDetails.userID;
    }

    const productIDs = await productController.products.getProductIDs(
      userAddedSlugs
    );

    userAddedProducts.forEach((productInfo, idx) => {
      if (!productIDs.productIDs[idx]) {
        return new Error((message = "Invalid slug!"));
      }
      productInfo.product.productID = productIDs.productIDs[idx];
    });
    const cartSchema = await cartManager.cartModel.bind(cartManager);

    const isCartCreated = await cartManager.getOneCart({ userID: userID });

    if (!isCartCreated) {
      const createdCart = await cartManager.createNewCart(
        userID,
        [],
        { _id: 0, userID: 0 },
        cartSchema
      );
    }

    const cartAdded = await cartManager.addProductsToCart(
      userID,
      userAddedProducts,
      cartSchema,
      { _id: 0, userID: 0 }
    );
    const cartInfo = await cartManager.getOneCart(
      { userID: userID },
      cartSchema,
      { _id: 0, userID: 0 }
    );
    outputMsg.cart = cartInfo;
    outputMsg.success = true;
    outputMsg.message = "Successfully retrieved the cart";
  } catch (error) {
    throw error;
  }
  return outputMsg;
};

const addItemsToCart = async (email, products) => {
  const userAddedSlugs = [];
  const userAddedProducts = [...products];
  const outputMsg = {};

  products.forEach((productInfo) => {
    userAddedSlugs.push(productInfo.product.slug);
  });

  let userDetails;

  try {
    userDetails = await userController.getUserID(email);
    if (!userDetails) {
      return new Error((message = "Invalid Email"));
    }
    const cartSchema = await cartManager.cartModel.bind(cartManager);

    const productIDs = await productController.products.getProductIDs(
      userAddedSlugs
    );

    userAddedProducts.forEach((productInfo, idx) => {
      productInfo.product.productID = productIDs.productIDs[idx];
    });
    let addItem;

    addItem = await cartManager.addProductsToCart(
      userDetails.userID,
      userAddedProducts,
      cartSchema
    );

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
  let userDetails = null;

  const cartSchema = await cartManager.cartModel.bind(cartManager);
  let removedItem = null;
  const outputMsg = {};

  try {
    userDetails = await userController.getUserID(email);

    removedItem = await cartManager.removeItemsFromCart(
      userDetails.userID,
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
  let userDetails = null;

  const cartSchema = await cartManager.cartModel.bind(cartManager);
  let changedQty = null;
  const outputMsg = {};

  try {
    userDetails = await userController.getUserID(email);
    changedQty = await cartManager.changeQty(
      userDetails.userID,
      item,
      newQty,
      cartSchema
    );
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
  let userDetails = null;

  const cartSchema = await cartManager.cartModel.bind(cartManager);
  let isInTheCart = null;
  const outputMsg = {};

  try {
    userDetails = await userController.getUserID(email);
    isInTheCart = await cartManager.isInTheCart(
      userDetails.userID,
      item,
      cartSchema
    );
    outputMsg.isInTheCart = isInTheCart;
    outputMsg.success = true;
    outputMsg.message = "Successfully checked the cart";
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
