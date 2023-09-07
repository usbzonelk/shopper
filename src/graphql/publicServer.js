const { ApolloServer } = require("@apollo/server");

const schemasHandler = require("./schemas/schemasHandler");
const typeDefs = schemasHandler.publicSchemas;
const books = [
  {
    title: "String",
    slug: "String",
    price: 1,
    discount: 1,
    instock: 12,
    description: "String",
    warrantyMonths: 12,
    coverPhoto: "String",
    photos: ["String"],
    availability: "String",
    slugType: "String",
  },
];

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
