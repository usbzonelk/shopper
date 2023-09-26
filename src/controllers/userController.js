const User = require("../models/Users");
const bcrypt = require("../utils/bcrypt");
const validateMail = require("../utils/stringValidators").validateMail;
const auth = require("../utils/auth");
const { errorMonitor } = require("ws");

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
    outputMsg.error = error.message;
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

const changePassword = async (email, oldPass, newPass) => {
  let userEdited = null;
  const outputMsg = {};
  if (!validateMail(email)) {
    return new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const userInfo = await users.getOneUserInfo({ email: email });
    if (!userInfo) {
      return new Error((message = "Account doesn't exist"));
    }
    if (userInfo.status != "verified") {
      return new Error((message = "Account is not active"));
    }

    const userPass = userInfo.password;
    const passwordValidity = await bcrypt.validateUser(oldPass, userPass);
    if (passwordValidity) {
      const newPassHashed = await bcrypt.hashPassword(newPass);
      userEdited = await users.editOneUser(
        { email: email },
        { password: newPassHashed.pass }
      );
    } else {
      throw new Error((message = "Incorrect Password"));
    }

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

const changeMail = async (oldEmail, newEmail, password) => {
  let userEdited = null;
  const outputMsg = {};
  if (!validateMail(oldEmail) || !validateMail(newEmail)) {
    return new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const userInfo = await users.getOneUserInfo({ email: oldEmail });
    if (!userInfo) {
      throw new Error((message = "Account doesn't exist"));
    }
    const userPass = userInfo.password;
    const passwordValidity = await bcrypt.validateUser(password, userPass);
    if (passwordValidity) {
      const newMailInfo = await users.getOneUserInfo({ email: newEmail });
      if (newMailInfo) {
        throw new Error((message = "An account already exists"));
      }
      if (userInfo.status != "verified") {
        throw new Error((message = "Account is not active"));
      }
      userEdited = await users.editOneUser(
        { email: oldEmail },
        { email: newEmail }
      );
    } else {
      throw new Error((message = "Incorrect Password"));
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

const userLogin = async (email, enteredPassword) => {
  const outputMsg = {};
  const userEntredMail = email;

  if (!validateMail(email)) {
    throw new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const userInfo = await users.getOneUserInfo({ email: email });
    if (!userInfo) {
      throw new Error((message = "Account doesn't exist"));
    }
    if (userInfo.status != "verified") {
      throw new Error(
        (message =
          "Account is not active. Contact an administrator to reactivate your account")
      );
    }
    const userPass = userInfo.password;
    const accountValidity = await bcrypt.validateUser(
      enteredPassword,
      userPass
    );
    if (accountValidity) {
      const userMail = userInfo.mail;
      const refreshToken = auth.jwtRefreshGenerator(userEntredMail, "user");
      const storeToken = await users.editOneUser(
        { email: userInfo.email },
        { refreshToken: refreshToken }
      );

      outputMsg.user = { email: email, token: refreshToken };
      outputMsg.success = true;
      outputMsg.message = "Successfully logged in";
    } else {
      throw new Error((message = "Incorrect Password"));
    }
  } catch (error) {
    /* outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = error.message; */
    throw error;
  }
  return outputMsg;
};

const generateAccessToken = async (refreshToken) => {
  let email = null;
  const jwtValidity = await auth.jwtValidator(refreshToken);
  if (jwtValidity) {
    email = jwtValidity.email;
  }
  const outputMsg = {};
  if (!validateMail(email) || email == null) {
    throw new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const userInfo = await users.getOneUserInfo({ email: email });
    if (!userInfo) {
      throw new Error((message = "Account doesn't exist"));
    }
    if (userInfo.status != "verified") {
      throw new Error(
        (message =
          "Account is not active. Contact an administrator to reactivate your account")
      );
    }

    const accessToken = auth.jwtAccessGenerator(refreshToken);
    if (accessToken) {
      const storeToken = await users.editOneUser(
        { email: userInfo.email },
        { accessToken: accessToken }
      );
      outputMsg.user = { email: userInfo.email, token: accessToken };
      outputMsg.success = true;
      outputMsg.message = "Successfully generated token";
    } else {
      outputMsg.user = { email: userInfo.email };
      outputMsg.success = false;
      outputMsg.message = "Please log in first";
      throw new Error((message = outputMsg.message));
    }
  } catch (error) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = error.message;
    throw new Error((message = error.message));
  }
  return outputMsg;
};

const userLogout = async (email) => {
  const outputMsg = {};
  if (!validateMail(email)) {
    return new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const userInfo = await users.getOneUserInfo({ email: email });
    if (!userInfo) {
      return new Error((message = "Account doesn't exist"));
    }
    if (userInfo.status != "verified") {
      return new Error(
        (message =
          "Account is not active. Contact an administrator to reactivate your account")
      );
    }

    const removeTokens = await users.editOneUser(
      { email: userInfo.email },
      { refreshToken: "", accessToken: "" }
    );

    outputMsg.user = { email: userInfo.email };
    outputMsg.success = true;
    outputMsg.message = "Successfully logged out";
  } catch (error) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = error.message;
  }
  return outputMsg;
};

const emailValidator = async (email) => {
  let validity = false;
  if (!validateMail(email)) {
    return new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const userInfo = await users.getOneUserInfo({ email: email });
    if (!userInfo) {
      return new Error((message = "Account doesn't exist"));
    }
    if (userInfo.status != "verified") {
      return new Error(
        (message =
          "Account is not active. Contact an administrator to reactivate your account")
      );
    } else {
      validity = true;
    }

    return validity;
  } catch (error) {
    return error.massage;
  }
};

const getFullUserInfo = async (email) => {
  const outputMsg = {};

  if (!validateMail(email)) {
    return new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const userInfo = await users.getOneUserInfo({ email: email });
    if (!userInfo) {
      return new Error((message = "Account doesn't exist"));
    }

    outputMsg.user = userInfo;
    outputMsg.success = true;
    outputMsg.message = "Successfully retrieved user data";
  } catch (error) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = error.message;
  }
  return outputMsg;
};

const getUserID = async (email) => {
  const outputMsg = {};
  const userMail = email;

  if (!validateMail(email)) {
    return new Error((message = "Entered Email Address is invalid"));
  }

  try {
    const userInfo = await users.getUserInfoSelected(
      { email: userMail },
      { email: 1, _id: 1 }
    );
    if (!userInfo) {
      return new Error((message = "Account doesn't exist"));
    }
    outputMsg.userID = userInfo._id;
    outputMsg.success = true;
    outputMsg.message = "Successfully retrieved user data";
  } catch (error) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = error.message;
  }
  return outputMsg;
};

const getVerificationCode = async (email) => {
  const outputMsg = {};

  if (!validateMail(email)) {
    return new Error((message = "Entered Email Address is invalid"));
  }

  try {
    const userInfo = await users.getUserInfoSelected(
      { email: email },
      { email: 1, verificationCode: 1, _id: 0 }
    );
    if (!userInfo) {
      return new Error((message = "Account doesn't exist"));
    }
    outputMsg.verificationCode = userInfo.verificationCode;
    outputMsg.success = true;
    outputMsg.message = "Successfully retrieved verification code";
  } catch (error) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = error.message;
  }
  return outputMsg;
};

