const cartTypeDefs = `type Cart {
    email: String!
    items: [Item]
    
  }
  
  type Product:{
      slug: String!
      title: String
      photo: String,
      price: String,
  }
  
  type Item:{
    product: Product!,
    quantity: Int!
    discount : Float
  }`;

module.exports = { cartTypeDefs };
