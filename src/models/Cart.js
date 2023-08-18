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
    userID,
    products,
    schema = this.cartModel.bind(cartManager)
  ) {
    const newCartDetails = {
      userID: userID,
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
    userID,
    itemToFind,
    schema = this.cartModel.bind(cartManager)
  ) {
    const cartSchema = schema();
    const isInTheCart = await cartSchema.findOne({
      userID: userID,
      "items.product.slug": itemToFind,
    });
    return isInTheCart ? true : false;
  },

  addProductsToCart: async function (
    userID,
    newItems,
    schema = this.cartModel.bind(cartManager)
  ) {
    const cartSchema = schema();

    let updatedCart = newItems.forEach(async (item) => {
      await cartSchema.findOneAndUpdate(
        { userID: userID, "items.product.slug": item.product.slug },
        { $inc: { "items.$.quantity": item.quantity } }
      );
    });

    let addedCart = await cartSchema.findOneAndUpdate(
      { email: mail },
      { $addToSet: { items: { $each: newItems } } },
      { new: true }
    );

    if (updatedCart) {
      updatedCart = updatedCart._doc;
    }

    if (addedCart) {
      addedCart = addedCart._doc;
    }

    return { ...updatedCart, ...addedCart };
  },

  removeItemsFromCart: async function (
    userID,
    itemsToRemove,
    schema = this.cartModel.bind(cartManager)
  ) {
    const cartSchema = schema();
    const updatedCart = await cartSchema.updateOne(
      { userID: userID },
      { $pull: { items: { "product.slug": { $in: itemsToRemove } } } },
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
      { userID: userID, "items.product.slug": itemToFind },
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
