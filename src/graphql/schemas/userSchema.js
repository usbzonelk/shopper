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
    GetAccessToken : User
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

publicTypeDefs = publicTypeDefs + publicQueryDefs;
userTypeDefs = userTypeDefs + userQueryDefs + userMutationDefs;

module.exports = {
  publicTypeDefs /* adminUserTypeDefs*/,
  userTypeDefs,
};
