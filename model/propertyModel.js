const mongoose = require('mongoose')

const propertySchema = mongoose.Schema({
 
    location: {
        type: String,
        required: [ true, 'Location is required']
    },
    name: {
        type: String,
        required: [ true, 'Property title is required']
    },
    gpgps: {
        type: String,
        required: false
    },
    number: {
        type: String,
        required: [ true, 'Property number is required']
    },
    description: {
        type: String,
        required: [ true, 'Property description is required']
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    }
},
{
    timestamps: true
}
) 
module.exports = mongoose.model('Property', propertySchema)