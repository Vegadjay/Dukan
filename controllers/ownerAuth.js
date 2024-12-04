const registerShopOwner = require("./authController")
const loginShopOwner = require('./authController')

// login and register shop owners
function registerOwner () {
    registerShopOwner.regiseterOwner()
}

function loginShopOwner1 () {
    loginShopOwner.loginOwner();
}

module.exports = {
    registerOwner,
    loginShopOwner1
};