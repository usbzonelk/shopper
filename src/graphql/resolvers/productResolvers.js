const GraphQLError = require("graphql").GraphQLError;

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
      } else {
        throw new Error((message = "No products found"));
      }
    },

    GetFullProduct: async (_, args) => {
      const { slug } = args;
      const fullProduct = await productController.getFullProduct(slug);

      if (fullProduct.error) {
        throw fullProduct.error;
      }
      if (!fullProduct.product) {
        throw new Error((message = "Product not found"));
      }
      if (fullProduct.product) {
        return fullProduct.product;
      }
    },

    CheckTheSlug: async (_, args, context) => {
      console.log(context);

      const { slug } = args;
      const slugInfo = await productController.slugCheck(slug);
      if (slugInfo.error) {
        throw slugInfo.error;
      }
      return slugInfo.valid;
    },

    SearchProductsByTitle: async (_, args) => {
      const { keyword } = args;
      const slugInfo = await productController.searchProducts("title", keyword);
      if (slugInfo.error) {
        throw slugInfo.error;
      } else if (slugInfo.products) {
        return slugInfo.products;
      } else {
        return new Error((message = "Not found"));
      }
    },

    FilterByProperty: async (_, args) => {
      const { searchProperty, values, productType } = args;
      const productInfo = await productController.filterQualitative(
        values,
        productType,
        searchProperty
      );
      if (productInfo.error) {
        throw productInfo.error;
      } else if (productInfo.filteredProducts) {
        productInfo.filteredProducts;
      } else {
        return new Error((message = "Not found"));
      }
    },

    FilterByRange: async (_, args) => {
      const { searchProperty, range, productType } = args;
      const productInfo = await productController.filterRange(
        range,
        productType,
        searchProperty
      );
      if (productInfo.error) {
        throw productInfo.error;
      }
      if (productInfo.filteredProducts) {
        return productInfo.filteredProducts;
      } else {
        return new Error((message = "Not found"));
      }
    },
  },
};

const adminResolvers = {
  Query: {},
  Mutation: {
    CreateANewProduct: async (_, { newProduct }, context) => {
      const productType = newProduct.slugType;
      try {
        const newProductSaved = await productController.saveNewProduct(
          productType,
          newProduct
        );
        if (newProductSaved.error) {
          throw new GraphQLError(newProductSaved.error.message, {
            extensions: { code: "FAILED" },
          });
        }
        return newProductSaved.product;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "FAILED" },
        });
      }
    },

    EditProduct: async (_, { editedProduct }, context) => {
      console.log(context);

      const slugInfo = await productController.slugCheck(slug);
      if (slugInfo.error) {
        throw slugInfo.error;
      }
      return slugInfo.valid;
    },
  },
};

module.exports = {
  publicResolvers,
  adminResolvers,
};
