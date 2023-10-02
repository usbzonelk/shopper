let adminTypeDefs = `
type Setting {
    setting: String!
    value: String!
}

input SettingInput {
    setting: String!
    value: String!
}
`;

let publicTypeDefs = `
type Setting {
    setting: String!
    value: String!
}
`;

const publicQueryDefs = `
type Query {
    GetSetting(settingName: String!): Setting
  }

`;

const adminQueryDefs = `
type Query {
    GetSetting(settingName: String!): Setting!
    GetAllSettings: [Setting]!
}
`;

const adminMutationDefs = `
type Mutation{
    AddSetting(setting: SettingInput!): Setting!
    EditSetting(settingName: String!, newSetting: SettingInput!): Setting!
    DeleteSetting(settingName: String!): Boolean!
}
`;

publicTypeDefs = publicTypeDefs + publicQueryDefs;
adminTypeDefs = adminTypeDefs + adminQueryDefs + adminMutationDefs;

module.exports = {
  publicTypeDefs,
  adminTypeDefs,
};
