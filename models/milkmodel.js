const mongoose = require('mongoose');

const milkSchema = new mongoose.Schema({

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    buyerId: {
        type: String,
        required: true
    },
    milkType: {
        type: String,
        enum: ["cow", "buffalo"],
        default: "cow",
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
    perLitterPrice: {
        type: Number,
        default: 70
    },
    totalPrice: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const milkM = mongoose.model("milkM", milkSchema);

module.exports = milkM;

