const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({

    date: {
        type: String,
        required: [ true, 'Payment date is required']
    },
    amount: {
        type: Number,
        required: [true, 'Payment date is required']
    },
    description: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
    method: {
        type: String,
        required: false,
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tenant'
    }, 
    rent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Rent'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
},
{
    timestamps: true
}
) 
module.exports = mongoose.model('Payment', paymentSchema)