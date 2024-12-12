const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] ||
        req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.decode(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            console.log("Jwt auth")
            return res.status(401).redirect('/error');
        }
    } else {
        console.log("Catch Block")
        return res.status(401).send('No token provided');
    }
};

module.exports = authenticateUser;