const userCartTypeDefs = `type Cart {
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
  }`;

const adminCartTypedefs = `
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

module.exports = { adminCartTypedefs, userCartTypeDefs };
