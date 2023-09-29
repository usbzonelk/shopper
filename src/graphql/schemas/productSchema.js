let adminProductsTypeDef = `
input Product{
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
  GetFullProduct(slug :String!) : Product!
  CheckTheSlug(slug : String!) : Boolean!
  SearchProductsByTitle(keyword: String!) : [Product]
  FilterByProperty(searchProperty : String!, values: [String]!, productType: String!) : [Product]
  FilterByRange(searchProperty : String!, range: [Float]!, productType: String!) : [Product]

}
`;

const adminMutationDefs = `
type Mutation {
  CreateANewProduct(Product!) : Product!
  EditProduct(Product!) : Product!
}
`;

adminProductsTypeDef =
  adminProductsTypeDef + CustomAttributeTypeDef + adminMutationDefs;
publicProductsTypeDef =
  publicProductsTypeDef + CustomAttributeTypeDef + publicQueryDefs;
const userProductsTypeDef = ``;

module.exports = {
  adminProductsTypeDef,
  publicProductsTypeDef,
  userProductsTypeDef,
};
