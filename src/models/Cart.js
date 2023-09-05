const mongoose = require("mongoose");

const cartManager = {
  cartModelGenerated: null,

  cartSchema: function () {
    return new mongoose.Schema({
      userID: {
        required: true,
        index: true,
        unique: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },

      items: [
        {
          product: {
            productID: {
              required: true,
              index: true,
              type: mongoose.Schema.Types.ObjectId,
              ref: "products",
            },
            title: {
              type: String,
            },
            photo: { type: String },
            price: { type: Number },
          },
          quantity: {
            type: Number,
            default: 1,
          },
          discount: {
            type: Number,
            default: 0,
          },
        },
      ],
      addedAt: {
        type: Date,
        default: Date.now,
      },
    });
  },

  cartModel: function () {
    if (!this.cartModelGenerated) {
      this.cartModelGenerated = mongoose.model("carts", this.cartSchema());
    }
    return this.cartModelGenerated;
  },

  createNewCart: async function (
    userID,
    products,
    selection,
    schema = this.cartModel.bind(cartManager)
  ) {
    const newCartDetails = {
      userID: userID,
      items: products,
      addedAt: new Date(),
    };
    const Cart = schema();
    const savedCart = await Cart.findOneAndUpdate(
      { userID: userID },
      newCartDetails,
      {
        new: true,
        upsert: true,
      }
    ).select(selection);
    return savedCart;
  },

  getAllCarts: async function (
    schema = this.cartModel.bind(cartManager),
    selection
  ) {
    try {
      const cartSchema = schema();
      const allCarts = await cartSchema.find({}).select(selection);
      return allCarts;
    } catch (err) {
      return err;
    }
  },

  getOneCart: async function (
    params,
    schema = this.cartModel.bind(cartManager),
    selection
  ) {
    const cartSchema = schema();
    const getMatchedCart = await cartSchema.findOne(params).select(selection);
    return getMatchedCart;
  },

  getManyCarts: async function (
    params,
    schema = this.cartModel.bind(cartManager),
    selection
  ) {
    const cartSchema = schema();
    const getMatchedCarts = await cartSchema.find(params).select(selection);
    return getMatchedCarts;
  },

  isInTheCart: async function (
    userID,
    itemToFind,
    schema = this.cartModel.bind(cartManager)
  ) {
    const cartSchema = schema();
    const isInTheCart = await cartSchema.findOne({
      userID: userID,
      "items.product.productID": itemToFind,
    });

    return isInTheCart ? true : false;
  },

  addProductsToCart: async function (
    userID,
    newItems,
    schema = this.cartModel.bind(cartManager),
    selection
  ) {
    const cartSchema = schema();

    let updatedCart = newItems.forEach(async (item) => {
      const yyy = await cartSchema.findOneAndUpdate(
        { userID: userID, "items.product.productID": item.product.productID },
        { $inc: { "items.$.quantity": item.quantity } }
      );
      if (!yyy) {
        await cartSchema.findOneAndUpdate(
          { userID: userID },
          { $push: { items: item } }
        );
      }
    });

    return true;
  },

  removeItemsFromCart: async function (
    userID,
    itemsToRemove,
    schema = this.cartModel.bind(cartManager)
  ) {
    const cartSchema = schema();
    const updatedCart = await cartSchema.findOneAndUpdate(
      { userID: userID },
      { $pull: { items: { "product.productID": { $in: itemsToRemove } } } },
      { new: true }
    );
    return updatedCart;
  },

  changeQty: async function (
    userID,
    itemToFind,
    changedQty,
    schema = this.cartModel.bind(cartManager)
  ) {
    const cartSchema = schema();
    const updatedCart = await cartSchema.findOneAndUpdate(
      { userID: userID, "items.product.productID": itemToFind },
      { $set: { "items.$.quantity": changedQty } },
      { new: true }
    );
    return updatedCart;
  },

  deleteOneCart: async function (
    params,
    schema = this.cartModel.bind(cartManager)
  ) {
    const cartSchema = schema();
    const deletedCart = await cartSchema.deleteOne(params);
    return deletedCart;
  },

  deleteManyCarts: async function (
    params,
    schema = this.cartModel.bind(cartManager)
  ) {
    const cartSchema = schema();
    const deletedCarts = await cartSchema.deleteMany(params);
    return deletedCarts;
  },
};

module.exports = { cartManager };
