const registerUser = require("./authController")
const loginUser = require('./authController')


// from this api we can register user 
function registerUser1 () {
    registerUser.regiseterUser();
}

function loginUser1 () {
    loginUser.loginUser();
}

module.exports = {
    registerUser1,
    loginUser1
};