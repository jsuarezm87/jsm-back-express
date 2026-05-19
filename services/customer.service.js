const message = require('../constants/messages');
const { mongoIdValidator } = require('../helpers/inputsValidators');
const { resp } = require('../helpers/response');
const Customer = require('../models/Customer');
const User = require('../models/User');


const createCustomer = async (data, authenticatedEmail) => {
    try {
        const { name, lastName, identification, address, phone, phone2, email, status, managedBy } = data;

        // const customerBD =  await Customer.findOne({ identification });
        const [ userDB, customerBD ] = await Promise.all([
            await User.findOne({ email: managedBy }),
            Customer.findOne({ identification })
        ]);
        if (customerBD) return(resp(message.STATUS_400, {ok: message.FALSE, message: message.CUSTOMER_EXIST}));
        if (!userDB) return(resp(message.STATUS_400, {ok: message.FALSE, message: message.USER_EMAIL_NO_EXIST}));
        if (userDB.email !== authenticatedEmail) {
            return(resp(message.STATUS_403, {ok: message.FALSE, message: message.UNAUTHORIZED_OPERATION}));
        }

        const customer = new Customer({
            name, 
            lastName, 
            identification, 
            address, 
            phone, 
            phone2, 
            email, 
            status, 
            managedBy: userDB._id
        });

        await customer.save();

        const response = {
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
        console.error(err);
        return(resp(message.STATUS_500, {ok: message.FALSE, message: message.CUSTOMER_ERROR}));
    }
}


const listCustomer = async (authenticatedEmail) => {
    try {      
        const manager = await User.findOne({ email: authenticatedEmail });
        if (!manager) return(resp(message.STATUS_400, {ok: message.FALSE, message: message.USER_EMAIL_NO_EXIST}));

        const customers = await Customer.find({ managedBy: manager._id }).populate('managedBy', 'email -_id');
       
        const transformedCustomers = customers.map(customer => {
            const { __v, managedBy, ...data } = customer.toObject();
            return {
                ...data,
                managedBy: managedBy.email 
            };
        });

        return (resp(message.STATUS_200, transformedCustomers));
    } catch (err) {
        console.error(err);
        return(resp(message.STATUS_500, {ok: message.FALSE, message: message.CUSTOMER_LIST_ERROR}));
    }
}

const updateCustomer = async (id, data, authenticatedEmail) => {
    try {      
        const customerBD = await Customer.findById(id);

        if (!customerBD) return(resp(message.STATUS_400, {ok: message.FALSE, message: message.CUSTOMER_NO_EXIST}));

        const manager = await User.findOne({ email: authenticatedEmail });
        if (!manager || customerBD.managedBy.toString() !== manager._id.toString()) {
            return(resp(message.STATUS_403, {ok: message.FALSE, message: message.UNAUTHORIZED_OPERATION}));
        }

        const updateCustomer = { ...data };

        const customer = await Customer.findByIdAndUpdate( id, updateCustomer, {new: true});

        return (resp(message.STATUS_200, customer));
    } catch (err) {
        console.error(err);
        return(resp(message.STATUS_500, {ok: message.FALSE, message: message.CUSTOMER_LIST_ERROR}));
    }
}

const deleteCustomer = async (id, authenticatedEmail) => {

    try {
        if (!mongoIdValidator(id))  return (resp(message.STATUS_400, {ok: message.FALSE, message: message.MONGO_ID_ERROR}));
    
        const customerBD = await Customer.findById(id);
    
        if (!customerBD) return(resp(message.STATUS_400, {ok: message.FALSE, message: message.CUSTOMER_NO_EXIST}));

        const manager = await User.findOne({ email: authenticatedEmail });
        if (!manager || customerBD.managedBy.toString() !== manager._id.toString()) {
            return(resp(message.STATUS_403, {ok: message.FALSE, message: message.UNAUTHORIZED_OPERATION}));
        }
    
        await Customer.findByIdAndDelete(id);
        

        return (resp(message.STATUS_200, {ok: message.TRUE, message: message.CUSTOMER_DELETE}));
    } catch (err) {
        console.error(err);
        return(resp(message.STATUS_500, {ok: message.FALSE, message: message.CUSTOMER_DELETE_ERROR}));
    }  
    
}


module.exports = {
    createCustomer,
    listCustomer,
    updateCustomer,
    deleteCustomer
}
