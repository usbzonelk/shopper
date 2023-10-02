let userTypeDefs = `
type User {
    email: String!
    fullName: String
    address: Address
    phoneNumber: String
    registrationDate: String
    status: String!
}

type Address {
    street: String!
    city: String!
    state: String!
    postalCode: String!
    country: String!
}

input InputAddress {
  street: String!
  city: String!
  state: String!
  postalCode: String!
  country: String!
}

type Result{
  success: Boolean !
}
`;

let adminTypeDefs = `
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
type Result{
  success: Boolean !
}
`;

const publicQueryDefs = `
type Query {
    UserLogin (email: String!, password: String!) : User
    GetAccessToken : User
  }

`;
const publicMutationDefs = `
type Mutation {
  RegisterUser(email:String!, password:String!) : Result!
  }

`;

const userQueryDefs = `
type Query {
    GetUserInfo : User
  }

`;

const userMutationDefs = `
type Mutation {
  verifyUserStatus: Result!
  ChangeEmail(newMail: String!, password: String!) : Result!
  ChangePassword(newPassword: String!, oldPassword: String!) : Result!
  ChangePersonalInfo(fullName: String, address: InputAddress, phone: String) : Result!
}`;

const adminQueryDefs = `
type Query {
  GetUserInfo(email: String!) : User!
  GetAllUsers : [User]!
}
`;

const adminMutationDefs = `
type Mutation{
  ActivateUser(email: String!) : Boolean!
  DeactivateUser(email: String!) : Boolean!
  ChangeUserEmail(email: String!, newEmail: String!) : Boolean!
  ChangeUserPassword(email: String!, newPassword: String!) : Boolean!
}
`;

publicTypeDefs = publicTypeDefs + publicQueryDefs + publicMutationDefs;
userTypeDefs = userTypeDefs + userQueryDefs + userMutationDefs;
adminTypeDefs = adminTypeDefs + adminQueryDefs + adminMutationDefs;

module.exports = {
  publicTypeDefs,
  adminTypeDefs,
  userTypeDefs,
};
