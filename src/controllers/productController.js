const Product = require("../models/Product");
const productManager = Product.newProductManager;
const productTypeManager = Product.newProductTypeManager;

const products = {
  saveNewProduct: async function (productType, productDetails) {
    savedProduct = null;
    const outputMsg = {};
    const productTypeName = productType;

    try {
      let productType = await productTypeManager.getOneProductType({
        slugtype: productTypeName,
      });

      let productTypeAttributes = null;

      if (productType) {
        if (productType.error) {
          throw productType.error;
        }
        productTypeAttributes = productType.fields;
      } else {
        return new Error((message = "Invalid Product type"));
      }

      savedProduct = await productManager.saveNewProduct(
        productTypeAttributes,
        productDetails
      );
      if (savedProduct.error) {
        return new Error(savedProduct.error);
      }
      outputMsg.product = savedProduct;
      outputMsg.success = true;
      outputMsg.message = "Successfully saved the product";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
    }

    return outputMsg;
  },

  getFullProduct: async function (slug) {
    let productInfo = null;
    const outputMsg = {};

    try {
      productInfo = await productManager.getOneProduct({ slug: slug });

      if (!productInfo) {
        return new Error((message = "Invalid slug"));
      }
      if (productInfo.error) {
        return new Error(productInfo.error);
      }
      outputMsg.product = productInfo;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the product";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
      return outputMsg;
    }

    return outputMsg;
  },

  getAllProductsSummery: async function () {
    let productInfo = null;
    const outputMsg = {};

    try {
      productInfo = await productManager.getAllProducts(
        (selection = {
          title: 1,
          slug: 1,
          price: 1,
          discount: 1,
          instock: 1,
          type: 1,
          coverPhoto: 1,
        })
      );
      if (productInfo.error) {
        throw productInfo.error;
      }
      outputMsg.products = productInfo;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the products";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
      return outputMsg;
    }

    return outputMsg;
  },

  filteredProductSummary: async function (params) {
    let products = null;
    const outputMsg = {};

    try {
      products = await productManager.getManyProducts(
        params,
        (selection = {
          title: 1,
          slug: 1,
          price: 1,
          discount: 1,
          instock: 1,
          type: 1,
          coverPhoto: 1,
        })
      );
      if (products.error) {
        throw products.error;
      }
      outputMsg.products = products;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the product summeries";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
      return outputMsg;
    }

    return outputMsg;
  },

  getSomeProductsSummary: async function (property, params) {
    let products = null;
    const outputMsg = {};

    try {
      products = await productManager.getManyProductsFromAnArray(
        property,
        params,
        (selection = {
          title: 1,
          slug: 1,
          price: 1,
          discount: 1,
          instock: 1,
          type: 1,
          coverPhoto: 1,
        })
      );
      if (products.error) {
        throw products.error;
      }
      outputMsg.products = products;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the product summeries";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
      return outputMsg;
    }

    return outputMsg;
  },

  slugCheck: async function (slug) {
    let productInfo = null;
    const outputMsg = {};
    try {
      productInfo = await productManager.getOneProduct({ slug: slug });
      if (!productInfo) {
        outputMsg.valid = false;
      } else {
        if (productInfo.error) {
          throw new Error(productInfo.error);
        }
        outputMsg.valid = true;
      }

      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the validity of slug.";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
      return outputMsg;
    }

    return outputMsg;
  },

  filterRange: async function (range = [0, 0], slugType, property) {
    const outputMsg = {};
    const params = {};

    params[property] = { $gte: range[0], $lte: range[1] };

    try {
      filteredProducts = await productManager.getManyProducts(
        {
          slugType: slugType,
          ...params,
        },
        {
          _id: 0,
          __v: 0,
          description: 0,
          instock: 0,
          warrantyMonths: 0,
          photos: 0,
        }
      );

      outputMsg.filteredProducts = filteredProducts;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the products.";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
      return outputMsg;
    }

    return outputMsg;
  },

  filterQualitative: async function (values = [], slugType, property) {
    const outputMsg = {};
    const params = {};

    params[property] = { $in: values };

    try {
      filteredProducts = await productManager.getManyProducts(
        {
          slugType: slugType,
          ...params,
        },
        {
          _id: 0,
          __v: 0,
          description: 0,
          instock: 0,
          warrantyMonths: 0,
          photos: 0,
        }
      );

      outputMsg.filteredProducts = filteredProducts;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the products.";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
      return outputMsg;
    }

    return outputMsg;
  },

  editProduct: async function (slug, newProductInfo) {
    const outputMsg = {};
    let productInfo = null;
    let editedProduct = null;

    try {
      productInfo = await productManager.getOneProduct({ slug: slug });

      if (!productInfo) {
        return new Error((message = "Slug is invalid"));
      }
      editedProduct = await productManager.editOneProduct(
        { slug: slug },
        newProductInfo
      );
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the validity of slug.";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
      return outputMsg;
    }

    return outputMsg;
  },

  searchProducts: async function (property, string) {
    let searchedProducts = null;
    const outputMsg = {};
    const query = {};
    query[property] = { $regex: `${string}`, $options: "i" };

    try {
      searchedProducts = await productManager.getManyProducts(
        query,
        (selection = {
          title: 1,
          slug: 1,
          price: 1,
          discount: 1,
          instock: 1,
          type: 1,
          coverPhoto: 1,
        })
      );

      outputMsg.products = searchedProducts;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the products";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
      return outputMsg;
    }

    return outputMsg;
  },

  getProductIDs: async function (slugs = []) {
    let searchedSlugs = [];
    const outputMsg = {};

    try {
      searchedSlugs = await productManager.getManyProducts(
        { slug: { $in: slugs } },
        (selection = {
          slug: 1,
        })
      );
      const productIDs = [];
      searchedSlugs.forEach((productID, idx) => {
        if (!productID._id) {
          throw new Error((message = `Invalid slug ${slugs[idx]}`));
        }
        productIDs.push(productID._id);
      });

      outputMsg.productIDs = productIDs;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the product IDs";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
      return outputMsg;
    }

    return outputMsg;
  },

  getSlugs: async function (productIDs = []) {
    let searchedProducts;
    const outputMsg = {};
    try {
      searchedProducts = await productManager.getManyProducts(
        { _id: { $in: productIDs } },
        {
          slug: 1,
          _id: 0,
        }
      );
      const allSlugs = [];
      searchedProducts.forEach((product) => {
        allSlugs.push(product.slug);
      });
      if (searchedProducts.error) {
        throw new Error(searchedProducts.error);
      }
      outputMsg.slugs = allSlugs;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved the product slugs";
    } catch (err) {
      outputMsg.success = false;
      outputMsg.message = "Error occured";
      outputMsg.error = err.message;
      return outputMsg;
    }

    return outputMsg;
  },
};

const productTypes = {};

module.exports = { products, productTypes };
