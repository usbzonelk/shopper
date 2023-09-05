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
  let userID;
  products.forEach((productInfo) => {
    userAddedSlugs.push(productInfo.product.slug);
  });

  let userDetails;

  try {
    userDetails = await userController.getUserID(email);
    if (!userDetails.userID) {
      if (userDetails.error) {
        return userDetails.error;
      }
      return new Error((message = "Invalid Email"));
    } else {
      userID = userDetails.userID;
    }
    const cartSchema = await cartManager.cartModel.bind(cartManager);

    const productIDs = await productController.products.getProductIDs(
      userAddedSlugs
    );

    userAddedProducts.forEach((productInfo, idx) => {
      if (!productIDs.productIDs[idx]) {
        return new Error((message = "Invalid slug!"));
      }
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
  const userAddedSlugs = [];
  let userID;

  removedProducts.forEach((productInfo) => {
    userAddedSlugs.push(productInfo);
  });

  let userDetails;
  const cartSchema = await cartManager.cartModel.bind(cartManager);
  let removedItem;
  const outputMsg = {};

  try {
    userDetails = await userController.getUserID(email);
    if (!userDetails.userID) {
      if (userDetails.error) {
        return userDetails.error;
      }
      return new Error((message = "Invalid Email"));
    } else {
      userID = userDetails.userID;
    }

    const productIDsToBeRemoved =
      await productController.products.getProductIDs(userAddedSlugs);

    if (!productIDsToBeRemoved.productIDs) {
      if (productIDsToBeRemoved.error) {
        return productIDsToBeRemoved.error;
      }
    }

    removedItem = await cartManager.removeItemsFromCart(
      userDetails.userID,
      productIDsToBeRemoved.productIDs,
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

  const itemsToUpdate = [];
  itemsToUpdate.push(item);

  const cartSchema = await cartManager.cartModel.bind(cartManager);
  let changedQty = null;
  const outputMsg = {};

  try {
    if (newQty < 1) {
      throw new Error((message = "Quantity must be exceeding 0!"));
    }

    userDetails = await userController.getUserID(email);
    if (!userDetails.userID) {
      if (userDetails.error) {
        return userDetails.error;
      }
      return new Error((message = "Invalid email"));
    }
    const productIDsToBeUpdated =
      await productController.products.getProductIDs(itemsToUpdate);

    if (!productIDsToBeUpdated.productIDs) {
      if (productIDsToBeUpdated.error) {
        return productIDsToBeUpdated.error;
      }
    }

    changedQty = await cartManager.changeQty(
      userDetails.userID,
      productIDsToBeUpdated.productIDs[0],
      newQty,
      cartSchema
    );

    if (changedQty.error) {
      return changedQty.error;
    }

    outputMsg.cart = changedQty;
    outputMsg.success = true;
    outputMsg.message = "Successfully updated the cart";
  } catch (err) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = err.message;
    throw err;
  }

  return outputMsg;
};

const isInTheCart = async (email, item) => {
  let userDetails = null;

  const itemsToCheck = [];
  itemsToCheck.push(item);

  const cartSchema = await cartManager.cartModel.bind(cartManager);
  let isInTheCart = null;
  const outputMsg = {};

  try {
    userDetails = await userController.getUserID(email);
    if (!userDetails.userID) {
      if (userDetails.error) {
        return userDetails.error;
      }
      return new Error((message = "Invalid email"));
    }

    const productIDsToBeChecked =
      await productController.products.getProductIDs(itemsToCheck);

    if (!productIDsToBeChecked.productIDs) {
      if (productIDsToBeChecked.error) {
        return productIDsToBeChecked.error;
      }
    }

    isInTheCart = await cartManager.isInTheCart(
      userDetails.userID,
      productIDsToBeChecked.productIDs[0],
      cartSchema
    );
    outputMsg.isInTheCart = isInTheCart;
    outputMsg.success = true;
    outputMsg.message = "Successfully checked the cart";
  } catch (err) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = err.message;
    throw err;
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
