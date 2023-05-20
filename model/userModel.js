const mongoose = require('mongoose')
const businessModel = require('./businessModel')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        // unique: true
    },
    nationality: {
        type: String,
        required: false,
    },
    contact_number: {
        type: String,
        required: [true, "Phone number is required"],
      },
    alternative_contact: {
        type: String,
        required: false,
    },
    national_id: {
        type: String,
        required: false,
    },

    address: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: [true, 'Please provide a valid password'],

    }, 
    business: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'You have not been assigned to any business'],
        ref: 'Business'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    client_id: {
        type: String,
        required: true,
    },
    business_name: {
        type: String,
        required: false,
    },
    is_client: {
        type: String,
        required: false,
    },
    client: {
        type: String,
        required: false,
    },
},
{
    timestamps: true
}  )

module.exports = mongoose.model('User', userSchema)