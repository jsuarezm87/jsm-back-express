const ServiceCustomer = require('../services/customer.service');
 
const createCustomer = async(req, res) => {
    const resp = await ServiceCustomer.createCustomer(req.body);
    res.status(resp.status).send(resp.response);    
}

const listCustomer = async(req, res) => {
    const resp = await ServiceCustomer.listCustomer();
    res.status(resp.status).send(resp.response);    
}

const updateCustomer = async(req, res) => {
    const { id } = req.params;
    const { name, lastName, address, phone, phone2, email, status } = req.body;
    
    const resp = await ServiceCustomer.updateCustomer(id, { name, lastName, address, phone, phone2, email, status });
    res.status(resp.status).send(resp.response);    
}


module.exports = {
    createCustomer,
    listCustomer,
    updateCustomer
}