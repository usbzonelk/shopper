let adminTypeDef = `

scalar DateTime

type Admin{
  email: String!
  RegistrationDate:  DateTime!
  Status: String
  AddedBy: String
  }

type AdminLogin{
    email: String!
    token: String!
}
`;

const adminPublicTypeDef = `
type AdminLogin{
  email: String!
  token: String!
}
`;

const adminMutationDefs = `
type Mutation {
  CreateAdmin(email: String!, password: String!) : Boolean!
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
let publicTypeDef = publicQueryDefs + adminPublicTypeDef;

module.exports = {
  adminTypeDef,
  publicTypeDef,
};
