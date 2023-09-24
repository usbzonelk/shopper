const cartResolver = require("./cartResolvers");
const productResolver = require("./productResolvers");
const userResolver = require("./userResolver");

const publicResolvers = {
  Query: {
    ...userResolver.publicResolvers.Query,
    ...productResolver.publicResolvers.Query,
  },
};

const userResolvers = {};

const adminResolvers = {};

module.exports = { publicResolvers, userResolvers, adminResolvers };
