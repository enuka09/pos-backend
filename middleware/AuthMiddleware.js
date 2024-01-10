const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, resp, next) => {
    const token = req.headers.authorization;
    console.log(token)
    if (!token) {
        return resp.status(403).json({'error': 'Token is Missing!'});
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return resp.status(401).json({'error': 'Token is Invalid!'});
        }
        next();
    });
}

module.exports = verifyToken;