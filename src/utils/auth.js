const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const jwtSecretKey = process.env.JWT_KEY;
const ACCESS_TOKEN_EXPIRATION = "3h";
const REFRESH_TOKEN_EXPIRATION = "14d";

const jwtRefreshGenerator = (email, role) => {
  return jwt.sign(
    {
      email,
      role,
      type: "refresh",
    },
    jwtSecretKey,
    {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    }
  );
};

const jwtAccessGenerator = async (refreshToken) => {
  const validateRefresh = jwtValidator(refreshToken);
  if (validateRefresh) {
    return jwt.sign(
      {
        email: validateRefresh.email,
        access: true,
        role: validateRefresh.role,
      },
      jwtSecretKey,
      { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );
  } else {
    return null;
  }
};

const jwtValidator = (token) => {
  try {
    return jwt.verify(token, jwtSecretKey);
  } catch (err) {
    throw new Error("Invalid token!");
  }
};

module.exports = { jwtAccessGenerator, jwtRefreshGenerator, jwtValidator };
