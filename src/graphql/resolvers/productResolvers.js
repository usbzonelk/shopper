const { products } = require("../../controllers/productController");
const { GraphQLError } = require("graphql");

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
        return new Error((message = "No products found"));
      }
    },

    GetFullProduct: async (_, args) => {
      const { slug } = args;
      const fullProduct = await productController.getFullProduct(slug);

      if (fullProduct.error) {
        throw fullProduct.error;
      }
      if (!fullProduct.product) {
        throw new GraphQLError(
          "You are not authorized to perform this action.",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          }
        );
      }
      if (fullProduct.product) {
        return fullProduct.product;
      }
    },

    CheckTheSlug: async (_, args) => {
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
      const productInfo = await productController.filterQualitative(
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

module.exports = {
  publicResolvers,
};
