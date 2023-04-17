const mongoose = require('mongoose')

const propertySchema = mongoose.Schema({
 
    location: {
        type: String,
        required: [ true, 'Location is required']
    },
    title: {
        type: String,
        required: [ true, 'Property title is required']
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
        required: true,
        ref: 'User'
    }
},
{
    timestamps: true
}
) 
module.exports = mongoose.model('Property', propertySchema)