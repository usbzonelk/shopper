let adminProductsTypeDef = `
type Admin{
  email: String!
  RegistrationDate:  String!
  Status: String
  AddedBy: String
  }
`;

const adminMutationDefs = `
type Mutation {
  CreateAdmin(email: String!, password: String) : Admin!
  VerifyAdmin(email: String!) : Boolean!
  DeactivateAdmin(email: String!) : Boolean!
}
`;

const adminQueryDefs = `
type AdminLogin : Admin!
`;

adminProductsTypeDef =
  adminProductsTypeDef + adminQueryDefs + adminMutationDefs;

module.exports = {
  adminProductsTypeDef,
};
