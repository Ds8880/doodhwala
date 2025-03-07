const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        minlength: 10,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: "customer",
        required: true
    },
    password: {
        type: String,
        minlength: 4,
        required: true,
        // select:false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

customerSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
