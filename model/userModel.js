const mongoose = require('mongoose')

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
        required: [true, 'Please provide a valida password'],

    }, 
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        required: [false, "User business is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
},
{
    timestamps: true
}  )

module.exports = mongoose.model('User', userSchema)