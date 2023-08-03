const mongoose = require("mongoose");

const cartManager = {
  cartModelGenerated: null,

  cartSchema: function () {
    return new mongoose.Schema({
      email: {
        type: String,
        required: true,
      },
      items: [
        {
          product: {
            type: String,
            required: true,
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

  generateNewItem: async function (slug, qty, discount) {
    const itemInfo = {
      product: slug,
      quantity: qty,
      discount: discount,
    };
    return itemInfo;
  },

  createNewCart: async function (
    email,
    products,
    schema = this.cartModel.bind(cartManager)
  ) {
    const newCartDetails = {
      email: email,
      items: products,
      addedAt: new Date(),
    };
    const Cart = schema(newCartDetails);

    const newCart = new Cart(newCartDetails);

    const savedCart = await newCart.save();

    return savedCart;
  },

  getAllCarts: async function (schema = this.cartModel.bind(cartManager)) {
    try {
      const cartSchema = schema();
      const allCarts = await cartSchema.find({});
      return allCarts;
    } catch (err) {
      return err;
    }
  },

  getOneCart: async function (
    params,
    schema = this.cartModel.bind(cartManager)
  ) {
    const cartSchema = schema();
    const getMatchedCart = await cartSchema.findOne(params);
    return getMatchedCart;
  },

  getManyCarts: async function (
    params,
    schema = this.cartModel.bind(cartManager)
  ) {
    const cartSchema = schema();
    const getMatchedCarts = await cartSchema.findOne(params);
    return getMatchedCarts;
  },

  addProductsToCart: async function (
    mail,
    newItems,
    schema = this.cartModel.bind(cartManager)
  ) {
    console.log(newItems);
    const cartSchema = schema();
    const updatedCart = await cartSchema.updateOne(
      { email: mail },
      { $push: { items: { $each: newItems } } }
    );
    return updatedCart;
  },

  removeItemsFromCart: async function (
    mail,
    itemsToRemove,
    schema = this.cartModel.bind(cartManager)
  ) {
    const cartSchema = schema();
    const updatedCart = await cartSchema.updateOne(
      { email: mail },
      { $pull: { items: { product: { $in: itemsToRemove } } } }
    );
    return updatedCart;
  },

  changeQty: async function (
    mail,
    itemToFind,
    changedQty,
    schema = this.cartModel.bind(cartManager)
  ) {
    const cartSchema = schema();
    const updatedCart = await cartSchema.findOneAndUpdate(
      { email: mail, "items.product": itemToFind },
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
