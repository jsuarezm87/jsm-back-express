const jwt = require('jsonwebtoken');
const message = require('../../constants/messages');

const checkJWT = (req, res, next) => {
    const bearer = req.header('Authorization');
    const legacyToken = req.header('login-token');
    const token = bearer?.startsWith('Bearer ') ? bearer.split(' ')[1] : legacyToken;
    if (!token) return res.status(401).json({ ok: false, statusCode: 401, message: message.NOT_FOUND_TOKEN });

    try {
        const { uid, name, email } = jwt.verify(token, process.env.SECRET_JWT);
        req.uid = uid;
        req.name = name;
        req.email = email;
    } catch (error) {
        return res.status(401).json({ ok: false, statusCode: 401, message: message.INVALID_TOKEN });
    }
    next();
};

module.exports = { checkJWT };
