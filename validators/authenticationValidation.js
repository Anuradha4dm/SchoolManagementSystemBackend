const jwt = require('jsonwebtoken');
const { errorMonitor } = require('stream');

exports.authUserChecking = (req, res, next) => {
    const tokenFull = req.get("Authorization");
    var decodedToken;
    if (!tokenFull) {
        const error = new Error("You token doesnot exists");
        error.statusCode = 401;
        throw error;
    }

    const token = tokenFull.split(' ')[1];

    try {
        decodedToken = jwt.verify(token, 'sercret')
    } catch (error) {
        error.message = "Authentication Faild"
        error.statusCode = 401;
        throw error;
    }
    if (!decodedToken) {
        const error = new Error("Authenticatin Falid");
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken._id;
    next();
}