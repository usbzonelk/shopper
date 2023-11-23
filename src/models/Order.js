const mongoose = require("mongoose");

const ordersManager = {
  orderModelGenerated: null,

  orderProperties: {
    orderNumber: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    customer: {
      userID: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      email: { type: String, required: true },
      address: { type: String, required: true },
    },
    items: [
      {
        product: {
          type: String,
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "cash_on_delivery", "bank_transfer"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
  },

  orderSchema: function (schema) {
    return new mongoose.Schema(schema);
  },

  orderModel: function (schema = this.orderProperties) {
    if (!this.orderModelGenerated) {
      this.orderModelGenerated = mongoose.model(
        "orders",
        this.orderSchema(schema)
      );
    }
    return this.orderModelGenerated;
  },

  saveNewOrder: async function (orderInfo) {
    const newOrderInfo = orderInfo;

    const orderSchema = this.orderModel();
    const latestOrder = await orderSchema
      .findOne()
      .sort({ createdAt: -1 })
      .select("orderNumber");

    if (latestOrder) {
      newOrderInfo.orderNumber = latestOrder.orderNumber + 1;
    } else {
      newOrderInfo.orderNumber = 100;
    }
    try {
      const newOrder = new orderSchema(newOrderInfo);

      const savedOrder = await newOrder.save();
      return savedOrder;
    } catch (err) {
      return err;
    }
  },
  getAllOrders: async function () {
    try {
      const orderSchema = this.orderModel();
      const allOrders = await orderSchema.find({});
      return allOrders;
    } catch (err) {
      return err;
    }
  },
  getOneOrder: async function (params) {
    const orderSchema = this.orderModel();
    const getMatchedOrder = await orderSchema.findOne(params);
    return getMatchedOrder;
  },
  getLatestOrder: async function () {
    const orderSchema = this.orderModel();
    const latestOrder = await orderSchema
      .findOne()
      .sort({ createdAt: -1 })
      .select("orderNumber");
    return latestOrder;
  },
  getManyOrders: async function (params, selection = "") {
    const orderSchema = this.orderModel();
    let getMatchedOrders = null;
    if (selection === "") {
      getMatchedOrders = await orderSchema.find(params);
    } else if (selection) {
      getMatchedOrders = await orderSchema.find(params).select(selection);
    }
    return getMatchedOrders;
  },
};

module.exports = { ordersManager };
