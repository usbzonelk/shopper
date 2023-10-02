const cartResolver = require("./cartResolvers");
const productResolver = require("./productResolvers");
const userResolver = require("./userResolver");
const adminResolver = require("./adminResolver");
const settingsResolver = require("./settingsResolver");

const publicResolvers = {
  Query: {
    ...userResolver.publicResolvers.Query,
    ...productResolver.publicResolvers.Query,
    ...adminResolver.publicResolvers.Query,
    ...settingsResolver.publicResolvers.Query,
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
    ...adminResolver.adminResolvers.Query,
    ...settingsResolver.adminResolvers.Query,
  },
  Mutation: {
    ...productResolver.adminResolvers.Mutation,
    ...userResolver.adminResolvers.Mutation,
    ...adminResolver.adminResolvers.Mutation,
    ...settingsResolver.adminResolvers.Mutation,
  },
};

module.exports = { publicResolvers, userResolvers, adminResolvers };
