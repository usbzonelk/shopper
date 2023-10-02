const cartResolver = require("./cartResolvers");
const productResolver = require("./productResolvers");
const userResolver = require("./userResolver");

const publicResolvers = {
  Query: {
    ...userResolver.publicResolvers.Query,
    ...productResolver.publicResolvers.Query,
  },
  Mutation: {
    ...userResolver.publicResolvers.Mutation,
  },
};

const userResolvers = {
  Query: {
    ...cartResolver.userResolvers.Query,
    ...userResolver.userResolvers.Query,
  },
  Mutation: {
    ...cartResolver.userResolvers.Mutation,
    ...userResolver.userResolvers.Mutation,
  },
};

const adminResolvers = {
  Query: {
    ...userResolver.adminResolvers.Query,
  },
  Mutation: {
    ...productResolver.adminResolvers.Mutation,
    ...userResolver.adminResolvers.Mutation,
  },
};

module.exports = { publicResolvers, userResolvers, adminResolvers };
