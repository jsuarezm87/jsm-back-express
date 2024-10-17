const ServiceAuth = require('../services/auth.service');
 
const createUser = async(req, res) => {
    const resp = await ServiceAuth.createUser(req.body);
    res.status(resp.status).send(resp.response);    
}

const loginUser = async(req, res) => {
    const resp = await ServiceAuth.loginUser(req.body);
    res.status(resp.status).send(resp.response);    
}


const validJWT = async (req, res) => {
    const resp = await ServiceAuth.validJWT(req);
    res.status(resp.status).send(resp.response);  
}


module.exports = {
    createUser,
    loginUser,
    validJWT
}