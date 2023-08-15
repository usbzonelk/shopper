const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const jwtSecretKey = process.env.JWT_KEY;
const ACCESS_TOKEN_EXPIRATION = "3h";
const REFRESH_TOKEN_EXPIRATION = "14d";

const jwtRefreshGenerator = (email, role) => {
  return jwt.sign({ email: email, role: role }, jwtSecretKey, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
};

const jwtAccessGenerator = (refreshToken) => {
  const validateRefresh = jwtValidator(refreshToken);
  if (validateRefresh) {
    return jwt.sign(
      { email: validateRefresh.email, role: validateRefresh.role },
      jwtSecretKey,
      { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );
  } else {
    return null;
  }
};

const jwtValidator = (token) => {
  let decodedToken = null;
  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
      return null;
    }
    decodedToken = decoded;
  });
  return decodedToken;
};

module.exports = { jwtAccessGenerator, jwtRefreshGenerator, jwtValidator };
