const jwt = require('jsonwebtoken');
const message = require('../constants/messages');

const crearJWT = (uid, name, email) => {
    return new Promise( (resolve, reject) => {
        const payload = {uid, name, email};

        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '1h'
        }, (err, token ) => {
            if (err)reject(message.NOT_GENERATE_TOKEN);
            resolve( token );
        })
    })
}

module.exports = {
    crearJWT
}