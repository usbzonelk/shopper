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
            slug: { type: String, required: true },
            title: {
              type: String,
              required: true,
            },
            photo: { type: String, required: true },
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

  generateNewItem: async function (product, qty, discount) {
    const itemInfo = {
      product: product,
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

  isInTheCart: async function (
    mail,
    itemToFind,
    schema = this.cartModel.bind(cartManager)
  ) {
    const cartSchema = schema();
    const isInTheCart = await cartSchema.findOne({
      email: mail,
      "items.product.slug": itemToFind,
    });
    return isInTheCart ? true : false;
  },

  addProductsToCart: async function (
    mail,
    newItems,
    schema = this.cartModel.bind(cartManager)
  ) {
    const cartSchema = schema();

    const updatedCart = newItems.forEach(async (item) => {
      await cartSchema.findOneAndUpdate(
        { email: mail, "items.product.slug": item.product.slug },
        { $inc: { "items.$.quantity": item.quantity } }
      );
    });

    const addedCart = await cartSchema.findOneAndUpdate(
      { email: mail },
      { $addToSet: { items: { $each: newItems } } },
      { new: true }
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
      { $pull: { items: { "product.slug": { $in: itemsToRemove } } } },
      { new: true }
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
      { email: mail, "items.product.slug": itemToFind },
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
