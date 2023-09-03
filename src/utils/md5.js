const md5 = require("md5");

const hashMD5 = (string) => {
  return md5(string);
};

module.exports = { hashMD5 };
