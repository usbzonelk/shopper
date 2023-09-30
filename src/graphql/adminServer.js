const { ApolloServer } = require("@apollo/server");

const schemasHandler = require("./schemas/schemasHandler");
const resolversHandler = require("./resolvers/resolversHandler");

const typeDefs = schemasHandler.adminSchemas;
const resolvers = resolversHandler.adminResolvers;

const adminServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

module.exports = { adminServer };
