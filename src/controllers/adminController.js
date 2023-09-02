const Admin = require("../models/Admins");
const bcrypt = require("../utils/bcrypt");
const validateMail = require("../utils/stringValidators").validateMail;
const auth = require("../utils/auth");

const admins = Admin.adminsManager
 