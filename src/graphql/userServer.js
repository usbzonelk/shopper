const { ApolloServer } = require("@apollo/server");

const schemasHandler = require("./schemas/schemasHandler");
const resolversHandler = require("./resolvers/resolversHandler");

const typeDefs = schemasHandler.userSchemas;
const resolvers = resolversHandler.userResolvers;

const userServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

module.exports = { userServer };
