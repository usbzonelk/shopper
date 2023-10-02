const Admin = require("../models/Admins");
const bcrypt = require("../utils/bcrypt");
const validateMail = require("../utils/stringValidators").validateMail;
const auth = require("../utils/auth");

const admins = Admin.adminsManager;

const adminRegister = async (email, enteredPassword, createdBy) => {
  const outputMsg = {};
  const newAdminEmail = email;

  if (!validateMail(email)) {
    throw new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const adminInfo = await admins.getOneAdminInfo({ email: email });
    if (adminInfo) {
      throw new Error((message = "Account already exists"));
    } else {
      const newAccount = admins.createNewAdmin(
        newAdminEmail,
        enteredPassword,
        createdBy
      );
      outputMsg.admin = newAccount;
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
    const userInfo = await admins.getOneAdminInfo({ email: email });
    if (!userInfo) {
      throw new Error((message = "Account doesn't exist"));
    }
    if (userInfo.status != "verified") {
      throw new Error(
        (message =
          "Account is not active. Contact an administrator to reactivate your account")
      );
    }
    const accountValidity = await admins.validateAdminPassword(
      email,
      enteredPassword
    );
    if (accountValidity) {
      const userMail = userInfo.mail;
      const refreshToken = auth.jwtRefreshGenerator(userEntredMail, "admin");

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

const verifyAdmin = async (email, verifierAdminEmail) => {
  const outputMsg = {};

  if (!validateMail(email) || !validateMail(verifierAdminEmail)) {
    throw new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const adminInfo = await admins.getOneAdminInfo({ email: email });
    if (!adminInfo) {
      throw new Error((message = "Account not found"));
    }
    const verifierAdminInfo = await admins.getOneAdminInfo({
      email: verifierAdminEmail,
    });
    if (!verifierAdminInfo) {
      throw new Error((message = "Verifier account not found"));
    }
    if (verifierAdminInfo.status !== "verified") {
      throw new Error((message = "Verifier Account is not verified"));
    } else {
      if (adminInfo.status == "verified") {
        throw new Error((message = "Account is already verified"));
      } else {
        const verifiedAdmin = admins.editOneAdmin(
          { email: "email" },
          { status: "verified" }
        );
      }
      outputMsg.admin = { email: email };
      outputMsg.success = true;
      outputMsg.message = "Successfully verified";
    }
  } catch (error) {
    throw error;
  }
  return outputMsg;
};

const deactivateAdmin = async (email, verifierEmail) => {
  const outputMsg = {};

  if (!validateMail(email) || !validateMail(verifierEmail)) {
    throw new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const adminInfo = await admins.getOneAdminInfo({ email: email });
    if (!adminInfo) {
      throw new Error((message = "Account not found"));
    }

    const verifierInfo = await admins.getOneAdminInfo({ email: verifierEmail });
    if (!verifierInfo) {
      throw new Error((message = "Account not found"));
    }
    if (verifierInfo) {
      if (verifierInfo.addedBy !== "root") {
        throw new Error((message = "Privelege escalation is required"));
      } else if (verifierInfo.addedBy == "root") {
        const verifiedAdmin = admins.editOneAdmin(
          { email: "email" },
          { status: "deactivated" }
        );
        if ("error" in verifiedAdmin) {
          throw verifiedAdmin.error;
        }
        outputMsg.admin = { email: email };
        outputMsg.success = true;
        outputMsg.message = "Successfully deactivated";
      }
    }
  } catch (error) {
    throw error;
  }
  return outputMsg;
};

const getAdminStatus = async (email) => {
  const outputMsg = {};

  if (!validateMail(email)) {
    throw new Error((message = "Entered Email Address is invalid"));
  }
  try {
    const adminInfo = await admins.getOneAdminInfo({ email: email });
    if (!adminInfo) {
      throw new Error((message = "Account not found"));
    }
    if (adminInfo.status === "verified") {
      outputMsg.status = true;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved";
    } else {
      outputMsg.status = false;
      outputMsg.success = true;
      outputMsg.message = "Successfully retrieved";
    }
  } catch (error) {
    throw error;
  }
  return outputMsg;
};
module.exports = {
  adminRegister,
  adminLogin,
  verifyAdmin,
  deactivateAdmin,
  getAdminStatus,
};
