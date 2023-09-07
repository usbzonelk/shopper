let adminProductsTypeDef = `
type Product{
    title: String!
    slug:  String!
    price: Float!
    discount: Float
    instock: Int
    description: String
    warrantyMonths: Int
    coverPhoto: String
    photos: [String]
    availability: String
    slugType: String!
    customAttributes : [customAttribute]
}
`;

let publicProductsTypeDef = `
type Product{
    title: String!
    slug:  String!
    price: Float!
    discount: Float
    description: String
    warrantyMonths: Int
    coverPhoto: String
    photos: [String]
    availability: String
    slugType: String!
    customAttributes : [customAttribute]
}
`;
const CustomAttributeTypeDef = `
type customAttribute {
  attributeName: String!
  search: Boolean!
  sort: Boolean!
  type: String
  qualitative: Boolean!
  minValue: Float
  maxValue: Float
  defaultValue: String #Should change this later
  values:[String]
}
`;

const publicQueryDefs = `
type Query {
  GetAllProducts : [Product]
}
`;

const adminQueryDefs = `
type Query {
  products : [Product]
}
`;

adminProductsTypeDef =
  adminProductsTypeDef + CustomAttributeTypeDef + adminQueryDefs;
publicProductsTypeDef =
  publicProductsTypeDef + CustomAttributeTypeDef + publicQueryDefs;
const userProductsTypeDef =
  publicProductsTypeDef + CustomAttributeTypeDef + publicQueryDefs;

module.exports = {
  adminProductsTypeDef,
  publicProductsTypeDef,
  userProductsTypeDef,
};
