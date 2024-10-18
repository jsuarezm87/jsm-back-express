const message = require('../constants/messages');
const { resp } = require('../helpers/response');
const Customer = require('../models/Customer');


const createCustomer = async (data) => {
    try {
        const { name, lastName, identification, address, phone, phone2, email, status, managedBy } = data;

        const customerBD =  await Customer.findOne({ identification });
        if (customerBD) return(resp(message.STATUS_400, {ok: message.FALSE, msg: message.CUSTOMER_EXIST}));

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
        return(resp(message.STATUS_500, {ok: message.FALSE, msg: message.CUSTOMER_ERROR}));
    }
    
    


}

module.exports = {
    createCustomer
}