const productController =
  require("../../controllers/productController").products;

const publicResolvers = {
  Query: {
    GetAllProducts: async () => {
      const allProducts = await productController.getAllProductsSummery();
      if (allProducts.products) {
        return allProducts.products;
      } else if (allProducts.error) {
        throw allProducts.error;
      }
    },
  },
};

module.exports = {
  publicResolvers,
};
