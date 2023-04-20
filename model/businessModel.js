const mongoose = require('mongoose')

const businessSchema = mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'Business name is required']
    },
    location: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: [ true, 'Business description is required']
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
module.exports = mongoose.model('Business', businessSchema)