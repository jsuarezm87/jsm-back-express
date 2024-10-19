const ServiceCustomer = require('../services/customer.service');
 
const createCustomer = async(req, res) => {
    const resp = await ServiceCustomer.createCustomer(req.body);
    res.status(resp.status).send(resp.response);    
}

const listCustomer = async(req, res) => {
    const resp = await ServiceCustomer.listCustomer();
    res.status(resp.status).send(resp.response);    
}



module.exports = {
    createCustomer,
    listCustomer
}