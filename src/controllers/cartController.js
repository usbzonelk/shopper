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
  let userID = null;
  let userDetails;
  try {
    userDetails = await userController.getUserID(email).then((respose) => {
      if (!respose.userID) {
        return new Error((message = "Invalid Email"));
      }
    });

    const productIDs = await productController.products.getProductIDs(
      userAddedSlugs
    );

    userAddedProducts.forEach((productInfo, idx) => {
      productInfo.product.productID = productIDs.productIDs[idx];
    });
    const cartSchema = await cartManager.cartModel.bind(cartManager);
    const isCartCreated = await cartManager.getOneCart(
      { userID: userID },
      cartSchema,
      { items: 1, addedAt: 1, _id: 0 }
    );
    console.log(isCartCreated);
    if (!isCartCreated) {
      const newCart = await cartManager.createNewCart(
        userID,
        userAddedProducts,
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
  } catch (error) {
    return error.message;
  }
  return outputMsg;
};

const addItemsToCart = async (email, products) => {
  let userDetails = null;

  const cartSchema = await cartManager.cartModel.bind(cartManager);
  let addItem = null;
  const outputMsg = {};

  try {
    userDetails = await userController.getUserID(email);
    if (!userDetails) {
      return new Error((message = "Invalid Email"));
    }

    addItem = await cartManager.addProductsToCart(
      userDetails.userID,
      products,
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
