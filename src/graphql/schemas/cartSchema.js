const userTypeDefs = `type Cart {
    email: String!
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
  
  input ItemInput{
    product: CartProductInput!,
    quantity: Int!
    discount : Float
  }

  input CartProductInput{
    slug: String!
    title: String
    photo: String,
    price: Float,
}
`;
const adminTypedefs = `
type Cart {
  email: String!
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
  RemoveItems(items: [ItemInput]!): Cart!
  ChangeQty(item: ItemInput!, newQty: Int!): Cart!
}`;

const userCartTypeDefs = userTypeDefs + userQueryDefs + userMutationDefs;
const adminCartTypedefs = adminTypedefs;

module.exports = { adminCartTypedefs, userCartTypeDefs };
