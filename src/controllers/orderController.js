const Order = require("../models/Order");
const orderManager = Order.ordersManager;
const userController = require("./userController");
const productController = require("./productController");
const cartController = require("./cartController");

/*
todo:
    get single orders
    get all orders
    checkout and create order
    get latest order
*/

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

module.exports = { getUserOrders };
