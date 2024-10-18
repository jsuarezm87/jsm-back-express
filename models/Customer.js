const { Schema, model } = require('mongoose')

const customerSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    identification: {
        type: Number,
        required: true,
        unique: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    phone2: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    managedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});


module.exports = model('Customer', customerSchema);
