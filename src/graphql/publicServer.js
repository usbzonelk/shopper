const { ApolloServer } = require("@apollo/server");

const schemasHandler = require("./schemas/schemasHandler");

const typeDefs = schemasHandler.publicSchemas;

const resolvers = {
  Query: {
    products: () => books,
  },
};

const publicServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

module.exports = { publicServer };
