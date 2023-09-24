const userUserTypeDefs = `
type User {
    email: String!
    fullName: String
    address: Address
    phoneNumber: String
    registrationDate: String
    status: String!
}

type Address {
    street: String
    city: String
    state: String
    postalCode: String
    country: String
}
`;

const adminUserTypeDefs = `
type User {
    email: String!
    fullName: String
    address: Address
    phoneNumber: String
    registrationDate: String
    status: String!
    password: String
}

type Address {
    street: String
    city: String
    state: String
    postalCode: String
    country: String
}

type Users{
    users: [User]
}
`;

let publicTypeDefs = `
type User {
    email: String!
    token: String
}
`;

const publicQueryDefs = `
type Query {
    UserLogin (email: String!, password: String!) : User
  }
`;

/* adminProductsTypeDef =
  adminProductsTypeDef + CustomAttributeTypeDef + adminQueryDefs;
publicProductsTypeDef =
  publicProductsTypeDef + CustomAttributeTypeDef + publicQueryDefs;
 */
publicTypeDefs = publicTypeDefs + publicQueryDefs;

module.exports = {
  publicTypeDefs /* adminUserTypeDefs, userUserTypeDefs */,
};
