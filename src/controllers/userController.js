const User = require("../models/Users");
const bcrypt = require("../utils/bcrypt");
const validateMail = require("../utils/stringValidators").validateMail;

const users = User.usersManager;

const createTempUser = async (email, password) => {
  let userCreated = null;
  const outputMsg = {};
  if (!validateMail(email)) {
    return new Error((message = "Entered Email Address is invalid"));
  }

  try {
    const mailValidity = await users.getOneUserInfo({ email: email });
    if (mailValidity) {
      return new Error((message = "Account already exists"));
    }
    userCreated = await users.createNewUser(email, password, "", "", "");
    outputMsg.user = userCreated;
    outputMsg.success = true;
    outputMsg.message = "Successfully created user";
  } catch (error) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = err.message;
  }
  return outputMsg;
};

const verifyUserStatus = async (email) => {
  let userEdited = null;
  const outputMsg = {};
  if (!validateMail(email)) {
    return new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const mailValidity = await users.getOneUserInfo({ email: email });
    if (!mailValidity) {
      return new Error((message = "Account doesn't exist"));
    }
    userEdited = await users.editOneUser(
      { email: email },
      { status: "verified" }
    );
    outputMsg.user = { email: userEdited.email, status: userEdited.status };
    outputMsg.success = true;
    outputMsg.message = "Successfully verified user";
  } catch (error) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = error.message;
  }
  return outputMsg;
};

const deactivateUser = async (email) => {
  let userEdited = null;
  const outputMsg = {};
  if (!validateMail(email)) {
    return new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const mailValidity = await users.getOneUserInfo({ email: email });
    if (!mailValidity) {
      return new Error((message = "Account doesn't exist"));
    }
    userEdited = await users.editOneUser(
      { email: email },
      { status: "deactivated" }
    );
    outputMsg.user = { email: userEdited.email, status: userEdited.status };
    outputMsg.success = true;
    outputMsg.message = "Successfully deactivated user";
  } catch (error) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = error.message;
  }
  return outputMsg;
};

const changePassword = async (email, newPass) => {
  let userEdited = null;
  const outputMsg = {};
  if (!validateMail(email)) {
    return new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const userInfo = await users.getOneUserInfo({ email: email });
    console.log(userInfo);
    if (!userInfo) {
      return new Error((message = "Account doesn't exist"));
    }
    if (userInfo.status != "verified") {
      return new Error((message = "Account is not active"));
    }
    const newPassHashed = await bcrypt.hashPassword(newPass);
    userEdited = await users.editOneUser(
      { email: email },
      { password: newPassHashed.pass }
    );
    outputMsg.user = { email: userEdited.email, status: userEdited.status };
    outputMsg.success = true;
    outputMsg.message = "Successfully changed password";
  } catch (error) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = error.message;
  }
  return outputMsg;
};

const changeMail = async (oldEmail, newEmail) => {
  let userEdited = null;
  const outputMsg = {};
  if (!validateMail(oldEmail) || !validateMail(newEmail)) {
    return new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const userInfo = await users.getOneUserInfo({ email: oldEmail });
    if (!userInfo) {
      return new Error((message = "Account doesn't exist"));
    }
    const newMailInfo = await users.getOneUserInfo({ email: newEmail });
    if (newMailInfo) {
      return new Error((message = "An account already exists"));
    }
    if (userInfo.status != "verified") {
      return new Error((message = "Account is not active"));
    }
    userEdited = await users.editOneUser(
      { email: oldEmail },
      { email: newEmail }
    );
    outputMsg.user = { email: userEdited.email, status: userEdited.status };
    outputMsg.success = true;
    outputMsg.message = "Successfully changed email";
  } catch (error) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = error.message;
  }
  return outputMsg;
};

const changePersonalInfo = async (
  mail,
  fullName = null,
  address = null,
  phone = null
) => {
  let userEdited = null;
  const outputMsg = {};
  if (!validateMail(mail)) {
    return new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const userInfo = await users.getOneUserInfo({ email: mail });
    if (!userInfo) {
      return new Error((message = "Account doesn't exist"));
    }
    if (userInfo.status != "verified") {
      return new Error((message = "Account is not active"));
    }
    if (fullName) {
      userEdited = await users.editOneUser(
        { email: mail },
        { fullName: fullName }
      );
    }
    if (address) {
      userEdited = await users.editOneUser(
        { email: mail },
        { address: address }
      );
    }
    if (phone) {
      userEdited = await users.editOneUser({ email: mail }, { phone: phone });
    }

    outputMsg.user = { email: userEdited.email, status: userEdited.status };
    outputMsg.success = true;
    outputMsg.message = "Successfully changed email";
  } catch (error) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = error.message;
  }
  return outputMsg;
};

const userLogin = async () => {};

module.exports = {
  createTempUser,
  verifyUserStatus,
  deactivateUser,
  changePassword,
  changeMail,
  changePersonalInfo,
  userLogin,
};
