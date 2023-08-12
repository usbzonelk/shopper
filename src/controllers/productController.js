const Product = require("../models/Product");
const productManager = Product.newProductManager;
const productTypeManager = Product.newProductTypeManager;

const saveNewProduct = async (email, products) => {
    const cartSchema = await cartManager.cartModel.bind(cartManager);
    let addItem = null;
    const outputMsg = {};
  
    try {
      addItem = await cartManager.addProductsToCart(email, products, cartSchema);
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

module.exports = {};