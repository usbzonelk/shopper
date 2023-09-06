let productsTypeDef = `
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
const CustomAttributeTypeDef = `
type customAttribute = {
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
productsTypeDef = productsTypeDef + CustomAttributeTypeDef;

module.exports = { productsTypeDef };
