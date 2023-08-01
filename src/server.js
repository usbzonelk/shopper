const connectToDatabase = require("./config/database");
const usr = require("./models/Users");

console.log("Server fired up!");

connectToDatabase();

const uu = async () => {
    const yy = await usr.usersManager.getAllUsers();
    console.log(yy);
};

uu();
