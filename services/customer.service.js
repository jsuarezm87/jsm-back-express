const message = require('../constants/messages');
const { mongoIdValidator } = require('../helpers/inputsValidators');
const { resp } = require('../helpers/response');
const Customer = require('../models/Customer');
const User = require('../models/User');


const createCustomer = async (data) => {
    try {
        const { name, lastName, identification, address, phone, phone2, email, status, managedBy } = data;

        // const customerBD =  await Customer.findOne({ identification });
        const [ userDB, customerBD ] = await Promise.all([
            await User.findOne({ email: managedBy }),
            Customer.findOne({ identification })
        ]);
        if (customerBD) return(resp(message.STATUS_400, {ok: message.FALSE, msg: message.CUSTOMER_EXIST}));

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
        console.log(err);
        return(resp(message.STATUS_500, {ok: message.FALSE, msg: message.CUSTOMER_ERROR}));
    }
}


const listCustomer = async () => {
    try {      
        const customers = await Customer.find().populate('managedBy', 'email -_id');
       
        const transformedCustomers = customers.map(customer => {
            const { __v, managedBy, ...data } = customer.toObject();
            return {
                ...data,
                managedBy: managedBy.email 
            };
        });

        return (resp(message.STATUS_200, transformedCustomers));
    } catch (err) {
        console.log(err);
        return(resp(message.STATUS_500, {ok: message.FALSE, msg: message.CUSTOMER_LIST_ERROR}));
    }
}

const updateCustomer = async (id, data) => {
    try {      
        const customerBD = await Customer.findById(id);

        if (!customerBD) return(resp(message.STATUS_400, {ok: message.FALSE, msg: message.CUSTOMER_NO_EXIST}));

        const updateCustomer = {
            customerBD,
            ...data
        }

        const customer = await Customer.findByIdAndUpdate( id, updateCustomer, {new: true});

        return (resp(message.STATUS_200, customer));
    } catch (err) {
        console.log(err);
        return(resp(message.STATUS_500, {ok: message.FALSE, msg: message.CUSTOMER_LIST_ERROR}));
    }
}

const deleteCustomer = async (id) => {

    try {
        if (!mongoIdValidator(id))  return (resp(message.STATUS_400, {ok: message.FALSE, msg: message.MONGO_ID_ERROR}));
    
        const customerBD = await Customer.findById(id);
    
        if (!customerBD) return(resp(message.STATUS_400, {ok: message.FALSE, msg: message.CUSTOMER_NO_EXIST}));
    
        await Customer.findByIdAndDelete(id);
        

        return (resp(message.STATUS_200, {ok: message.TRUE, msg: message.CUSTOMER_DELETE}));
    } catch (err) {
        console.log(err);
        return(resp(message.STATUS_500, {ok: message.FALSE, msg: message.CUSTOMER_DELETE_ERROR}));
    }  
    
}


module.exports = {
    createCustomer,
    listCustomer,
    updateCustomer,
    deleteCustomer
}