const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { crearJWT } = require('../helpers/jwt');
const message = require('../constants/messages');
const { respERR, resp } = require('../helpers/response');
 
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
        const token = await crearJWT( user.id, user.name, user.email);
        const response = {
            ok: message.TRUE,
            uid: user.id,
            name: user.name,
            token,
            email

        }
        return (resp(message.STATUS_200, response));
        
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

        const token = await crearJWT(user.id, user.name, user.email);
        const response = {
            ok: message.TRUE,
            uid: user.id,
            name: user.name,
            token,
            email: user.email

        }

        return (resp(message.STATUS_200, response));


    } catch (error) {
        console.log(error);
        return(respERR(message.STATUS_500, message.FALSE, message.LOGIN_ERROR));
    }

}


const validJWT = async (req) => {
    const { uid, name, email } = req;
    const token = await crearJWT(uid, name, email);
    const response = {
        ok: message.TRUE,
        uid,
        name,
        token,
        email

    }
    return (resp(message.STATUS_200, response));
}


module.exports = {
    createUser,
    loginUser,
    validJWT
}