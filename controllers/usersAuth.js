const authController = require('./authController')


// register and login shop owner 
function createUser() {
    authController.regiseterUser()
}

function loginExistUser() {
    authController.loginUser()
}

module.exports = {
    createUser,
    loginExistUser
};
