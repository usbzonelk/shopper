const mongoose = require("mongoose");

const cartManager = {
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
    return mongoose.model("carts", this.cartSchema());
  },

  generateNewItem: async function (slug, qty, discount) {
    const itemInfo = {
      product: slug,
      quantity: qty,
      discount: discount,
    };
    return itemInfo;
  },

  createNewCart: async function (email, products) {
    const newCartDetails = {
      email: email,
      items: products,
      addedAt: new Date(),
    };
    const Cart = this.cartModel(newCartDetails);

    const newCart = new Cart(newCartDetails);

    const savedCart = await newCart.save();

    return savedCart;
  },

  getAllCarts: async function () {
    try {
      const cartSchema = this.cartModel();
      const allCarts = await cartSchema.find({});
      return allCarts;
    } catch (err) {
      return err;
    }
  },

  getOneCart: async function (params) {
    const cartSchema = this.cartModel();
    const getMatchedCart = await cartSchema.findOne(params);
    return getMatchedCart;
  },

  getManyCarts: async function (params) {
    const cartSchema = this.cartModel();
    const getMatchedCarts = await cartSchema.findOne(params);
    return getMatchedCarts;
  },

  editOneCart: async function (email, newProductTypeInfo) {
    const productTypeSchema = this.productTypeModel();
    const updatedProductType = await productTypeSchema.findOneAndUpdate(
      email,
      newProductTypeInfo,
      {
        new: true,
      }
    );

    return updatedProductType;
  },

  addProductsToCart: async function (mail, newItems) {
    const cartSchema = this.cartModel();
    const updatedCart = await cartSchema.updateOne(
      { email: mail },
      { $push: { items: { $in: newItems } } }
    );
    return updatedCart;
  },

  removeItemsFromCart: async function (mail, itemsToRemove) {
    const cartSchema = this.cartModel();
    const updatedCart = await cartSchema.updateOne(
      { email: mail },
      { $pull: { items: { $in: itemsToRemove } } }
    );
    return updatedCart;
  },

  changeQty: async function (mail, itemToRemove, changedQty) {
    const cartSchema = this.cartModel();
    const updatedCart = await cartSchema.findOneAndUpdate(
      { email: mail, "items.product": itemToRemove },
      { $set: { "items.$.quantity": changedQty } },
      { new: true }
    );
    return updatedCart;
  },

  deleteOneCart: async function (params) {
    const cartSchema = this.cartModel();
    const deletedCart = await cartSchema.deleteOne(params);
    return deletedCart;
  },

  deleteManyCarts: async function (params) {
    const cartSchema = this.cartModel();
    const deletedCarts = await cartSchema.deleteMany(params);
    return deletedCarts;
  },
};

module.exports = { cartManager };
