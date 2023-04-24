const mongoose = require('mongoose')

const propertySchema = mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'Property name is required']
    },
    location: {
        type: String,
        required: true
    },
    gpgps: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: [ true, 'Property description is required']
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
module.exports = mongoose.model('Property', propertySchema)