const mongoose = require('mongoose')

const apartmentSchema = mongoose.Schema({
 
    name: {
        type: String,
        required: [ true, 'Apartment title is required']
    },
    rooms: {
        type: Array,
        required: [ true, 'Apartment number is required']
    },
    description: {
        type: String,
        required: [ true, 'Apartment description is required']
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Property'
    },
    client_id: {
        type: String,
        required: true,
    },
    tenant: {
        type: Array,
        required: false
    }
},
{
    timestamps: true
}
) 
module.exports = mongoose.model('Apartment', apartmentSchema)