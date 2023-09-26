const userTypeDefs = `
  type CartProduct{
      slug: String!
      title: String
      photo: String
      price: Float
  }
  
  type Item{
    product: CartProduct!
    quantity: Int!
    discount : Float
  }
  
  type Cart {
    items: [Item]
  }

  input ItemInput{
    product: CartProductInput!
    quantity: Int!
  }

  input SimpleItemInput{
    slug: String!
  }

  input CartProductInput{
    slug: String!
    title: String
    photo: String
    price: Float
}

`;
const adminTypedefs = `
type Cart {
  items: [Item]
}

type CartProduct{
    slug: String!
    title: String
    photo: String,
    price: Float,
}

type Item{
  product: CartProduct!,
  quantity: Int!
  discount : Float
}

type Carts{
  carts:[Cart]!
}`;

const userQueryDefs = `
type Query {
  GetFullCart : Cart
}`;

const userMutationDefs = `
type Mutation {
  AddToCart(items: [ItemInput]!): Cart!
  RemoveItems(items: [SimpleItemInput]!): Cart!
  ChangeQty(item: SimpleItemInput!, newQty: Int!): Cart!
}`;

const userCartTypeDefs = userTypeDefs + userQueryDefs + userMutationDefs;
const adminCartTypedefs = adminTypedefs;

module.exports = { adminCartTypedefs, userCartTypeDefs };
