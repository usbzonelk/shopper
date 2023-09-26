const cartResolver = require("./cartResolvers");
const productResolver = require("./productResolvers");
const userResolver = require("./userResolver");

const publicResolvers = {
  Query: {
    ...userResolver.publicResolvers.Query,
    ...productResolver.publicResolvers.Query,
  },
};

const userResolvers = {
  Query: { ...cartResolver.userResolvers.Query },
  Mutation: { ...cartResolver.userResolvers.Mutation },
};

const adminResolvers = {};

module.exports = { publicResolvers, userResolvers, adminResolvers };