const verifyUserAccount = async (email, verificationCode) => {
  const outputMsg = {};

  if (!validateMail(email)) {
    return new Error((message = "Entered Email Address is invalid"));
  }

  try {
    const userInfo = await users.getUserInfoSelected(
      { email: email },
      { email: 1, verificationCode: 1, _id: 0, status: 1 }
    );
    if (!userInfo) {
      return new Error((message = "Account doesn't exist"));
    }
    if (userInfo.status == "verified") {
      return new Error((message = "Account is already verified"));
    }
    if (verificationCode !== userInfo.verificationCode) {
      return new Error((message = "Invalid verification code"));
    } else {
      userVerified = await users.editOneUser(
        { email: email },
        { status: "verified" }
      );
    }
    outputMsg.verifiedUser = userVerified.email;
    outputMsg.success = true;
    outputMsg.message = "Successfully verified the user";
  } catch (error) {
    outputMsg.success = false;
    outputMsg.message = "Error occured";
    outputMsg.error = error.message;
  }
  return outputMsg;
};

module.exports = {
  createTempUser,
  verifyUserStatus,
  deactivateUser,
  changePassword,
  changeMail,
  changePersonalInfo,
  userLogin,
  userLogout,
  generateAccessToken,
  emailValidator,
  getFullUserInfo,
  getUserID,
  getVerificationCode,
  verifyUserAccount,
};
