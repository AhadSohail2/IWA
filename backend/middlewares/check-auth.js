const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
        if (!token) {
            throw new Error('Authentication failed!');
        }
        const decodedToken = jwt.verify(token, process.env.JWTKEY);
        req.userData = { userId: decodedToken.id, role: decodedToken.role };
        next();
    } catch (err) {
        const error = new Error("Authentication failed!");
        error.statusCode = 403;
        next(error);
    }
};
