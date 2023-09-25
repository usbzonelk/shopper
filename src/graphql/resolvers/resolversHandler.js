const cartResolver = require("./cartResolvers").cartResolvers;
const productResolver = require("./productResolvers");
const userResolver = require("./userResolver");

const publicResolvers = {
  Query: {
    ...userResolver.publicResolvers.Query,
    ...productResolver.publicResolvers.Query,
  },
};

const userResolvers = { Query: { ...cartResolver.Query } };

const adminResolvers = {};

module.exports = { publicResolvers, userResolvers, adminResolvers };
