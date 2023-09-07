const cartResolver = require("./cartResolvers");
const productResolver = require("./productResolvers");
const userResolver = require("./userResolver");

const publicResolvers = { ...productResolver.publicResolvers };

const userResolvers = {};

const adminResolvers = {};

module.exports = { publicResolvers, userResolvers, adminResolvers };
