const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const jwtSecretKey = process.env.JWT_KEY;
const ACCESS_TOKEN_EXPIRATION = "3h";
const REFRESH_TOKEN_EXPIRATION = "14d";

const jwtRefreshGenerator = (email, role) => {
  console.log(`email : ${email}`);
  return jwt.sign({ email: email, access: false, role: role }, jwtSecretKey, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
};

const jwtAccessGenerator = async (refreshToken) => {
  const validateRefresh = await jwtValidator(refreshToken);
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

const jwtValidator = async (token) => {
  let decodedToken = await new Promise((res, rej) => {
    const yy = jwt.verify(token, jwtSecretKey);
    res(yy);
  });

  return decodedToken;
};

module.exports = { jwtAccessGenerator, jwtRefreshGenerator, jwtValidator };
