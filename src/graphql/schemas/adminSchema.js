let adminTypeDef = `
type Admin{
  email: String!
  RegistrationDate:  String!
  Status: String
  AddedBy: String
  }

type AdminLogin{
    email: String!
    token: String!
}
`;

const adminMutationDefs = `
type Mutation {
  CreateAdmin(email: String!, password: String) : Admin!
  VerifyAdmin(email: String!) : Boolean!
  DeactivateAdmin(email: String!) : Boolean!
}
`;

const publicQueryDefs = `
type Query {
    AdminLogin(email: String!, enteredPassword: String!) : AdminLogin!
}
`;

adminTypeDef = adminTypeDef + adminMutationDefs;
let publicTypeDef = publicQueryDefs + adminTypeDef;

module.exports = {
  adminTypeDef,
  publicTypeDef,
};
