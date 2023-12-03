const Order = require("../models/Order");
const orderManager = Order.ordersManager;
const userController = require("./userController");
const productController = require("./productController");
const cartController = require("./cartController");
const { errorMonitor } = require("ws");

const checkoutUserCart = async (email) => {
  const outputMsg = {};
  let userCart;
  let userID;
  let cartQts = [];
  try {
    let loadUserCart = await cartController.renderTheCart(email);

    if (!loadUserCart.userID) {
      if (loadUserCart.error) {
        throw loadUserCart.error;
      }
      throw new Error((message = "Invalid Cart"));
    } else {
      userCart = loadUserCart.cart;
      userID = loadUserCart.userID;
    }
    const cartSlugs = await cartController.getCartSlugs(email);
    userCart.forEach((item) => {
      cartQts.push(item.quantity);
    });
    const availableQtys = await productController.products.getProductQuantity(
      cartSlugs
    );

    userCart.forEach((item, idx) => {
      if (item.quantity > availableQtys[idx]) {
        throw new Error(
          (message = `Item Quantity is not available right now for ${slug}`)
        );
      }
    });

    const newOrder = await orderManager.checkoutTransaction(
      cartSlugs,
      cartQts,
      { userID: userID },
      {
        
      }
    );

    outputMsg.orders = newOrder;
    outputMsg.success = true;
    outputMsg.message = "Successfully checked out the cart";
  } catch (error) {
    throw error;
  }
  return outputMsg;
};

const getUserOrders = async (email) => {
  const outputMsg = {};
  let userID;
  try {
    let userDetails = await userController.getUserID(email);
    if (!userDetails.userID) {
      if (userDetails.error) {
        return userDetails.error;
      }
      throw new Error((message = "Invalid Email"));
    } else {
      userID = userDetails.userID;
    }
    const userOrders = await orderManager.getManyOrders({
      customer: { userID: `${userID}` },
    });

    outputMsg.orders = userOrders;
    outputMsg.success = true;
    outputMsg.message = "Successfully retrieved the orders";
  } catch (error) {
    throw error;
  }
  return outputMsg;
};

const getAllOrders = async () => {
  const outputMsg = {};
  let userID;
  try {
    const allOrders = await orderManager.getAllOrders();

    outputMsg.orders = allOrders;
    outputMsg.success = true;
    outputMsg.message = "Successfully retrieved all the orders";
  } catch (error) {
    throw error;
  }
  return outputMsg;
};

const getLatestOrder = async (email) => {
  const outputMsg = {};
  let userID;
  try {
    let userDetails = await userController.getUserID(email);
    if (!userDetails.userID) {
      if (userDetails.error) {
        return userDetails.error;
      }
      throw new Error((message = "Invalid Email"));
    } else {
      userID = userDetails.userID;
    }
    const latestOrder = await orderManager.getLatestOrder({
      customer: { userID: `${userID}` },
    });

    outputMsg.order = latestOrder;
    outputMsg.success = true;
    outputMsg.message = "Successfully retrieved the latest order";
  } catch (error) {
    throw error;
  }
  return outputMsg;
};

module.exports = {
  getUserOrders,
  getAllOrders,
  getLatestOrder,
  checkoutUserCart,
};
