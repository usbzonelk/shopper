const Admin = require("../models/Admins");
const bcrypt = require("../utils/bcrypt");
const validateMail = require("../utils/stringValidators").validateMail;
const auth = require("../utils/auth");

const admins = Admin.adminsManager;

const admin = async (email, enteredPassword) => {
  const outputMsg = {};
  const userEntredMail = email;

  if (!validateMail(email)) {
    throw new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const adminInfo = await admins.getOneAdminInfo({ email: email });
    if (!adminInfo) {
      throw new Error((message = "Account doesn't exist"));
    }
    if (adminInfo.status != "verified") {
      throw new Error(
        (message =
          "Account is not active. Contact an administrator to reactivate your account")
      );
    }
    const adminPass = adminInfo.password;
    const accountValidity = await bcrypt.validateUser(
      enteredPassword,
      adminPass
    );
    if (accountValidity) {
      const adminMail = userInfo.mail;
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
    throw error;
  }
  return outputMsg;
};

const adminLogin = async (email, enteredPassword) => {
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

module.exports = {
  admin,
};
