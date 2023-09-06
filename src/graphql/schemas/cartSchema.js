const cartTypeDefs = `type Cart {
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

module.exports = { cartTypeDefs };
