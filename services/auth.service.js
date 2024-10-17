const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { crearJWT } = require('../helpers/jwt');
const message = require('../constants/messages');
const { respOK, respERR } = require('../helpers/apiResp');
 
const createUser = async(data) => {
    const {email, password} = data;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return(respERR(message.STATUS_400, message.FALSE, message.EXISTING_USER));
        }

        user = new User(data);        
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        const token = await crearJWT( user.id, user.name );
        return (respOK(message.STATUS_200, message.TRUE, user.id, user.name, token));
        
    } catch (error) {
        console.log(error);
        return(respERR(message.STATUS_500, message.FALSE, message.CREATE_USER_ERROR));
    }
}


const loginUser = async(data) => {
    const { email, password } = data;

    try {        
        const user = await User.findOne({ email });
        if (!user) {
            return(respERR(message.STATUS_400, message.FALSE, message.USER_EMAIL_NO_EXIST));
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return(respERR(message.STATUS_400, message.FALSE, message.PASS_INCORRECT));
        }

        const token = await crearJWT(user.id, user.name);
        return (respOK(message.STATUS_200, message.TRUE, user.id, user.name, token));

    } catch (error) {
        console.log(error);
        return(respERR(message.STATUS_500, message.FALSE, message.LOGIN_ERROR));
    }

}


const validJWT = async (req) => {
    const { uid, name } = req;
    const token = await crearJWT(uid, name);
    return {
        status: message.STATUS_200,
        response: {
            ok: message.TRUE,
            uid, 
            name,
            token
        }            
    }
}


module.exports = {
    createUser,
    loginUser,
    validJWT
}