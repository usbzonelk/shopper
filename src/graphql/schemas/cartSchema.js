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

input CartProductInputUser{
  slug: String! 
}

input ItemInputUser {
  product: CartProductInputUser!,
  quantity: Int!
  discount : Float
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

input CartProductInput{
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
input ItemInput {
  product: CartProductInput!,
  quantity: Int!
  discount : Float
}

type Carts{
  carts:[Cart]!
}`;

const userQueryDefs = `
type Query {
  GetFullCart : Cart
  IsInTheCart(itemSlug: String!) : Boolean!
}`;

const userMutationDefs = `
type Mutation {
  AddToCart(items: [ItemInputUser]!): Cart!
  RemoveItems(items: [SimpleItemInput]!): Cart!
  ChangeQty(item: SimpleItemInput!, newQty: Int!): Cart!
}`;

const userCartTypeDefs = userTypeDefs + userQueryDefs + userMutationDefs;
const adminCartTypedefs = adminTypedefs;

module.exports = { adminCartTypedefs, userCartTypeDefs };
