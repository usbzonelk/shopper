const User = require("../models/Users");
const bcrypt = require("../utils/bcrypt");
const users = User.usersManager;

const createTempUser = async (email, password) => {
  let userCreated = null;
  const outputMsg = {};

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

const verifyUser = async (email) => {
  let userEdited = null;
  const outputMsg = {};

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

const passwordReset = async (email, newPass) => {
  let userEdited = null;
  const outputMsg = {};

  try {
    const mailValidity = await users.getOneUserInfo({ email: email });
    if (!mailValidity) {
      return new Error((message = "Account doesn't exist"));
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

  try {
    const mailValidity = await users.getOneUserInfo({ email: oldEmail });
    if (!mailValidity) {
      return new Error((message = "Account doesn't exist"));
    }
    const newMailValidity = await users.getOneUserInfo({ email: newEmail });
    if (newMailValidity) {
      return new Error((message = "An account already exists"));
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

module.exports = {
  createTempUser,
  verifyUser,
  deactivateUser,
  passwordReset,
  changeMail,
};
