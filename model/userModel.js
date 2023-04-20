const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a valida password'],

    }, 
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        required: [true, "User business is required"]
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