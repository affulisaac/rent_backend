const mongoose = require('mongoose')

const apartmentSchema = mongoose.Schema({
 
    name: {
        type: String,
        required: [ true, 'Apartment title is required']
    },
    rooms: {
        type: Array,
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
    business: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'You have not been assigned to any business'],
        ref: 'Business'
    },
    tenant: {
        type: Array,
        required: false
    },
    client_id: {
        type: String,
        required: true,
    },
},
{
    timestamps: true
}
) 
module.exports = mongoose.model('Apartment', apartmentSchema)