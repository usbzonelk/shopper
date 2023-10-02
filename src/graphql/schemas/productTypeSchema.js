let adminTypeDefs = `
type ProductType {
    slugtype: String!
    adminId: String!
    fields: [ProductTypeAttribute]!
}

type ProductTypeAttribute {
    name: String!
    value: String!
}
input ProductTypeInput {
    slugtype: String!
    adminId: String!
    fields: [ProductTypeAttributeInput]!
}

input ProductTypeAttributeInput {
    name: String!
    value: String!
}

`;

let publicTypeDefs = `
type ProductType {
    slugtype: String!
    adminId: String!
    fields: [ProductTypeAttribute]!
}

type ProductTypeAttribute {
    name: String!
    value: String!
}
`;

const publicQueryDefs = `
type Query {
    GetProductType(productType: String!): ProductType!
    GetAllProductTypes: [ProductType]!
  }
`;

const adminQueryDefs = `

`;

const adminMutationDefs = `
type Mutation{
    AddProductType(newProductType: ProductTypeInput!): ProductType!
    EditProductType(typeName: String!, updatedProductType: ProductTypeInput!): ProductType!
    DeleteProductTypes(productTypes: [ProductTypeInput]!): Boolean!
}
`;

publicTypeDefs = publicTypeDefs + publicQueryDefs;
adminTypeDefs = adminTypeDefs + adminQueryDefs + adminMutationDefs;

module.exports = {
  publicTypeDefs,
  adminTypeDefs,
};
