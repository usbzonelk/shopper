const { ApolloServer } = require("@apollo/server");

const schemasHandler = require("./schemas/schemasHandler");
const resolversHandler = require("./resolvers/resolversHandler");

const typeDefs = schemasHandler.publicSchemas;
const resolvers = resolversHandler.publicResolvers;

const publicServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

module.exports = { publicServer };
