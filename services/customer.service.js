const message = require('../constants/messages');
const { respERR, resp } = require('../helpers/response');
const Customer = require('../models/Customer');


const createCustomer = async (data) => {
    try {
        const { name, lastName, identification, address, phone, phone2, email, status, managedBy } = data;

        const customerBD =  await Customer.findOne({ identification });
        if (customerBD) return(respERR(message.STATUS_400, message.FALSE, message.CUSTOMER_EXIST));

        const customer = new Customer({name, lastName, identification, address, phone, phone2, email, status, managedBy});

        await customer.save();

        const response = {
            ok: message.TRUE, 
            name, 
            lastName, 
            identification, 
            address, 
            phone, 
            phone2, 
            email, 
            status, 
            managedBy
        }

        return (resp(message.STATUS_200, response));

    } catch (err) {
        console.log(err);
        return(respERR(message.STATUS_500, message.FALSE, message.LOGIN_ERROR));
    }
    
    


}

module.exports = {
    createCustomer
}