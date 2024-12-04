const authController = require("./authController")

// login and register shop owners
function registerOwner () {
    authController.regiseterOwner()
}

function loginOwner () {
    authController.loginOwner()
}

module.exports = {
    registerOwner,
    loginOwner
};