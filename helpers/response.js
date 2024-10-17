const respOK = (status, ok, uid, name, token) => {
    return {
        status,
        response: {
            ok,
            uid,
            name,
            token
        }            
    }
}

const respERR = (status, ok, msg) => {
    return {
        status,
        response: {
            ok,
            msg
        }            
    }
}

const resp = (status, response) => {
    return {
        status,
        response   
    }
}

module.exports = {
    respOK,
    respERR,
    resp
}