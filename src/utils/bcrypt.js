const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const saltedOutput = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, saltedOutput);
    return { pass: hashedPassword, salt: saltedOutput };
  } catch (err) {
    return err;
  }
};

const validateUser = async (password, hash) => {
  try {
    const validity = await bcrypt.compare(password, hash);
    return validity;
  } catch (err) {
    return err;
  }
};

module.exports = { hashPassword, validateUser };
