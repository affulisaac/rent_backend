const mongoose = require('mongoose')

const businessSchema = mongoose.Schema({


    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Business'
    },
    name: {
        type: String,
        required: true,
    }, 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    location: {
        type: String,
        required: false,
    },

    description: {
        type: String,
        required: false,
    },
    client_id: {
        type: String,
        required: false,
    },
},
{
    timestamps: true
}
) 
module.exports = mongoose.model('Business', businessSchema)