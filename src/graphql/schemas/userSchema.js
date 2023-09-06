const userTypeDefs = `
type User: {
    email: String!
    fullName: String
    address: Address
    phoneNumber: String
    registrationDate: Date
    status: String!
}

type Address: {
    street: String
    city: String
    state: String
    postalCode: String
    country: String
}
`

module.exports = { userTypeDefs };
